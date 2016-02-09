using Microsoft.Owin.Hosting;
using System;
using System.Net.Http;

namespace WebApi
{
    class Program
    {
        static void Main(string[] args)
        {
            string baseAddress = "http://localhost:2300/";

            // Start OWIN host 
            using (WebApp.Start<Startup>(url: baseAddress))
            {
                Console.WriteLine("OWIN self hosted service started at {0}\n", baseAddress);
                Console.ReadLine();
            }
        }
    }
}
