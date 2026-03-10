using System;
using FluentValidation;
using MediatR;

namespace Application.Core;

public class ValidationBehaviour<TRequest, TResponse>(IValidator<TRequest>? validator = null)
    : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        // if we are not validating just skip this stage in the mediator pipeline
        if (validator == null)
        {
            return await next(); // await next aka go to next stage in the mediator pipeline
        }

        // run the validator 
        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        // throw exception if invalid
        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        return await next(); // if no errors, continue to next stage in mediator pipeline
    }
}
