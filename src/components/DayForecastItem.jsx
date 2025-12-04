import { Icon } from "@iconify/react";

const ForecastItem = ({ day, temperature, onClick, isCurrentDate}) => {
  return (
    <div onClick={onClick} className={`day-forecast-item ${isCurrentDate ? "active" : ""}`}>
      <Icon icon="solar:sun-2-line-duotone" width="30" height="30" />
      <p>{day}</p>
      <p className="temperature">{temperature} °C</p>
    </div>
  );
};

export default ForecastItem;
