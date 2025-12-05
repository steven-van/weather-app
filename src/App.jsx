import "./App.scss";
import { Icon } from "@iconify/react";
import ForecastItem from "./components/DayForecastItem";
import ForecastInfoItem from "./components/ForecastInfoItem";
import IconButton from "./components/IconButton";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import { getWeatherData } from "./assets/api/apiController";
import { getDayOfWeek, getWeatherDetails, toDateString } from "./utils";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWeatherData(43.468, -1.5536);
        setData(response);
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="current-weather-container">
        <div className="current-weather">
          <div>
            <p className="day">
              {getDayOfWeek(data.daily.time[currentDayIndex])}
            </p>
            <p className="date">
              {toDateString(data.daily.time[currentDayIndex])}
            </p>
            <p className="location">
              <Icon icon={"solar:map-point-linear"} width="20" height="20" />
              TO CHANGE
            </p>
          </div>

          <div className="weather">
            <Icon icon={getWeatherDetails(data.daily.weather_code[currentDayIndex]).icon} width="50" height="50" />
            <p className="temperature">{`${data.daily.temperature_2m_min[currentDayIndex]} - ${data.daily.temperature_2m_max[currentDayIndex]}`}</p>
            <p className="weather-condition">{getWeatherDetails(data.daily.weather_code[currentDayIndex]).title}</p>
          </div>
        </div>
      </div>

      <div className="forecast">
        <div className="current-forecast">
          <ForecastInfoItem
            label={"Precipitation"}
            value={`${data.daily.precipitation_probability_mean[currentDayIndex]} ${data.daily_units.precipitation_probability_mean}`}
          />
          <ForecastInfoItem
            label={"Humidity"}
            value={`${data.daily.relative_humidity_2m_mean[currentDayIndex]} ${data.daily_units.relative_humidity_2m_mean}`}
          />
          <ForecastInfoItem
            label={"Wind"}
            value={`${data.daily.wind_speed_10m_mean[currentDayIndex]} ${data.daily_units.wind_speed_10m_mean}`}
          />
        </div>
        <div className="week-forecast">
          {[...Array(4)].map((_, i) => (
            <ForecastItem
              icon={getWeatherDetails(data.daily.weather_code[i]).icon}
              onClick={() => setCurrentDayIndex(i)}
              key={i}
              isCurrentDate={i === currentDayIndex}
              day={getDayOfWeek(data.daily.time[i])}
              temperature={`${Math.round(
                (data.daily.temperature_2m_min[i] +
                  data.daily.temperature_2m_max[i]) /
                  2
              )}`}
            />
          ))}
        </div>

        <IconButton
          onClick={openModal}
          icon={"solar:map-point-linear"}
          label={"Change location"}
          className={"change-location-btn"}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        TO CHANGE
      </Modal>
    </div>
  );
};

export default App;

// https://api.open-meteo.com/v1/forecast?latitude=43.4680&longitude=-1.5536&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,relative_humidity_2m_max,windspeed_10m_max&timezone=Europe/Paris
