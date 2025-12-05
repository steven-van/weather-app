export const getWeatherData = async (latitude, longitude) => {
  const url = 
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_mean,wind_speed_10m_mean,relative_humidity_2m_mean`;

  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error.response.data);
    alert("Error fetching data");
  }
};

export const getCityFromCoordinates = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&accept-language=en&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const city = `${(data.address.city || data.address.town || data.address.village)}, ${data.address.country}`;
    return city;
  } catch (error) {
    console.error("Error:", error);
    alert("Error fetching data");

  }
};
