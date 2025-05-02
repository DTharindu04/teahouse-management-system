import React from 'react';

import Carousel from '../components/Carousel';
import About from '../pages/About';
import Products from '../pages/Products';
import Store from '../pages/Store';
import Article from '../pages/Article';
import Testimonial from '../pages/Testimonial';
import Contact from './Contact';






const Home = () => {
  return (
    <div>
      
      <Carousel />
      <About />
      <Products />
      <Article />
      <Store />
      <Testimonial />
      <Contact hideForm={true} />
      
      

      
    </div>
  );
};

export default Home;
