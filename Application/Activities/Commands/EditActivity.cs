using System;
using Application.Errors;
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

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync(request.Activity.Id, cancellationToken) 
                    ?? throw new NotFoundException(nameof(Activity), request.Activity.Id);
                    
            activity.Title = request.Activity.Title;

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
