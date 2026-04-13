using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class SetMainPhoto
{
    public class Command: IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();
            var photo = user.Photos.FirstOrDefault(p => p.Id == request.PhotoId);
            
            if (photo == null) return Result<Unit>.Failure("Photo not found", 404);
            
            user.ImageUrl = photo.Url;

            var dbResult = await context.SaveChangesAsync() > 0;
            if (!dbResult) return Result<Unit>.Failure("Failed to update main photo in database", 500);

            // return success if both deletions succeeded
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
