using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities.Queries;
using Application.Errors;

namespace API.Controllers;

public class ActivitiesController(IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Domain.Activity>>> GetActivities()
    {
        return Ok(await mediator.Send(new GetActivityList.Query()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Domain.Activity>> GetActivity(string id)
    {
        try
        {
            return Ok(await mediator.Send(new GetActivityDetails.Query{Id = id}));
        }
        catch (NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}