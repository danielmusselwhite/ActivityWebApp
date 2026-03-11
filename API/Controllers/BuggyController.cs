using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// This controller is used to test the error handling middleware. It has endpoints that will return different types of errors, such as 404 not found, 400 bad request, 500 server error, and 401 unauthorized.
    /// </summary>
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest("This is a bad request");
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }

        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }
    }
}
