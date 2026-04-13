using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class DeletePhoto
{
    public class Command: IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context, IPhotoService photoService) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            // if user is trying to delete their main photo, return an error
            var user = await userAccessor.GetUserWithPhotosAsync();
            var photo = user.ImageUrl == null ? null : user.Photos.FirstOrDefault(p => p.UserId == user.Id && p.Url == user.ImageUrl);
            
            if (photo == null) return Result<Unit>.Failure("Photo not found", 404);
            if (photo.PublicId == request.PhotoId) return Result<Unit>.Failure("You cannot delete your main photo", 409);

            // delete the photo from the cloud storage and database
            var cloudResult = await photoService.DeletePhotoAsync(photo.PublicId);
            if (cloudResult != "ok") return Result<Unit>.Failure("Failed to delete photo from cloud storage", 502);

            user.Photos.Remove(photo);
            var dbResult = await context.SaveChangesAsync() > 0;
            if (!dbResult) return Result<Unit>.Failure("Failed to delete photo from database", 500);

            // return success if both deletions succeeded
            return Result<Unit>.Success(Unit.Value);
        }
    }

}
