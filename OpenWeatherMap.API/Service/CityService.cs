using OpenWeatherMap.API.Mock;
using OpenWeatherMap.API.ServiceContract;
using OpenWeatherMap.API.ServiceContract.Response;
using OpenWeatherMap.Core.Dto;
using OpenWeatherMap.Core.Resource;
using System.Linq;

namespace OpenWeatherMap.API.Service
{
    public class CityService : BaseService<CityDto>, ICityService
    {
        public CityService() { }

        public GenericGetDtoCollectionResponse<CityDto> GetAll(string country)
        {
            var response = new GenericGetDtoCollectionResponse<CityDto>();

            var cities = Cities.GetCities(country);

            if (!cities.Any())
            {
                response.AddErrorMessage(OpenWeatherResource.City_NotAvailable);
                return response;
            }

            foreach (var city in cities)
            {
                var cityDto = new CityDto
                {
                    Code = city.Value,
                    Name = city.Text
                };

                response.DtoCollection.Add(cityDto);
            }

            return response;
        }
    }
}
