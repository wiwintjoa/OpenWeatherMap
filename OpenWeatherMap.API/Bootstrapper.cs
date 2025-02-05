using Microsoft.Extensions.DependencyInjection;
using OpenWeatherMap.API.Service;
using OpenWeatherMap.API.ServiceContract;

namespace OpenWeatherMap.API
{
    public static class Bootstrapper
    {
        public static void SetupServices(IServiceCollection service)
        {
            service.AddScoped<ICityService, CityService>();
            service.AddScoped<ICountryService, CountryService>();
            service.AddScoped<IOpenWeatherMapService, OpenWeatherMapService>();
        }
    }
}
