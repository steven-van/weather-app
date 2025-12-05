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
    0: { title: "Sunny", icon: "mdi:sun" },
    1: { title: "Mostly Sunny", icon: "mdi:sun" },
    2: { title: "Partly Cloudy", icon: "mdi:cloud-sun" },
    3: { title: "Cloudy", icon: "mdi:cloud" },
    45: { title: "Foggy", icon: "mdi:weather-fog" },
    48: { title: "Rime Fog", icon: "mdi:weather-fog" },
    51: { title: "Light Drizzle", icon: "mdi:weather-rainy" },
    53: { title: "Drizzle", icon: "mdi:weather-rainy" },
    55: { title: "Heavy Drizzle", icon: "mdi:weather-rainy" },
    56: { title: "Light Freezing Drizzle", icon: "mdi:snowflake" },
    57: { title: "Freezing Drizzle", icon: "mdi:snowflake" },
    61: { title: "Light Rain", icon: "mdi:weather-rainy" },
    63: { title: "Rain", icon: "mdi:weather-rainy" },
    65: { title: "Heavy Rain", icon: "mdi:weather-rainy" },
    66: { title: "Light Freezing Rain", icon: "mdi:snowflake" },
    67: { title: "Freezing Rain", icon: "mdi:snowflake" },
    71: { title: "Light Snow", icon: "mdi:snowflake" },
    73: { title: "Snow", icon: "mdi:snowflake" },
    75: { title: "Heavy Snow", icon: "mdi:snowflake" },
    77: { title: "Snow Grains", icon: "mdi:snowflake" },
    80: { title: "Light Showers", icon: "mdi:weather-pouring" },
    81: { title: "Showers", icon: "mdi:weather-pouring" },
    82: { title: "Heavy Showers", icon: "mdi:weather-pouring" },
    85: { title: "Light Snow Showers", icon: "mdi:snowflake" },
    86: { title: "Snow Showers", icon: "mdi:snowflake" },
    95: { title: "Thunderstorms", icon: "mdi:weather-lightning" },
    96: {
      title: "Thunderstorm with Light Hail",
      icon: "mdi:weather-lightning",
    },
    99: { title: "Thunderstorm with Hail", icon: "mdi:weather-lightning" },
  };

  return (
    weatherDetails[weatherCode] || {
      title: "Unknown Weather",
      icon: "mdi:question-mark-rounded",
    }
  );
};
