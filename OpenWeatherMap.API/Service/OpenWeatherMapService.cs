using Newtonsoft.Json;
using OpenWeatherMap.API.ServiceContract;
using OpenWeatherMap.API.ServiceContract.Response;
using OpenWeatherMap.Core.Dto;
using OpenWeatherMap.Core.Resource;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace OpenWeatherMap.API.Service
{
    public class OpenWeatherMapService : BaseService<WeatherDto>, IOpenWeatherMapService
    {
        private readonly HttpClient _client;

        public OpenWeatherMapService()
        {
            _client = new HttpClient();
        }

        public async Task<GenericResponse<WeatherDto>> GetWeatherData(string city)
        {
            var response = new GenericResponse<WeatherDto>();

            if (string.IsNullOrEmpty(city))
            {
                response.AddErrorMessage(OpenWeatherResource.Parameter_IsInvalid);
                return response;
            }

            var weatherDto = new WeatherDto();
            try
            {
                var query = "https://api.openweathermap.org/data/2.5/weather?q=+" + city + "&appid=f289868b0ab99520b5821cfe6dd3b933";
                var apiResponse = await _client.GetAsync(query);
                if (apiResponse.IsSuccessStatusCode)
                {
                    var content = await apiResponse.Content.ReadAsStringAsync();
                    weatherDto = JsonConvert.DeserializeObject<WeatherDto>(content);

                    weatherDto.TemperatureC = ConvertToCelsius(weatherDto.Main.Temperature);
                    weatherDto.TemperatureF = ConvertToFahrenheit(weatherDto.TemperatureC);
                    weatherDto.CurrentDateTime = TimeStampToDateTime(weatherDto.Dt).ToString();
                    weatherDto.TemperatureMinC = ConvertToCelsius(weatherDto.Main.TempMin);
                    weatherDto.TemperatureMaxC = ConvertToCelsius(weatherDto.Main.TempMax);

                    response.Data = weatherDto;

                    return response;
                }
                else
                {
                    response.AddErrorMessage(apiResponse.RequestMessage.ToString());

                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AddErrorMessage(ex.Message.ToString());
                response.Data = weatherDto;
            }

            return response;
        }

        private static double ConvertToFahrenheit(double celsius)
        {
            return Math.Round(((9.0 / 5.0) * celsius) + 32, 3);
        }

        private static double ConvertToCelsius(double kelvin)
        {
            return Math.Round(kelvin - 273.15, 3);
        }

        private static DateTime TimeStampToDateTime(double unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            DateTime dateTime = DateTime.UnixEpoch;
            dateTime = dateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dateTime;
        }
    }
}
