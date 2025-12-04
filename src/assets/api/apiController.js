const BASE_URL = "https://api.open-meteo.com/v1/";

export const getWeatherData = async (latitude, longitude) => {
    const response = await fetch(
        `${BASE_URL}forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_mean,wind_speed_10m_mean,relative_humidity_2m_mean`
    );
    return response.json();

};
