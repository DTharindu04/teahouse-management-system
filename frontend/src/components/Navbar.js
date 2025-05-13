import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import logo from '../assets/img/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Get current path

  // Check the scroll position and toggle navbar visibility
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to check if a route is active
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className={`container-fluid bg-white sticky-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-2 py-lg-0">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Logo" className="img-fluid" />
          </Link>
          <button
            type="button"
            className="navbar-toggler ms-auto me-0"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto">
              <Link to="/" className={`nav-item nav-link ${isActive('/')}`}>Home</Link>
              <Link to="/about" className={`nav-item nav-link ${isActive('/about')}`}>About</Link>
              <Link to="/products" className={`nav-item nav-link ${isActive('/products')}`}>Products</Link>
              <Link to="/store" className={`nav-item nav-link ${isActive('/store')}`}>Store</Link>

              <div className="nav-item dropdown">
                <a href="#" className={`nav-link dropdown-toggle ${(location.pathname.startsWith('/feature') || location.pathname.startsWith('/orders') || location.pathname.startsWith('/article') || location.pathname.startsWith('/testimonial') || location.pathname.startsWith('/404')) ? 'active' : ''}`} data-bs-toggle="dropdown">
                  Pages
                </a>
                <div className="dropdown-menu bg-light rounded-0 m-0">
                <Link to="/feature" className={`dropdown-item ${isActive('/feature')}`}>Features</Link>
                  <Link to="/orders" className={`dropdown-item ${isActive('/orders')}`}>Orders</Link>
                  <Link to="/suppliers" className={`dropdown-item ${isActive('/suppliers')}`}>Suppliers</Link>
                  <Link to="/article" className={`dropdown-item ${isActive('/article')}`}>Blog Article</Link>
                  <Link to="/testimonial" className={`dropdown-item ${isActive('/testimonial')}`}>Testimonial</Link>
                 
                </div>
              </div>

              <Link to="/contact" className={`nav-item nav-link ${isActive('/contact')}`}>Contact</Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
