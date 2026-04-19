using System;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities.Queries;

public class GetComments
{
    public class Query : IRequest<Result<List<CommentDTO>>>
    {
        public string ActivityId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<CommentDTO>>>
    {
        public async Task<Result<List<CommentDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var comments = await context.Comments
                .Where(c => c.ActivityId == request.ActivityId)
                .OrderByDescending(c => c.CreatedAt)
                .ProjectTo<CommentDTO>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var commentDTOs = mapper.Map<List<CommentDTO>>(comments);
            return Result<List<CommentDTO>>.Success(commentDTOs);
        }
    }
}
