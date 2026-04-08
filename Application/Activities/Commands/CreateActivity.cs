using System;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDTO ActivityDTO {get; set;}
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) 
        : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync(); // Get the current user

            var activity = mapper.Map<Activity>(request.ActivityDTO);

            // create activity
            context.Activities.Add(activity);

            // now create the attendee record for the host
            var attendee = new ActivityAttendee
            {
                UserId = user.Id,
                ActivityId = activity.Id,
                IsHost = true
            };
            activity.Attendees.Add(attendee);

            // save both records in a single transaction
            var result = await context.SaveChangesAsync();

            if(result > 0)
            {
                return Result<string>.Success(activity.Id);
            }
            else
            {
                return Result<string>.Failure("Failed to create Activity record", 400);
            }
        }
    }
}
