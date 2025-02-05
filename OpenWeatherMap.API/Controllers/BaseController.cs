using Microsoft.AspNetCore.Mvc;
using OpenWeatherMap.API.Model;

namespace OpenWeatherMap.API.Controllers
{
    public class BaseController : ControllerBase
    {
        protected IActionResult GetApiError(string[] errorMessages, int? httpStatusCode = null)
        {
            var actualStatusCode = httpStatusCode.HasValue ? httpStatusCode.Value : 400;
            var responseObj = new ApiErrorModel
            {
                ErrorMessages = errorMessages,
            };

            return this.StatusCode(actualStatusCode, responseObj);
        }

        [NonAction]
        protected virtual JsonResult Json(object data)
        {
            return new JsonResult(data);
        }
    }
}
