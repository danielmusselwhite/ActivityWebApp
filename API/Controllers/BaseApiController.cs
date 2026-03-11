using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController() : ControllerBase
    {
        #region Lazy-loaded Mediator
        private IMediator? _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<IMediator>();
        #endregion

        // todo - not sure if this is better or the previous way with exceptions + global exception middleware was better
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result.IsSuccess && result.Value != null)
            {
                return Ok(result.Value);
            }
            else if (result.Code == 404 || result.Value == null)
            {
                return NotFound(result.Error);
            }
            else // any other error code
            {
                return BadRequest(result.Error);
            }
        }
    }
}
