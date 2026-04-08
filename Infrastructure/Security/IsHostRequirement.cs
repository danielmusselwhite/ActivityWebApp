using System;
using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class IsHostRequirement : IAuthorizationRequirement
{

}

public class IsHostRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<IsHostRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
        // Get the user ID from the claims
        var userId = httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return;

        // Get the httpContext
        var httpContext = httpContextAccessor.HttpContext;
        if (httpContext == null) return;

        // if the activity ID is not found in the route values, return
        // otherwise, it is set to the activityId variable
        if (httpContext?.GetRouteValue("id") is not string activityId) return; 

        // Get attendee for this activity and user
        var attendee = await dbContext.ActivityAttendees
            .SingleOrDefaultAsync(x => x.ActivityId == activityId && x.UserId == userId);
        if (attendee == null) return;

        // if the user is host, then we succeed the requirement
        if (attendee.IsHost) context.Succeed(requirement);
    }
}