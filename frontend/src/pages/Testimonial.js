import React, { useEffect } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/style.css'; // Your custom CSS (with testimonial styles)

import testimonialImg1 from '../assets/img/testimonial-1.jpg';
import testimonialImg2 from '../assets/img/testimonial-2.jpg';
import testimonialImg3 from '../assets/img/testimonial-3.jpg';



const Testimonial = () => {

  useEffect(() => {
      // Remove margin-top from footer only on this page
      const footer = document.querySelector('.footer');
      if (footer) {
        footer.classList.remove('mt-5');
      }
  
      // Reset margin when leaving this page
      return () => {
        if (footer) {
          footer.classList.add('mt-5');
        }
      };
    }, []);

  const settings = {
    centerMode: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    className: "testimonial-carousel"
  
  };

  return (
    <div className="testimonial ">
      <div className="container py-5  ">
        <div
          className="section-title text-center mx-auto  wow fadeInUp" data-wow-delay="0.1s"
          style={{ maxWidth: '500px' }}
        >
          <p className="fs-5 fw-medium fst-italic text-primary">Testimonial</p>
          <h1 className="display-6">What our clients say about our tea</h1>
        </div>

        <div className="mb-5 wow fadeInUp" data-wow-delay="0.5s"><Slider {...settings} >
          <div className="testimonial-item p-4 p-lg-5 ">
            <p className="mb-4">
            I absolutely love their green tea! The aroma is so fresh and calming. It has become a part of my daily routine.
            </p>
            <div className="d-flex align-items-center justify-content-center">
              <img src={testimonialImg1} alt="Client" />
              <div className="text-start ms-3">
                <h5>Tharushi Fernando</h5>
                <span className="text-primary">Entrepreneur</span>
              </div>
            </div>
          </div>

          <div className="testimonial-item p-4 p-lg-5">
            <p className="mb-4">
            Their tea blends are rich and flavorful. I ordered a gift box for my family, and they were thrilled with the quality!
            </p>
            <div className="d-flex align-items-center justify-content-center">
              <img src={testimonialImg2} alt="Client" />
              <div className="text-start ms-3">
                <h5>Roshan Silva</h5>
                <span className="text-primary">Marketing Executive</span>
              </div>
            </div>
          </div>

          <div className="testimonial-item p-4 p-lg-5">
            <p className="mb-4">
            I absolutely love their green tea! The aroma is so fresh and calming. It has become a part of my daily routine.
            </p>
            <div className="d-flex align-items-center justify-content-center">
              <img src={testimonialImg3} alt="Client" />
              <div className="text-start ms-3">
                <h5>Rashmi Munasingha</h5>
                <span className="text-primary">Entrepreneur</span>
              </div>
            </div>
          </div>
        </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
