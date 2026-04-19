using System;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class AddComment
{
    public class Command : IRequest<Result<CommentDTO>>
    {
        public required string ActivityId { get; set; }
        public required string Body { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<CommentDTO>>
    {
        public async Task<Result<CommentDTO>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .Include(x => x.Comments)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == request.ActivityId);

            if (activity == null) return Result<CommentDTO>.Failure("Could not find activity", 404);

            var user = await userAccessor.GetUserAsync();

            var comment = new Comment
            {
                UserId = user.Id,
                ActivityId = activity.Id,
                Body = request.Body
            };

            activity.Comments.Add(comment);

            var success = await context.SaveChangesAsync() > 0;

            if (!success) return Result<CommentDTO>.Failure("Failed to add comment", 400);
            return Result<CommentDTO>.Success(mapper.Map<CommentDTO>(comment));
        }
    }
}
