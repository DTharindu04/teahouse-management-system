import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';

import "../../assets/css/OrderManagment/ViewOrder.css";

const ViewOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
      const footer = document.querySelector('.footer');
      if (footer) footer.classList.remove('mt-5');
      return () => {
        if (footer) footer.classList.add('mt-5');
      };
    }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:5000/teaorder/${id}`);
        const data = await res.json();
        setOrder(data.teaOrder);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-green-600" />
      </div>
    );
  }

  if (!order) {
    return <div className="text-center text-red-500 mt-10">Order not found.</div>;
  }
  const total = order.products.reduce((sum, product) => {
    return sum + (product?.quantity * product?.unitPrice);
  }, 0);
  
  const totalPrice = `${order.paymentInfo.currency} ${total.toLocaleString('en-LK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
  
  return (
    <div className="vo-background">
    <div className="vo-container py-3">
      <div className="section-title text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px" }}>
        <p className="fs-5 fw-medium fst-italic text-primary">Order Overview</p>
        <h1 className="display-6">A quick look at your order all in one place</h1>
      </div>
  
      <div className="vo-card-grid">
        {/* Customer Info */}
        <div className="vo-card wow fadeInUp" data-wow-delay="0.2s">
          <h2 className="vo-section-title">Customer Information</h2>
          <div className="vo-product-card">
            <div className="vo-form-grid">
              <div className="vo-form-group">
                <label className="vo-label">Company Name</label>
                <input className="vo-input" readOnly value={order.customerInfo.companyName} />
              </div>
              <div className="vo-form-group">
                <label className="vo-label">Company Website</label>
                <input className="vo-input" readOnly value={order.customerInfo.companyWebsite} />
              </div>
              <div className="vo-form-group">
                <label className="vo-label">Contact Person Name</label>
                <input className="vo-input" readOnly value={order.customerInfo.contactPerson} />
              </div>
              <div className="vo-form-group">
                <label className="vo-label">Contact Number</label>
                <input className="vo-input" readOnly value={order.customerInfo.phone} />
              </div>
              <div className="vo-form-group vo-full">
                <label className="vo-label">Email Address</label>
                <input className="vo-input" readOnly value={order.customerInfo.email} />
              </div>
            </div>
          </div>
        </div>
  
        {/* Shipping Info */}
        <div className="vo-card wow fadeInUp" data-wow-delay="0.2s">
          <h2 className="vo-section-title">Shipping & Product Information</h2>
          {order.products.map((product, idx) => (
            <div className="vo-product-card" key={idx}>
              <div className="vo-form-grid">
                <div className="vo-form-group">
                  <label className="vo-label">Tea Type</label>
                  <input className="vo-input" readOnly value={product.type} />
                </div>
                <div className="vo-form-group">
                  <label className="vo-label">Tea Grade</label>
                  <input className="vo-input" readOnly value={product.grade} />
                </div>
                <div className="vo-form-group">
                  <label className="vo-label">Packaging Type</label>
                  <input className="vo-input" readOnly value={product.packaging} />
                </div>
                <div className="vo-form-group">
                  <label className="vo-label">Package Size</label>
                  <input className="vo-input" readOnly value={product.size} />
                </div>
                <div className="vo-form-group">
                  <label className="vo-label">Quantity</label>
                  <input className="vo-input" readOnly value={product.quantity} />
                </div>
                <div className="vo-form-group">
                  <label className="vo-label">Total Price</label>
                  <input className="vo-input" readOnly value={totalPrice} />
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Delivery Info */}
        <div className="vo-card wow fadeInUp" data-wow-delay="0.3s">
          <h2 className="vo-section-title">Delivery Information</h2>
          <div className="vo-product-card">
            <div className="vo-form-grid">
              <div className="vo-form-group">
                <label className="vo-label">Delivery Method</label>
                <input className="vo-input" readOnly value={order.deliveryInfo.deliveryMethod} />
              </div>
              <div className="vo-form-group">
                <label className="vo-label">Port of Destination</label>
                <input className="vo-input" readOnly value={order.deliveryInfo.destinationPort} />
              </div>
              <div className="vo-form-group">
                <label className="vo-label">Preferred Delivery Date</label>
                <input className="vo-input" readOnly value={formatDate(order.deliveryInfo.preferredDate)} />
              </div>
              <div className="vo-form-group vo-full">
                <label className="vo-label">Delivery Address</label>
                <input className="vo-input" readOnly value={order.deliveryInfo.deliveryAddress}></input>
              </div>
              <div className="vo-form-group vo-full">
                <label className="vo-label">Special Instructions</label>
                <textarea className="vo-input" readOnly value={order.deliveryInfo.instructions}></textarea>
              </div>
            </div>
          </div>
        </div>
  
        {/* Payment Info */}
        <div className="vo-card wow fadeInUp" data-wow-delay="0.3s">
          <h2 className="vo-section-title">Payment Information</h2>
          <div className="vo-product-card">
            <div className="vo-form-grid">
              <div className="vo-form-group">
                <label className="vo-label">Payment Method</label>
                <input className="vo-input" readOnly value={order.paymentInfo.paymentMethod} />
              </div>
              <div className="vo-form-group">
                <label className="vo-label">Currency</label>
                <input className="vo-input" readOnly value={order.paymentInfo.currency} />
              </div>
              <div className="vo-form-group">
                <label className="vo-label">Payment Terms</label>
                <input className="vo-input" readOnly value={order.paymentInfo.terms} />
              </div>
              <div className="vo-form-group">
                <label className="vo-label">Reference ID</label>
                <input className="vo-input" readOnly value={order.paymentInfo.referenceId} />
              </div>
              <div className="vo-form-group vo-full">
                <label className="vo-label">Billing Address</label>
                <input className="vo-input" readOnly value={order.paymentInfo.billingAddress}></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="action-buttons wow fadeInUp d-flex mt-5" data-wow-delay="0.4s">
      <Link to={`/orders`}> <button
                type="button"
                className="secondary rounded-pill py-3 px-5"
                
              >
                Return Back
              </button></Link>
    </div>
  </div>
  </div>

  );
};

export default ViewOrder;
