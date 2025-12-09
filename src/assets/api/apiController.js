export const getWeatherData = async (latitude, longitude) => {
  const url = 
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_mean,wind_speed_10m_mean,relative_humidity_2m_mean`;

  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getCoordinatesFromLocation = async (cityName) => {

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
};
