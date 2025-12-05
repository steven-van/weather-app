import { Icon } from "@iconify/react";

const IconButton = ({ label, icon, onClick }) => {
  return (
    <button className={`icon-btn`} onClick={onClick}>
      <Icon icon={icon} width="20" height="20" />
      {label}
    </button>
  );
};

export default IconButton;
