import "./App.scss";
import { Icon } from "@iconify/react";
import ForecastItem from "./components/DayForecastCard";
import ForecastInfoItem from "./components/ForecastInfoItem";
import IconButton from "./components/IconButton";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import { getWeatherData } from "./assets/api/apiController";
import InputField from "./components/InputField";
import { getDayOfWeek, getWeatherDetails, toDateString } from "./utils";
import { getCityFromCoordinates } from "./assets/api/apiController";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState({});

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 52.52,
    longitude: 13.419998,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWeatherData(
          currentLocation.latitude,
          currentLocation.longitude
        );
        setData({
          ...response,
          city: await getCityFromCoordinates(
            currentLocation.latitude,
            currentLocation.longitude
          ),
        });
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentLocation]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLocationChange = () => {
    setCurrentLocation({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    closeModal();
  };

  if (loading)
    return (
      <div className="loading">
        <p>Loading</p>
        <Icon
          icon="material-symbols:rotate-right"
          className="loader"
          width="24"
          height="24"
        />
      </div>
    );
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
              {data.city}
            </p>
          </div>

          <div className="weather">
            <Icon
              icon={
                getWeatherDetails(data.daily.weather_code[currentDayIndex]).icon
              }
              width="50"
              height="50"
            />
            <p className="temperature">{`${data.daily.temperature_2m_min[currentDayIndex]} - ${data.daily.temperature_2m_max[currentDayIndex]}`}</p>
            <p className="weather-condition">
              {
                getWeatherDetails(data.daily.weather_code[currentDayIndex])
                  .title
              }
            </p>
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
          label={"Change coordinates"}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div class="location-form">
          <InputField
            label="Latitude"
            id="latitude"
            onChange={(e) =>
              setCoordinates({ ...coordinates, latitude: e.target.value })
            }
          />
          <InputField
            label="Longitude"
            id="longitude"
            onChange={(e) =>
              setCoordinates({ ...coordinates, longitude: e.target.value })
            }
          />
          <IconButton
            icon={"material-symbols:search-rounded"}
            label={"Search"}
            onClick={() => handleLocationChange()}
          />
        </div>
      </Modal>
    </div>
  );
};

export default App;
