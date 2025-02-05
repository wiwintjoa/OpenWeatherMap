using Newtonsoft.Json;

namespace OpenWeatherMap.API.Model
{
    public class ApiErrorModel
    {
        [JsonProperty("errorMessages")]
        public string[] ErrorMessages { get; set; }
    }
}
