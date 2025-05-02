import React from 'react';
import '../assets/css/style.css'; // Make sure your styles are applied if needed

const Copyright = () => {
  return (
    <div class="container-fluid copyright py-4">
        <div class="container">
            <div class="row">
                <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    &copy; <a class="fw-medium" href="#">Tea House</a>, All Right Reserved.
                </div>
                <div class="col-md-6 text-center text-md-end">
                   
                Designed By <a class="fw-medium">Dayan Tharindu</a> 
                </div>
            </div>
        </div>
    </div>
  );
};

export default Copyright;
