using System;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDTO ActivityDTO {get; set;}
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = mapper.Map<Activity>(request.ActivityDTO);

            context.Activities.Add(activity);
            var result = await context.SaveChangesAsync();

            if(result > 0)
            {
                return Result<string>.Success(activity.Id);
            }
            else
            {
                return Result<string>.Failure("Failed to create Activity record", 400);
            }
        }
    }
}
