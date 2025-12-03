import { Icon } from "@iconify/react";

const ForecastItem = ({ day, temperature}) => {
  return (
    <div className="day-forecast-item">
      <Icon icon="solar:sun-2-line-duotone" width="30" height="30" />
      <p>{day}</p>
      <p className="temperature">{temperature} °C</p>
    </div>
  );
};

export default ForecastItem;
