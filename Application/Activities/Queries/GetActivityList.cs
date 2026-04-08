using System;
using Application.Activities.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<ActivityDTO>> {}

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<ActivityDTO>>
    {
        public async Task<List<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Activities
                .ProjectTo<ActivityDTO>(mapper.ConfigurationProvider)
                .OrderByDescending(a => a.Date)
                .ToListAsync(cancellationToken);
        }
    }
}
