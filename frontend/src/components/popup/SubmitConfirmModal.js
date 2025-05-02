import { useEffect } from 'react';
import '../../assets/css/popup/SubmitConfirmModal.css'; // You can reuse this CSS or rename it if needed

const SubmitConfirmModal = ({ show, onClose, onConfirm, message }) => {
  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 9000 }}>
      <div className="modal-box">
        <div className="modal-header">Submit Order?</div>
        <hr className="modal-separator" />
        <div className="modal-message">
          {message || "Are you sure you want to submit this order?"}
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default SubmitConfirmModal;
