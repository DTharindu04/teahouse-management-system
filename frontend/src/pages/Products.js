import React, { useEffect } from 'react';
import Slider from 'react-slick';

import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ProductImg1 from '../assets/img/product-1.jpg';
import ProductImg2 from '../assets/img/product-2.jpg';
import ProductImg3 from '../assets/img/product-3.jpg';
import ProductImg4 from '../assets/img/product-4.jpg';

// Custom arrow components using Bootstrap carousel control icons
const CustomPrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev " onClick={onClick}>
    <span className="bi-left bi-chevron-left fs-4"></span>
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next" onClick={onClick}>
    <span className="bi-right bi-chevron-right fs-4"></span>
  </div>
);

const Products = () => {
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
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } }
    ]
  };

  const products = [
    {
      img: ProductImg1,
      title: 'Green Tea',
      description: 'Rich in antioxidants, green tea supports metabolism and boosts overall wellness.'
    },
    {
      img: ProductImg2,
      title: 'Black Tea',
      description: 'A bold flavor packed with energy-boosting properties and heart health benefits.'
    },
    {
      img: ProductImg3,
      title: 'Spiced Tea',
      description: 'A flavorful fusion of aromatic spices that awakens your senses and soothes digestion.'
    },
    {
      img: ProductImg4,
      title: 'Organic Tea',
      description: 'Pure and natural, grown without chemicals — perfect for a mindful lifestyle.'
    }
  ];

  return (
    <div className="container-fluid product  ">
      <div className=" pb-5">
      <div className="container py-5 mb-5 ">
        <div
          className="section-title text-center mx-auto wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: '500px' }}
        >
          <p className="fs-5 fw-medium fst-italic text-primary">Our Products</p>
          <h1 className="display-6">Tea has a complex positive effect on the body</h1>
        </div>

        <div className="wow fadeInUp product-carousel " data-wow-delay="0.5s">
          <Slider {...settings}>
            {products.map((product, index) => (
              <div key={index} className="px-2">
                <a href="#" className="d-block product-item rounded overflow-hidden">
                  <img src={product.img} alt={product.title} className="img-fluid" />
                  <div className="bg-white shadow-sm text-center p-4 position-relative mt-n5 mx-4">
                    <h4 className="text-primary">{product.title}</h4>
                    <span className="text-body">{product.description}</span>
                  </div>
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div></div>
  );
};

export default Products;
