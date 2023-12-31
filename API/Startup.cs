using API.Errors;
using API.Extensions;
using API.Middleware;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;


namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public async void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
            services.AddSwaggerDocumentation();

            // Create a scope within ConfigureServices
            using (var scope = services.BuildServiceProvider().CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                var context = serviceProvider.GetRequiredService<StoreContext>();
                var identityContext = serviceProvider.GetRequiredService<AppIdentityDbContext>();
                var userManager = serviceProvider.GetRequiredService<UserManager<AppUser>>();
                var logger = serviceProvider.GetRequiredService<ILogger<Startup>>();

                try
                {
                    context.Database.Migrate();
                    await identityContext.Database.MigrateAsync();
                    await StoreContextSeed.SeedAsync(context);
                    await AppIdentityDbContextSeed.SeedUserAsync(userManager);
           
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred during migration");
                }
            }


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwaggerDocumentation();
                
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseCors("CorsPolicy");

            app.UseRouting();

            app.UseAuthorization();

            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
