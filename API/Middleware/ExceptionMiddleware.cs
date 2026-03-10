using System;
using Application.Errors;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware : IMiddleware
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
        catch (NotFoundException ex) // if a notfound exception was raised
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;

            await context.Response.WriteAsJsonAsync(new ProblemDetails
            {
                Title = "Resource Not Found",
                Detail = ex.Message,
                Status = StatusCodes.Status404NotFound
            });
        }
        catch (Exception ex) // if a generic unhandled exception was raised
        {
            Console.WriteLine(ex);

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            await context.Response.WriteAsJsonAsync(new ProblemDetails
            {
                Title = "Server Error",
                Detail = ex.Message,
                Status = StatusCodes.Status500InternalServerError
            });
        }
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
