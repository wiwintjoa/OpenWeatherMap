using OpenWeatherMap.API.ServiceContract.Response;
using OpenWeatherMap.Core.Dto;

namespace OpenWeatherMap.API.ServiceContract
{
    public interface ICityService
    {
        GenericGetDtoCollectionResponse<CityDto> GetAll(string country);
    }
}
