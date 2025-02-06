using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using OpenWeatherMap.API.Controllers;
using OpenWeatherMap.API.ServiceContract;
using OpenWeatherMap.API.ServiceContract.Response;
using OpenWeatherMap.Core.Dto;
using System.Threading.Tasks;
using Xunit;

namespace OpenWeatherMap.Tests.Controller
{
    public class OpenWeatherMapControllerUnitTest
    {
        #region Fields

        private readonly Mock<IOpenWeatherMapService> openWeatherServiceMock;
        private readonly Mock<ICountryService> countryServiceMock;
        private readonly Mock<ICityService> cityServiceMock;

        private readonly OpenWeatherMapController controller;

        #endregion

        #region Constructors

        public OpenWeatherMapControllerUnitTest()
        {
            this.countryServiceMock = new Mock<ICountryService>();
            this.cityServiceMock = new Mock<ICityService>();
            this.openWeatherServiceMock = new Mock<IOpenWeatherMapService>();

            this.controller = new OpenWeatherMapController(
                this.countryServiceMock.Object,
                this.cityServiceMock.Object,
                this.openWeatherServiceMock.Object
                );
        }

        #endregion

        #region Test Method

        [Fact]
        public async Task GetOpenWeather_ReturnsNotFoundStatus()
        {
            var response = new GenericResponse<WeatherDto>();

            response.AddErrorMessage(It.IsAny<string>());

            this.openWeatherServiceMock
               .Setup(service => service.GetWeatherData(It.IsAny<string>()))
               .ReturnsAsync(response);

            var result = (ObjectResult)await this.controller.GetOpenWeather(null).ConfigureAwait(true);
            Assert.Equal(StatusCodes.Status404NotFound, result.StatusCode);
        }

        [Fact]
        public async Task GetOpenWeather_ReturnsSuccessStatus()
        {
            var response = new GenericResponse<WeatherDto>();

            this.openWeatherServiceMock
               .Setup(service => service.GetWeatherData(It.IsAny<string>()))
               .ReturnsAsync(response);

            var result = (OkObjectResult)await this.controller.GetOpenWeather(It.IsAny<string>()).ConfigureAwait(true);
            Assert.Equal(StatusCodes.Status200OK, result.StatusCode);
        }

        #endregion
    }
}
