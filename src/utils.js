export const getDayOfWeek = (date) => {
  const dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek)
    ? null
    : [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][dayOfWeek];
};

export const toDateString = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const getWeatherDetails = (weatherCode) => {
const weatherDetails = {
    0: { title: "Sunny", icon: "material-symbols:wb-sunny-outline-rounded" },
    1: { title: "Mostly Sunny", icon: "material-symbols:wb-sunny-outline-rounded" },
    2: { title: "Partly Cloudy", icon: "partly-cloudy-day-outline-rounded" },
    3: { title: "Cloudy", icon: "material-symbols:cloud-outline" },
    45: { title: "Foggy", icon: "material-symbols:foggy-outline" },
    48: { title: "Rime Fog", icon: "material-symbols:foggy-outline" },
    51: { title: "Light Drizzle", icon: "material-symbols:rainy-outline" },
    53: { title: "Drizzle", icon: "material-symbols:rainy-outline" },
    55: { title: "Heavy Drizzle", icon: "material-symbols:rainy-outline" },
    56: { title: "Light Freezing Drizzle", icon: "material-symbols:snowing-outlined" },
    57: { title: "Freezing Drizzle", icon: "material-symbols:snowing-outlined" },
    61: { title: "Light Rain", icon: "material-symbols:rainy-outline" },
    63: { title: "Rain", icon: "material-symbols:rainy-outline" },
    65: { title: "Heavy Rain", icon: "material-symbols:rainy-outline" },
    66: { title: "Light Freezing Rain", icon: "material-symbols:snowing-outlined" },
    67: { title: "Freezing Rain", icon: "material-symbols:snowing-outlined" },
    71: { title: "Light Snow", icon: "material-symbols:rainy-outline" },
    73: { title: "Snow", icon: "weather-snowy-outline" },
    75: { title: "Heavy Snow", icon: "weather-snowy-outline" },
    77: { title: "Snow Grains", icon: "weather-snowy-outline" },
    80: { title: "Light Showers", icon: "material-symbols:rainy-outline" },
    81: { title: "Showers", icon: "material-symbols:rainy-outline" },
    82: { title: "Heavy Showers", icon: "material-symbols:rainy-outline" },
    85: { title: "Light Snow Showers", icon: "weather-snowy-outline" },
    86: { title: "Snow Showers", icon: "weather-snowy-outline" },
    95: { title: "Thunderstorms", icon: "material-symbols:thunderstorm-outline-rounded" },
    96: { title: "Thunderstorm with Light Hail", icon: "material-symbols:thunderstorm-outline-rounded" },
    99: { title: "Thunderstorm with Hail", icon: "material-symbols:thunderstorm-outline-rounded" }
};


  return (
    weatherDetails[weatherCode] || {
      title: "Unknown Weather",
      icon: "mdi:help-circle",
    }
  );
};
