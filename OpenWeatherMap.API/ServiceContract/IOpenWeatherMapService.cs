using OpenWeatherMap.API.ServiceContract.Response;
using OpenWeatherMap.Core.Dto;
using System.Threading.Tasks;

namespace OpenWeatherMap.API.ServiceContract
{
    public interface IOpenWeatherMapService
    {
        Task<GenericResponse<WeatherDto>> GetWeatherData(string city);
    }
}
