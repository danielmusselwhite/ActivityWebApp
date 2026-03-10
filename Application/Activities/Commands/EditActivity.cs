using System;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required Activity Activity {get; set;}
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync(request.Activity.Id, cancellationToken);
                
            if (activity == null)
            {
                return Result<Unit>.Failure("Activity not found", 404);
            }

            mapper.Map(request.Activity, activity); // mapping our activity to the entity 

            var result = await context.SaveChangesAsync(cancellationToken);
            
            if(result > 0)
            {
                return Result<Unit>.Success(Unit.Value);
            }
            else
            {
                return Result<Unit>.Failure("Failed to update Activity record", 400);
            }
        }
    }
}
