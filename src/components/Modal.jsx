import ReactDOM from 'react-dom';
import { Icon } from "@iconify/react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <Icon class="modal-close-btn" color="white" icon="material-symbols:close-rounded" width="24" height="24" />
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
};

export default Modal;
