const ForecastInfoItem = ({label, value}) => {
  return (
    <p className="forecast-info">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </p>
  );
};

export default ForecastInfoItem;
