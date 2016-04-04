using System;
using System.Web.Http;
using System.Text.RegularExpressions;
using System.Linq;
using System.Threading;

using WebApi.Models;

namespace WebApi.Controllers
{
    [RoutePrefix("validate")]
    public class ValidateController : ApiController
    {
        private readonly Random _random = new Random();

        private const int _delay = 500;

        private string[] userNameList = new []{ "test", "username" };

        [Route("username"), HttpGet]
        public IHttpActionResult Username(string username)
        {
            Thread.Sleep(_random.Next(_delay) + _delay / 2);

            var userNameAvailable = !userNameList.Contains(username);

            var result = new ValidationResult
            {
                isValid = userNameAvailable,
                message = userNameAvailable ? "" : string.Format("{0} is taken", username)
            };

            return Ok(result);
        }
    }
}
