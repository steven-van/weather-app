const InputField = ({ label, id, value, onChange }) => {
  return (
    <div className="input-container">
      <label htmlFor={id} className="input-label">{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
};

export default InputField;