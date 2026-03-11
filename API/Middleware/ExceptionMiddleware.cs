using System;
using System.Reflection.Metadata;
using System.Text.Json;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context); // just try to do the next step in the mediation pipeline
        }
        catch(ValidationException ex) // if our validation middleware (fluidvalidation) raised an exception, set correct return
        {
            await HandleValidationException(context, ex);
        }
        catch (Exception ex) // if a generic unhandled exception was raised
        {
            await HandleException(context, ex);
        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message); // log the exception
        context.Response.ContentType = "application/json"; // set the content type to json
        context.Response.StatusCode = StatusCodes.Status500InternalServerError; // set the status code to 500
        
        var response = env.IsDevelopment() // if we're in development, include the stack trace in the response, otherwise just return a generic error message
            ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
            : new AppException(context.Response.StatusCode, "Server Error", null);

        var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase}; // set the json serializer to camel case
        var json = JsonSerializer.Serialize(response, options); // serialize the response to json
        await context.Response.WriteAsync(json); // write the json to the response
    }

    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();

        if(ex.Errors is not null)
        {
            foreach(var error in ex.Errors)
            {
                // append error if one already exists for this key
                if(validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToArray();
                }
                // else create a new entry for this key
                else
                {
                    validationErrors[error.PropertyName] = [error.ErrorMessage];
                }
            }
        }

        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        var validationProblemDetails =  new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "ValidationFailure",
            Title = "Validation Error",
            Detail = "One or more validation errors have occurred"
        };

        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}
