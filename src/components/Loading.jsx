import { Icon } from "@iconify/react";

const Loading = () => {
  return (
    <div className="loading">
      <p>Loading</p>
      <Icon
        icon="material-symbols:rotate-right"
        className="loader"
        width="24"
        height="24"
      />
    </div>
  );
};

export default Loading;
