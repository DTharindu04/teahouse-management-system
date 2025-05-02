import React from 'react';
import '../assets/css/bootstrap.min.css'; 
import '../assets/css/style.css';         

const Spinner = ({ loading }) => {
  return (
    <div
      id="spinner"
      className={`spinner-wrapper ${loading ? 'show' : ''}`}
    >
      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}></div>
    </div>
  );
};

export default Spinner;
