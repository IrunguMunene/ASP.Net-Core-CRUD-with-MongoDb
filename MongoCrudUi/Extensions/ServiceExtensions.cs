using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace MongoCrudUi.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureIISIntegration(this IServiceCollection services)
        {
            // No options defined, keeps the default.
            services.Configure<IISOptions>(options =>
            {
            });
        }
    }
}
