import { Icon } from "@iconify/react";

const IconButton = ({ label, icon, className }) => {
  return (
    <button className={className}>
      <Icon icon={icon} width="20" height="20" />
      {label}
    </button>
  );
};

export default IconButton;
