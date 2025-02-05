using Newtonsoft.Json;

namespace OpenWeatherMap.Core.Dto.Map
{
    public class Clouds
    {
        [JsonProperty("all")]
        public long All { get; set; }
    }
}
