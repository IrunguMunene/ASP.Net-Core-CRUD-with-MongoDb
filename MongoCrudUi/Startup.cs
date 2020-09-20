using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoCrudUi.Extensions;
using MongoCrudUi.Interfaces;
using MongoCrudUi.Logger;
using MongoCrudUi.Repositories;
using MongoDB.Driver;
using NLog;
using System;
using System.IO;

namespace MongoCrudUi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            // Get nlog config file
            LogManager.LoadConfiguration(String.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
            
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.ConfigureIISIntegration();
            services.AddSingleton<ILoggerManager, LoggerManager>();

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            // Create a mongo client connection. The Mongo client instance in 
            // mongoDB is already a pool connection, hence the use of a singleton to
            // avoid creating a new pool connection.
            services.AddSingleton<IMongoClient>(mc =>
            {
                // change this value to reflect the right connection string.

                //Uncomment the following out if not using a replica set
                //return new MongoClient(Configuration.GetConnectionString("MongoDb"))

                // Comment the following out if not using a replica set
                return new MongoClient(Configuration.GetConnectionString("MongoDbWithReplicaSets")); 
            });

            // IoC declaration for starting a session of mongodb transaction,
            // scoped because transaction life cycle will be equal to the request life cycle 
            services.AddScoped(mc => mc.GetService<IMongoClient>().StartSession());

            services.AddTransient<IEmployeeRepository, EmployeeRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerManager logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.ConfigureExceptionHandler(logger);

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
