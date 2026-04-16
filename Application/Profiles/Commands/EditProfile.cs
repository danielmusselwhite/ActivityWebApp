using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditProfileDTO ProfileDto { get; set; }
    }


    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var userId = userAccessor.GetUserId();

            var thisUser = await context.Users
            .FirstOrDefaultAsync(u => u.Id == userId);

            if (thisUser == null) return Result<Unit>.Failure("User was not found in database", 500);

            thisUser.DisplayName = request.ProfileDto.DisplayName;
            thisUser.Bio = request.ProfileDto.Bio;

            var result = await context.SaveChangesAsync(cancellationToken);

            if (result <= 0) return Result<Unit>.Failure("Failed to update User Record", 400);
            else return Result<Unit>.Success(Unit.Value);
        }
    }
}
