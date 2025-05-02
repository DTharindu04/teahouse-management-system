import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../../assets/css/popup/SuccessMessage.css';

const SuccessMessage = ({ show, message }) => {
  const navigate = useNavigate();

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
          <div className="modal-header">Success!</div>
          <hr className="modal-separator" />
          <div className="success-message">{message || "Order submitted successfully!"}</div>
          <div className="modal-footer">
          <button className="btn-ok" onClick={() => navigate('/orders')}>OK</button>

          </div>
        </div>
      </div>
   
  );
};

export default SuccessMessage;
