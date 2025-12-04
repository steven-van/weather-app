const BASE_URL = "https://api.open-meteo.com/v1/";

export const getWeatherData = async (latitude, longitude) => {
    const response = await fetch(
        `${BASE_URL}forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,relative_humidity_2m_max,windspeed_10m_max&timezone=Europe/Paris`
    );
    return response.json();

};
