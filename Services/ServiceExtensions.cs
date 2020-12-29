using Microsoft.Extensions.DependencyInjection;
using post_office_management.Logger;

namespace post_office_management.Services
{
    public static class ServiceExtensions
    {
        public static void ConfigureLoggerService(this IServiceCollection services)
        {
        services.AddSingleton<ILoggerManager, LoggerManager>();
        }
    }
}