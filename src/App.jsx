import "./App.scss";
import { Icon } from "@iconify/react";
import ForecastItem from "./components/DayForecastItem";
import ForecastInfoItem from "./components/ForecastInfoItem";
import IconButton from "./components/IconButton";
import Modal from "./components/Modal";

const App = () => {
  return (
    <div className="container">
      <div className="current-weather-container">
        <div className="current-weather">
          <div>
            <p className="day">Tuesday</p>
            <p className="date">20 Jun 2022</p>
            <p className="location">
              <Icon icon={"solar:map-point-linear"} width="20" height="20" />
              Biarritz, FR
            </p>
          </div>

          <div className="weather">
            <Icon icon="solar:sun-2-line-duotone" width="50" height="50" />
            <p className="temperature">29 °C</p>
            <p className="weather-condition">Sunny</p>
          </div>
        </div>
      </div>

      <div className="forecast">
        <div className="current-forecast">
          <ForecastInfoItem label={"Precipitation"} value={"0%"} />
          <ForecastInfoItem label={"Humidity"} value={"42%"} />
          <ForecastInfoItem label={"Wind"} value={"3 km/h"} />
        </div>
        <div className="week-forecast">
          <ForecastItem day={"Tue"} temperature={"29"} />
          <ForecastItem day={"Tue"} temperature={"29"} />
          <ForecastItem day={"Tue"} temperature={"29"} />
          <ForecastItem day={"Tue"} temperature={"29"} />
        </div>

        <IconButton
          icon={"solar:map-point-linear"}
          label={"Change location"}
          className={"change-location-btn"}
        />
      </div>
      <Modal isOpen={true}>Test</Modal>
    </div>
  );
};

export default App;
