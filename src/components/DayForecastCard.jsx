import { Icon } from "@iconify/react";

const ForecastItem = ({ day, temperature, onClick, isCurrentDate, icon}) => {
  return (
    <button onClick={onClick} className={`day-forecast-item ${isCurrentDate ? "active" : ""}`}>
      <Icon icon={icon} width="30" height="30" />
      <span>{day}</span>
      <span className="temperature">{temperature} °C</span>
    </button>
  );
};

export default ForecastItem;
