using System.Web.Http;
using System.Text.RegularExpressions;
using System.Linq;
using System.Threading;

using WebApi.Models;

namespace WebApi.Controllers
{
    [RoutePrefix("test")]
    public class TestController : ApiController
    {

        private const string emailPattern = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";

        [Route("email"), HttpGet]
        public IHttpActionResult Index(string email)
        {
            Thread.Sleep(1500);

            var isValidEmail = Regex.Match(email, emailPattern).Success;

            var result = new ValidationResult
            {
                isValid = isValidEmail,
                message = isValidEmail ? "" : string.Format("{0} is not a valid email address", email)
            };

            return Ok(result);
        }

        private string[] userNameList = new []{ "test", "username" };

        [Route("username"), HttpGet]
        public IHttpActionResult Username(string username)
        {
            Thread.Sleep(1500);

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
