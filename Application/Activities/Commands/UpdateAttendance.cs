using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateAttendance
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context) 
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .Include(x => x.Attendees)
                .ThenInclude(x => x.User)
                .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

            var user = await userAccessor.GetUserAsync();

            var attendance = activity.Attendees.FirstOrDefault(x => x.User.Id == user.Id);
            var isHost = activity.Attendees.Any(x => x.User.Id == user.Id && x.IsHost);

            // if user is in Attendance...
            if (attendance != null)
            {
                //... if user is host, toggle cancel of activity
                if (isHost) activity.IsCancelled = !activity.IsCancelled;
                // ... if user is not host, remove user from attendance
                else activity.Attendees.Remove(attendance);
            }
            // else, they are not in attendance, so add them
            else
            {
                attendance = new Domain.ActivityAttendee
                {
                    UserId = user.Id,
                    ActivityId = activity.Id,
                    IsHost = false
                };
                activity.Attendees.Add(attendance);
            }

            // save changes to database
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return result 
                ? Result<Unit>.Success(Unit.Value) 
                : Result<Unit>.Failure("Problem updating attendance", 400);
        }
    }
}
