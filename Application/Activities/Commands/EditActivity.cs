using System;
using Application.Activities.DTOs;
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
        public required EditActivityDTO ActivityDTO {get; set;}
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync(request.ActivityDTO.Id, cancellationToken);
                
            if (activity == null)
            {
                return Result<Unit>.Failure("Activity not found", 404);
            }

            mapper.Map(request.ActivityDTO, activity); // mapping our activity to the entity 

            // check if there are any changes
            if (!context.ChangeTracker.HasChanges())
            {
                return Result<Unit>.Failure("No changes detected", 400);
            }

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
