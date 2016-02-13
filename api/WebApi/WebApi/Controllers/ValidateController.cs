﻿using System;
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
        private const string _emailPattern = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";

        [Route("email"), HttpGet]
        public IHttpActionResult Index(string email)
        {
            Thread.Sleep(_random.Next(_delay) + _delay/2);

            var isValidEmail = Regex.Match(email, _emailPattern).Success;

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