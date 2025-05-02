import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';



import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Copyright from './components/Copyright';
import Header from './components/Header';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Store from './pages/Store';
import Acticle from './pages/Article';
import Testimonial from './pages/Testimonial';
import Contact from './pages/Contact';
import Orders from './pages/OrderManagement/Orders';
import NewOrder from './pages/OrderManagement/NewOrder';
import UpdateOrder from './pages/OrderManagement/UpdateOrder';
import ViewOrder from './pages/OrderManagement/ViewOrder';



const headerTitles = {
  '/about': 'About Us',
  '/products': 'Products',
  '/store': 'Tea Store',
  '/article': 'Article',
  '/testimonial': 'Testimonial',
  '/contact': 'Contact Us',
  '/orders': 'Order List',
  '/neworder': 'Order Us',
  
};


const AppLayout = ({ loading, setLoading }) => {
  const location = useLocation();
  let title = headerTitles[location.pathname];

// Handle dynamic route for ViewOrder (me tika wenas kare)
if (!title && location.pathname.startsWith('/orders/vieworder/')) {
  title = 'Order Overview';
}

// Handle dynamic route for UpdateOrder
if (!title && location.pathname.startsWith('/orders/') && location.pathname.split('/').length === 3 && !location.pathname.includes('vieworder')) {
  title = 'Update Order';
}

  useEffect(() => {
    // Trigger loading spinner on route change
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 300); // Simulate load time
    return () => clearTimeout(timeout);
  }, [location.pathname, setLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  

  return (
    <>
      <Spinner loading={loading} />
      <Navbar />
      {title && <Header key={location.pathname} title={title} />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/store" element={<Store />} />
        <Route path="/article" element={<Acticle />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/neworder" element={<NewOrder />} />
        <Route path="/orders/:orderId" element={<UpdateOrder />} />
        <Route path="/orders/vieworder/:id" element={<ViewOrder />} />


      </Routes>

      <Footer />
      <Copyright />
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load spinner
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Start animations after the spinner ends
      
        // WOW.js animation init
        new window.WOW().init();
       // Small delay to ensure everything is set
    }, 300); // Spinner duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AppLayout loading={loading} setLoading={setLoading} />
      
    </Router>
  );
}

export default App;
