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
import { getDataFromLocation } from "./assets/api/apiController";
import LocationItem from "./components/LocationItem";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weatherData, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [error, setError] = useState(null);
  const [searchLocation, setSearchLocation] = useState({});
  const [locationData, setLocationData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});
  const fetchWeatherData = async (lat, long) => {
    if (lat && long) {
      try {
        const response = await getWeatherData(lat, long);
        setData(response);
        setLoading(false);
        setError(null);
        closeModal();
      } catch (error) {
        setLoading(true);
        setError("An error occurred while fetching data");
      }
    }
  };

  useEffect(() => {
    const handleSearchLocation = setTimeout(async () => {
      try {
        const response = await getDataFromLocation(searchLocation);
        setLocationData(response);
      } catch (error) {
        // TO DO
      }
    }, 1000);

    return () => clearTimeout(handleSearchLocation);
  }, [searchLocation]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading)
    return (
      <>
        <div className="loading">
          <p>Loading</p>
          <Icon
            icon="material-symbols:rotate-right"
            className="loader"
            width="24"
            height="24"
          />
        </div>
        <IconButton
          onClick={openModal}
          icon={"solar:map-point-linear"}
          label={"Select location"}
        />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="location-form">
            <InputField
              label="Location"
              id="location"
              onChange={(e) => {
                setSearchLocation(e.target.value);
              }}
            />

            {locationData && locationData.length > 0 && (
              <ul role="listbox" className="location-list-container">
                {locationData.map((location) => {
                  return (
                    <li>
                      <LocationItem
                        location={location}
                        isSelected={location === selectedLocation}
                        onClick={() => setSelectedLocation(location)}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
            <IconButton
              icon={"material-symbols:search-rounded"}
              label={"Search"}
              onClick={() =>
                fetchWeatherData(
                  selectedLocation.latitude,
                  selectedLocation.longitude
                )
              }
            />
            {error && <p className="error-message">{error}</p>}
          </div>
        </Modal>
      </>
    );

  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="current-weather-container">
        <div className="current-weather">
          <div>
            <p className="day">
              {getDayOfWeek(weatherData.daily.time[currentDayIndex])}
            </p>
            <p className="date">
              {toDateString(weatherData.daily.time[currentDayIndex])}
            </p>
            <p className="location">
              <Icon icon={"solar:map-point-linear"} width="20" height="20" />
              {selectedLocation.name}, {selectedLocation.country}
            </p>
          </div>

          <div className="weather">
            <Icon
              icon={
                getWeatherDetails(weatherData.daily.weather_code[currentDayIndex]).icon
              }
              width="50"
              height="50"
            />
            <p className="temperature">{`${weatherData.daily.temperature_2m_min[currentDayIndex]} | ${weatherData.daily.temperature_2m_max[currentDayIndex]} °C`}</p>
            <p className="weather-condition">
              {
                getWeatherDetails(weatherData.daily.weather_code[currentDayIndex])
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
            value={`${weatherData.daily.precipitation_probability_mean[currentDayIndex]} ${weatherData.daily_units.precipitation_probability_mean}`}
          />
          <ForecastInfoItem
            label={"Humidity"}
            value={`${weatherData.daily.relative_humidity_2m_mean[currentDayIndex]} ${weatherData.daily_units.relative_humidity_2m_mean}`}
          />
          <ForecastInfoItem
            label={"Wind"}
            value={`${weatherData.daily.wind_speed_10m_mean[currentDayIndex]} ${weatherData.daily_units.wind_speed_10m_mean}`}
          />
        </div>
        <ul className="week-forecast">
          {[...Array(4)].map((_, i) => (
            <ForecastItem
              key={i}
              icon={getWeatherDetails(weatherData.daily.weather_code[i]).icon}
              onClick={() => setCurrentDayIndex(i)}
              isCurrentDate={i === currentDayIndex}
              day={getDayOfWeek(weatherData.daily.time[i])}
              temperature={Math.round(
                (weatherData.daily.temperature_2m_min[i] +
                  weatherData.daily.temperature_2m_max[i]) /
                  2
              )}
            />
          ))}
        </ul>

        <IconButton
          onClick={openModal}
          icon={"solar:map-point-linear"}
          label={"Change location"}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="location-form">
          <InputField
            label="Location"
            id="location"
            onChange={(e) => {
              setSearchLocation(e.target.value);
            }}
          />
          {locationData && locationData.length > 0 && (
            <ul role="listbox" className="location-list-container">
              {locationData.map((location) => {
                return (
                  <li>
                    <LocationItem
                      location={location}
                      isSelected={location === selectedLocation}
                      onClick={() => setSelectedLocation(location)}
                    />
                  </li>
                );
              })}
            </ul>
          )}
          <IconButton
            icon={"material-symbols:search-rounded"}
            label={"Search"}
            onClick={() =>
              fetchWeatherData(
                selectedLocation.latitude,
                selectedLocation.longitude
              )
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default App;
