import { useEffect } from 'react';


 // Load Bootstrap first
import '../../assets/css/popup/DeleteConfirmModal.css'; // Import the plain CSS file


const DeleteConfirmModal = ({ show, onClose, onConfirm, message }) => {
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
      <div className="modal-overlay"style={{ zIndex: 9000 }}>
        <div className="modal-box">
          <div className="modal-header">Delete Order?</div>
          <hr className="modal-separator" />
          <div className="modal-message">{message || "This will delete the order permanently."}</div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={onClose}>Cancel</button>
            <button className="btn-delete" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmModal;
