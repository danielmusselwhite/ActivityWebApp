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
    public class Command: IRequest<Result<string>>
    {
        public required string PublicId { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context, IPhotoService photoService) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var result = await photoService.DeletePhotoAsync(request.PublicId);
            if (result == null) return Result<string>.Failure("Failed to delete photo", 400);
            return Result<string>.Success(result);
        }
    }

}
