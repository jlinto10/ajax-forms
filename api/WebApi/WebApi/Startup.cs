using Owin;
using System.Net.Http.Formatting;
using System.Web.Http;
using Microsoft.Owin.Cors;

namespace WebApi
{
    public class Startup
    {
        // This code configures Web API. The Startup class is specified as a type
        // parameter in the WebApp.Start method.
        public void Configuration(IAppBuilder appBuilder)
        {
            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();

            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter());

            appBuilder.UseCors(CorsOptions.AllowAll);

            config.Routes.MapHttpRoute(
                name: "WebApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            
            appBuilder.UseWebApi(config);
        }
    }
}
