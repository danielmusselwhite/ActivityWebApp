using System;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity {get; set;}
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync(request.Activity.Id, cancellationToken) 
                    ?? throw new NotFoundException(nameof(Activity), request.Activity.Id);
                    
            mapper.Map(request.Activity, activity); // mapping our activity to the entity 

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
