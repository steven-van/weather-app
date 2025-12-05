import { Icon } from "@iconify/react";

const ForecastItem = ({ day, temperature, onClick, isCurrentDate, icon}) => {
  return (
    <div onClick={onClick} className={`day-forecast-item ${isCurrentDate ? "active" : ""}`}>
      <Icon icon={icon} width="30" height="30" />
      <p>{day}</p>
      <p className="temperature">{temperature} °C</p>
    </div>
  );
};

export default ForecastItem;
