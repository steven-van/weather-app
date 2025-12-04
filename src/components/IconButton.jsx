import { Icon } from "@iconify/react";

const IconButton = ({ label, icon, className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <Icon icon={icon} width="20" height="20" />
      {label}
    </button>
  );
};

export default IconButton;
