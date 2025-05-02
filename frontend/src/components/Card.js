import React from 'react';
import "../assets/css/OrderManagment/Card.css";

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-lg rounded-2xl p-4 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);
