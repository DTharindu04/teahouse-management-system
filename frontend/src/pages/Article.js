import React from 'react';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';

import articleImg1 from '../assets/img/article.jpg';

const Article = () => {
  return (
    <div class="container-xxl py-5">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
            <img class="img-fluid" src={articleImg1} alt="Tea Article" />
          </div>
          <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <div class="section-title">
              <p class="fs-5 fw-medium fst-italic text-primary">Featured Article</p>
              <h1 class="display-6">The history of tea leaf in the world</h1>
            </div>
            <p class="mb-4">
              Tea has been cherished for centuries, first discovered in ancient China over 5,000 years ago. According to legend, Emperor Shen Nong accidentally brewed the first cup when tea leaves drifted into his boiling water.
            </p>
            <p class="mb-4">
              Since then, tea has spread across continents—from traditional ceremonies in Japan to the British afternoon tea culture. Today, it's not only a beloved beverage but also a symbol of relaxation, hospitality, and wellness around the world.
            </p>
            <a href="" class="btn btn-primary rounded-pill py-3 px-5">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
