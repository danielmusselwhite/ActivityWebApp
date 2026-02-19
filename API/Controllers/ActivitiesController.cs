using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ActivitiesController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Domain.Activity>>> GetActivities()
    {
        var activities = await context.Activities.ToListAsync();
        return Ok(activities);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<List<Domain.Activity>>> GetActivity(string id)
    {
        var activity = await context.Activities
            .Where(a => a.Id == id)
            .FirstOrDefaultAsync();
        return activity != null ? Ok(activity) : NotFound();
    }
}
