import React from 'react';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import aboutImg1 from '../assets/img/about-1.jpg';
import aboutImg2 from '../assets/img/about-2.jpg';
import aboutImg3 from '../assets/img/about-3.jpg';
import aboutImg4 from '../assets/img/about-4.jpg';
import aboutImg5 from '../assets/img/about-5.jpg';
import aboutImg6 from '../assets/img/about-6.jpg';

const About = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6 text-end">
                <img className="img-fluid bg-white w-100 mb-3 wow fadeIn" data-wow-delay="0.1s" src={aboutImg1} alt=""/>
                <img className="img-fluid bg-white w-50 wow fadeIn" data-wow-delay="0.2s" src={aboutImg3} alt=""/>
              </div>
              <div className="col-6">
                <img className="img-fluid bg-white w-50 mb-3 wow fadeIn" data-wow-delay="0.3s" src={aboutImg4} alt=""/>
                <img className="img-fluid bg-white w-100 wow fadeIn" data-wow-delay="0.4s" src={aboutImg2} alt=""/>
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <div className="section-title">
              <p className="fs-5 fw-medium fst-italic text-primary">About Us</p>
              <h1 className="display-6">The success story of TEA House over 25 years</h1>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-sm-4">
                <img className="img-fluid bg-white w-100" src={aboutImg5} alt=""/>
              </div>
              <div className="col-sm-8">
                <h5>Our tea is cherished by millions around the globe</h5>
                <p className="mb-0">
                  For over two decades, TEA House has delivered rich and aromatic blends that bring warmth, comfort, and connection to people's lives across the world.
                </p>
              </div>
            </div>
            <div className="border-top mb-4"></div>
            <div className="row g-3">
              <div className="col-sm-8">
                <h5>Drinking tea daily supports a healthy lifestyle</h5>
                <p className="mb-0">
                  Studies show that regular tea consumption can boost immunity, improve digestion, and enhance mental clarity—making it a delicious part of your wellness routine.
                </p>
              </div>
              <div className="col-sm-4">
                <img className="img-fluid bg-white w-100" src={aboutImg6} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
