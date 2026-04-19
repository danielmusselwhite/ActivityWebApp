using System;
using Application.Activities.Commands;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class CommentHub(IMediator mediator) : Hub
{
    /// <summary>
    /// When a client sends a new comment, this method is called. It takes the AddComment.Command as a parameter, which contains the details of the comment to be added.
    /// </summary>
    /// <param name="command"></param>
    /// <returns></returns>
    public async Task SendComment(AddComment.Command command)
    {
        var comment = await mediator.Send(command); // send the command to add the comment to the database

        // send the new comment to all clients in the group based on the activityId
        // !IMPORTANT - the client will listen for the "ReceiveComment" method to get the new comment and update the UI accordingly
        await Clients.Group(command.ActivityId.ToString()).SendAsync("ReceiveComment", comment.Value);
    }

    /// <summary>
    /// When client connects, add them to signalR group based on the activityId they are commenting on. 
    /// This way, any clients connected to that group will receive updates when a new comment is added.
    /// </summary>
    /// <returns></returns>
    override public async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext(); // make initial call to get the httpContext for the connection

        var activityId = httpContext?.Request.Query["activityId"]; // get the activityId from the query string of the connection request
        if (string.IsNullOrEmpty(activityId)) throw new HubException("No activity id provided");

        await Groups.AddToGroupAsync(Context.ConnectionId, activityId!); // add the connection to the group based on the activityId

        // send the existing comments to the client that just connected
        var result = await mediator.Send(new GetComments.Query { ActivityId = activityId! });
        await Clients.Caller.SendAsync("LoadComments", result.Value); // LoadComments is the name of the method that the client will listen for
    }
}
