using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog;
using post_office_management.Exceptions;
using post_office_management.Logger;
using post_office_management.Repositories;
using post_office_management.Repositories.LetterBagRepository;
using post_office_management.Repositories.ParcelBagRepository;
using post_office_management.Repositories.ParcelRepository;
using post_office_management.Services;
using post_office_management.Services.LetterBagService;
using post_office_management.Services.ParcelBagService;
using post_office_management.Services.ParcelService;
using post_office_management.Services.ShipmentService;
using post_office_management_app.Data;

namespace post_office_management
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            LogManager.LoadConfiguration(String.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<DataContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.ConfigureLoggerService();
            services.AddControllers()
                    .AddNewtonsoftJson();

            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient<IShipmentRepository, ShipmentRepository>(); 
            services.AddTransient<IParcelRepository, ParcelRepository>();
            services.AddTransient<IParcelBagRepository, ParcelBagRepository>();
            services.AddTransient<ILetterBagRepository, LetterBagRepository>();

            services.AddTransient<IShipmentService, ShipmentService>();
            services.AddTransient<IParcelService, ParcelService>();
            services.AddTransient<IParcelBagService, ParcelBagService>();
            services.AddTransient<ILetterBagService, LetterBagService>();

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
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
                app.ConfigureExceptionHandler(logger);
                
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
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
