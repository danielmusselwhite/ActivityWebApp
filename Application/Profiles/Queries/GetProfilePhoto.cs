using System;
using System.Linq;
using Application.Core;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
namespace Application.Profiles.Queries;

public class GetProfilePhoto
{
    public class Query : IRequest<Result<List<Photo>>>
    {
        public required string UserId {get; set;}
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<Photo>>>
    {
        public async Task<Result<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
        {
            // retrieve the photos for the specified user
            var photos = await context.Users
                .Where(u => u.Id == request.UserId)
                .SelectMany(u => u.Photos)
                .ToListAsync(cancellationToken);
                
            return Result<List<Photo>>.Success(photos);
        }
    }
}
