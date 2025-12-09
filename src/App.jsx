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
import { getCoordinatesFromLocation } from "./assets/api/apiController";
import LocationItem from "./components/LocationItem";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({});
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
    const searchLocation = setTimeout(async () => {
      try {
        const response = await getCoordinatesFromLocation(location);
        setLocationData(response);
      } catch (error) {
        alert("Error");
      }
    }, 1000);

    return () => clearTimeout(searchLocation);
  }, [location]);

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
                setLocation(e.target.value);
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
              {getDayOfWeek(data.daily.time[currentDayIndex])}
            </p>
            <p className="date">
              {toDateString(data.daily.time[currentDayIndex])}
            </p>
            <p className="location">
              <Icon icon={"solar:map-point-linear"} width="20" height="20" />
              {selectedLocation.name}, {selectedLocation.country}
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
            <p className="temperature">{`${data.daily.temperature_2m_min[currentDayIndex]} | ${data.daily.temperature_2m_max[currentDayIndex]} °C`}</p>
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
        <ul className="week-forecast">
          {[...Array(4)].map((_, i) => (
            <ForecastItem
              key={i}
              icon={getWeatherDetails(data.daily.weather_code[i]).icon}
              onClick={() => setCurrentDayIndex(i)}
              isCurrentDate={i === currentDayIndex}
              day={getDayOfWeek(data.daily.time[i])}
              temperature={Math.round(
                (data.daily.temperature_2m_min[i] +
                  data.daily.temperature_2m_max[i]) /
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
              setLocation(e.target.value);
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
