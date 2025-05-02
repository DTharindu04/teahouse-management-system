import React from 'react';



const Header = ({ title }) => {
  return (
    <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
      <div className="container text-center py-5">
        <h1 className="display-2 text-dark mb-4 animated slideInDown">{title}</h1>
      </div>
    </div>
  );
};

export default Header;