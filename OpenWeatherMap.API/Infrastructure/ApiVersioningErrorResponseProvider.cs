using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.AspNetCore.Mvc;
using OpenWeatherMap.API.Model;

namespace OpenWeatherMap.API.Infrastructure
{
    public class ApiVersioningErrorResponseProvider : DefaultErrorResponseProvider
    {
        public override IActionResult CreateResponse(ErrorResponseContext context)
        {
            var responseObj = new ApiErrorModel
            {
                ErrorMessages = new string[] { context.Message },
            };

            var response = new ObjectResult(responseObj);
            response.StatusCode = 400;

            return response;
        }
    }
}
