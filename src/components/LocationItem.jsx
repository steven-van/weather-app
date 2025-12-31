const LocationItem = ({ location, isSelected, onClick }) => {
  const { name, country, country_code } = location;
  const countryCode = country_code?.toLowerCase() ?? "";

  return (
    <button
      className={`location-item ${isSelected ? "active" : ""}`}
      onClick={onClick}
    >
      <img
        className="country-flag"
        src={`https://flagcdn.com/${countryCode}.svg`}
        width="30"
        alt={country}
      />
      <span>
        {name}, {country}
      </span>
    </button>
  );
};

export default LocationItem;
