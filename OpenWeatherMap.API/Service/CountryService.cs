using OpenWeatherMap.API.Mock;
using OpenWeatherMap.API.ServiceContract;
using OpenWeatherMap.API.ServiceContract.Response;
using OpenWeatherMap.Core.Dto;
using OpenWeatherMap.Core.Resource;
using System.Linq;

namespace OpenWeatherMap.API.Service
{
    public class CountryService : BaseService<CountryDto>, ICountryService
    {
        public CountryService() { }

        public GenericGetDtoCollectionResponse<CountryDto> GetAll()
        {
            var response = new GenericGetDtoCollectionResponse<CountryDto>();

            var countries = Countries.GetCountries();

            if (!countries.Any())
            {
                response.AddErrorMessage(OpenWeatherResource.Country_NotAvailable);
                return response;
            }

            foreach (var country in countries)
            {
                var countryDto = new CountryDto
                {
                    Code = country.Value,
                    Name = country.Text
                };

                response.DtoCollection.Add(countryDto);
            }

            return response;
        }
    }
}
