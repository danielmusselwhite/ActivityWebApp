using System;
using Application.Activities.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<string>
    {
        public required CreateActivityDTO ActivityDTO {get; set;}
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = mapper.Map<Activity>(request.ActivityDTO);

            context.Activities.Add(activity);
            await context.SaveChangesAsync();
            return activity.Id;
        }
    }
}
