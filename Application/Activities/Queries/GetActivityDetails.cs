using System;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<Activity>>
    {
        public required string Id {get; set;}
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Activity>>
    {
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .Where(a => a.Id == request.Id)
                .FirstOrDefaultAsync();

            if (activity == null)
            {
                return Result<Activity>.Failure("Activity not found", 404);
            }

            return Result<Activity>.Success(activity);
        }
    }
}
