// UpdateOrder.js
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import "../../assets/css/OrderManagment/NewOrder.css";
import SubmitConfirmModal from '../../components/popup/SubmitConfirmModal.js';
import SuccessMessage from '../../components/popup/SuccessMessage.js';


const UpdateOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [customerInfo, setCustomerInfo] = useState({
    companyName: "",
    companyWebsite: "",
    contactPerson: "",
    phone: "",
    email: "",
  });

  const [products, setProducts] = useState([
    { type: "", grade: "", packaging: "", size: "", quantity: "", unitPrice: 0 },
  ]);

  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: "",
    currency: "",
    terms: "",
    referenceId: "",
    requestInvoice: false,
    billingAddress: "",
  });

  const [deliveryInfo, setDeliveryInfo] = useState({
    deliveryMethod: "",
    preferredDate: "",
    destinationPort: "",
    deliveryAddress: "",
    instructions: "",
  });

  const [errors, setErrors] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [scrollToError, setScrollToError] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
        try {
          const res = await fetch(`http://localhost:5000/teaorder/${orderId}`);
          const data = await res.json();
          console.log("Fetched order data:", data); // 🔍 LOG RESPONSE HERE
      
          if (res.ok && data) {
            setCustomerInfo(data.teaOrder.customerInfo || {});

            setProducts(data.teaOrder.products && data.teaOrder.products.length > 0 ? data.teaOrder.products : [{ type: "", grade: "", packaging: "", size: "", quantity: "", unitPrice: 0 }]);
            setPaymentInfo(data.teaOrder.paymentInfo || {});
            setDeliveryInfo({
                deliveryMethod: data.teaOrder.deliveryInfo?.deliveryMethod || "",
                preferredDate: data.teaOrder.deliveryInfo?.preferredDate
                  ? new Date(data.teaOrder.deliveryInfo.preferredDate).toISOString().split("T")[0]
                  : "",
                destinationPort: data.teaOrder.deliveryInfo?.destinationPort || "",
                deliveryAddress: data.teaOrder.deliveryInfo?.deliveryAddress || "",
                instructions: data.teaOrder.deliveryInfo?.instructions || "",
              });
              
          } else {
            alert("Failed to fetch order details.");
          }
        } catch (err) {
          console.error("Error fetching order:", err);
          alert("Error fetching order.");
        }
      };
    fetchOrder();
  }, [orderId]);

  const getUnitPrice = (type, grade) => {
    const prices = {
      "Green Tea": { BOP: 500, BOPF: 520, Dust: 490 },
      "Black Tea": { BOP: 400, BOPF: 420, Dust: 390 },
      "White Tea": { BOP: 800, BOPF: 820, Dust: 780 },
    };
    return prices[type]?.[grade] || 0;
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = field === "quantity" ? Number(value) : value;

    const { type, grade, size } = updated[index];
    if (type && grade && size) {
      const sizeInKg = parseFloat(size.replace("kg", ""));
      updated[index].unitPrice = getUnitPrice(type, grade) * sizeInKg;
    }

    setProducts(updated);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (value && newErrors[`product_${field}_${index}`]) {
        delete newErrors[`product_${field}_${index}`];
      }
      return newErrors;
    });
  };

  const handleCustomerChange = (field, value) => {
    setCustomerInfo({ ...customerInfo, [field]: value });
    if (value.trim()) setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const handlePaymentChange = (field, value) => {
    const newValue = field === "requestInvoice" ? value.target.checked : value;

    if (field === "currency") {
      setPaymentInfo({ ...paymentInfo, [field]: newValue });
      const conversionRate = newValue === "USD" ? 1 / 350 : 350;
      setProducts(products.map(product => ({
        ...product,
        unitPrice: Number((newValue === "USD" ? product.unitPrice / 350 : product.unitPrice * 350).toFixed(2)),
      })));
    } else {
      setPaymentInfo({ ...paymentInfo, [field]: newValue });
    }

    if (newValue) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleDeliveryChange = (field, value) => {
    setDeliveryInfo({ ...deliveryInfo, [field]: value });
    if (value.trim()) setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    // Validate Company Name
    if (!customerInfo.companyName.trim()) {
        newErrors.companyName = "Company Name is required.";
      } else if (!/^[a-zA-Z0-9\s\-.,&]+$/.test(customerInfo.companyName)) {
        newErrors.companyName = "Company Name contains invalid characters.";
      }
  
      // Validate Company Website (optional but must be valid format if entered)
      if (customerInfo.companyWebsite.trim() && !/^(https?:\/\/)?([\w]+\.)+[\w]{2,}(\/\S*)?$/.test(customerInfo.companyWebsite)) {
        newErrors.companyWebsite = "Enter a valid Company Website (e.g., example.com)";
      }
  
      // Validate Contact Person Name (no numbers allowed)
      if (!customerInfo.contactPerson.trim()) {
        newErrors.contactPerson = "Contact Person Name is required.";
      } else if (!/^[A-Za-z\s]+$/.test(customerInfo.contactPerson)) {
        newErrors.contactPerson = "Contact Person Name must contain only letters.";
      }
  
      // Validate Contact Number (10 digits only, no characters)
      if (!customerInfo.phone.trim()) {
        newErrors.phone = "Contact Number is required.";
      } else if (!/^\d{10}$/.test(customerInfo.phone)) {
        newErrors.phone = "Enter a valid 10-digit Contact Number (numbers only).";
      }
  
      // Validate Email Address (must include '@' and domain)
      if (!customerInfo.email.trim()) {
        newErrors.email = "Email Address is required.";
      } else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(customerInfo.email)) {
        newErrors.email = "Enter a valid Email Address (e.g., example@domain.com)";
      }
  
      // Product validation
      products.forEach((product, idx) => {
        if (!product.type) newErrors[`product_type_${idx}`] = "Select tea type";
        if (!product.grade) newErrors[`product_grade_${idx}`] = "Select tea grade";
        if (!product.packaging) newErrors[`product_packaging_${idx}`] = "Select packaging";
        if (!product.size) newErrors[`product_size_${idx}`] = "Select package size";
        if (!product.quantity || product.quantity <= 0) newErrors[`product_quantity_${idx}`] = "Quantity is required";
      });
  
      // Payment validation
      if (!paymentInfo.paymentMethod) newErrors.paymentMethod = "Select payment method";
      if (!paymentInfo.currency) newErrors.currency = "Select currency";
      if (!paymentInfo.terms) newErrors.terms = "Select payment terms";
      if (!paymentInfo.billingAddress) newErrors.billingAddress = "Billing Address is required";
  
      // Delivery validation
      if (!deliveryInfo.deliveryMethod) newErrors.deliveryMethod = "Select delivery method";
      if (!deliveryInfo.preferredDate) newErrors.preferredDate = "Select delivery preferred date";
      if (!deliveryInfo.deliveryAddress) newErrors.deliveryAddress = "Delivery Address is required";
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (!valid) {
      setScrollToError(true);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/teaorder/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerInfo, products, paymentInfo, deliveryInfo }),
      });

      const result = await res.json();
      if (res.ok) {
        setShowSuccess(true);
      } else {
        alert("Update failed: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error during update.");
    }
  };

  useEffect(() => {
    if (scrollToError && Object.keys(errors).length > 0) {
      const firstError = document.querySelector(".error-message");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      setScrollToError(false);
    }
  }, [errors, scrollToError]);

  const renderError = (field) =>
    errors[field] && <div className="error-message">{errors[field]}</div>;

   useEffect(() => {
      const footer = document.querySelector('.footer');
      if (footer) footer.classList.remove('mt-5');
      return () => {
        if (footer) footer.classList.add('mt-5');
      };
    }, []);

  return (
    <div className="container1-xxl py-5">
      <div className="container mb-5">
        <div ref={formRef} className="section-title text-center mx-auto wow fadeInUp" style={{ maxWidth: "500px" }}>
          <p className="fs-5 fw-medium fst-italic text-primary">Update Order</p>
          <h1 className="display-6">Modify your tea order details</h1>
        </div>
        <form onSubmit={handleSubmit} className="form-container">
        <h2 className="wow fadeInUp" data-wow-delay="0.1s">Customer Information</h2>
            <div className="grid-2">
              <div className="form-group">
                <input
                  className="wow fadeInUp"
                  data-wow-delay="0.1s"
                  placeholder="Company Name"
                  value={customerInfo.companyName}
                  onChange={(e) => handleCustomerChange("companyName", e.target.value)}
                />
                {renderError("companyName")}
              </div>

              <div className="form-group">
                <input
                  className="wow fadeInUp"
                  data-wow-delay="0.2s"
                  placeholder="Company Website (if available)*"
                  value={customerInfo.companyWebsite}
                  onChange={(e) => handleCustomerChange("companyWebsite", e.target.value)}
                />
                {renderError("companyWebsite")}
              </div>

              <div className="form-group">
                <input
                  className="wow fadeInUp"
                  data-wow-delay="0.3s"
                  placeholder="Contact Person Name"
                  value={customerInfo.contactPerson}
                  onChange={(e) => handleCustomerChange("contactPerson", e.target.value)}
                />
                {renderError("contactPerson")}
              </div>

              <div className="form-group">
                <input
                  className="wow fadeInUp"
                  data-wow-delay="0.4s"
                  type="tel"
                  placeholder="Contact Number"
                  value={customerInfo.phone}
                  onChange={(e) => handleCustomerChange("phone", e.target.value)}
                />
                {renderError("phone")}
              </div>

              <div className="form-group full-width">
                <textarea
                  className="wow fadeInUp"
                  data-wow-delay="0.5s"
                  placeholder="Email Address"
                  value={customerInfo.email}
                  onChange={(e) => handleCustomerChange("email", e.target.value)}
                />
                {renderError("email")}
              </div>
            </div>


            <h2 className="wow fadeInUp" data-wow-delay="0.1s">Tea Order Information</h2>
            {products.map((product, index) => (
              <div key={index} className="grid-2 wow fadeInUp" data-wow-delay={`${0.1 + index * 0.1}s`}>

                {/* Tea Type */}
                <div className="form-group">
                  <select
                    className="custom-select wow fadeInUp"
                    data-wow-delay="0.1s"
                    value={product.type}
                    onChange={(e) => handleProductChange(index, "type", e.target.value)}
                  >
                    <option value="">Select Tea Type</option>
                    <option value="Black Tea">Black Tea</option>
                    <option value="Green Tea">Green Tea</option>
                    <option value="White Tea">White Tea</option>
                  </select>
                  {renderError(`product_type_${index}`)}
                </div>

                {/* Tea Grade */}
                <div className="form-group">
                  <select
                    className="custom-select wow fadeInUp"
                    data-wow-delay="0.2s"
                    value={product.grade}
                    onChange={(e) => handleProductChange(index, "grade", e.target.value)}
                  >
                    <option value="">Select Tea Grade</option>
                    <option value="BOP">BOP</option>
                    <option value="BOPF">BOPF</option>
                    <option value="Dust">Dust</option>
                  </select>
                  {renderError(`product_grade_${index}`)}
                </div>

                {/* Packaging */}
                <div className="form-group">
                  <select
                    className="custom-select wow fadeInUp"
                    data-wow-delay="0.3s"
                    value={product.packaging}
                    onChange={(e) => handleProductChange(index, "packaging", e.target.value)}
                  >
                    <option value="">Packaging Type</option>
                    <option value="Bulk">Bulk</option>
                    <option value="Bagged">Bagged</option>
                    <option value="Loose">Loose</option>
                    <option value="Boxed">Boxed</option>
                  </select>
                  {renderError(`product_packaging_${index}`)}
                </div>

                {/* Package Size */}
                <div className="form-group">
                  <select
                    className="custom-select wow fadeInUp"
                    data-wow-delay="0.4s"
                    value={product.size}
                    onChange={(e) => handleProductChange(index, "size", e.target.value)}
                  >
                    <option value="">Select Package Size</option>
                    <option value="1kg">1kg</option>
                    <option value="5kg">5kg</option>
                    <option value="10kg">10kg</option>
                    <option value="25kg">25kg</option>
                    <option value="50kg">50kg</option>
                    <option value="100kg">100kg</option>
                  </select>
                  {renderError(`product_size_${index}`)}
                </div>


                {/* Quantity */}
                <div className="form-group">
                  <input
                    className="wow fadeInUp"
                    data-wow-delay="0.5s"
                    type="number"
                    min="0"
                    placeholder="Quantity"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                  />
                  {renderError(`product_quantity_${index}`)}
                </div>

                {/* Unit Price */}
                <div className="form-group">
                  <input
                    className="wow fadeInUp"
                    data-wow-delay="0.6s"
                    type="text"
                    placeholder="Unit Price"
                    value={`${paymentInfo.currency === "USD" ? "USD" : "LKR"} ${Number(product.unitPrice || 0).toLocaleString('en-LK', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                    readOnly
                  />
                </div>

                {/* Total */}

                <div className="readonly-field wow fadeInUp" data-wow-delay="0.7s">
                  {paymentInfo.currency === "USD" ? "USD" : "LKR"}{" "}
                  {(product.quantity * product.unitPrice).toLocaleString('en-LK', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            ))}
            <div style={{ marginTop: "5rem" }}>
              <h2 className="wow fadeInUp" data-wow-delay="0.1s">Shipping & Delivery Information</h2>
              <div className="grid-2">

                {/* Delivery Method */}
                <div className="form-group">
                  <select
                    className="custom-select wow fadeInUp"
                    data-wow-delay="0.1s"
                    value={deliveryInfo.deliveryMethod}
                    onChange={(e) => handleDeliveryChange("deliveryMethod", e.target.value)}
                  >
                    <option value="">Select Delivery Method</option>
                    <option value="courier">Courier</option>
                    <option value="freight">Freight</option>
                    <option value="pickup">Pickup</option>
                  </select>
                  {renderError("deliveryMethod")}
                </div>

                {/* Port of Destination */}
                <div className="form-group">
                  <input
                    className="wow fadeInUp"
                    data-wow-delay="0.2s"
                    type="text"
                    placeholder="Port of Destination (for export)*"
                    value={deliveryInfo.destinationPort}
                    onChange={(e) => handleDeliveryChange("destinationPort", e.target.value)}
                  />
                </div>

                {/* Preferred Delivery Date */}
                <div className="form-group">
                  <div className="input-group wow fadeInUp" data-wow-delay="0.3s">
                    <label htmlFor="preferredDate" className="input-label">Preferred Delivery Date</label>
                    <input
                      id="preferredDate"
                      type="date"
                      className="input-field"
                      value={deliveryInfo.preferredDate}
                      onChange={(e) => handleDeliveryChange("preferredDate", e.target.value)}
                    />
                  </div>
                  {renderError("preferredDate")}
                </div>

                <div className="form-group full-width">
                  <textarea
                    className="full-width wow fadeInUp"
                    data-wow-delay="0.4s"
                    placeholder="Delivery Address"
                    value={deliveryInfo.deliveryAddress}
                    onChange={(e) => handleDeliveryChange("deliveryAddress", e.target.value)}
                  />
                  {renderError("deliveryAddress")}
                </div>

                {/* Special Instructions */}
                <textarea
                  className="full-width wow fadeInUp"
                  data-wow-delay="0.5s"
                  placeholder="Special Instructions*"
                  value={deliveryInfo.instructions}
                  onChange={(e) => handleDeliveryChange("instructions", e.target.value)}
                />
              </div>
            </div>

            <h2 className="wow fadeInUp" data-wow-delay="0.1s">Payment Information</h2>
            <div className="grid-2">

              {/* Payment Method */}
              <div className="form-group">
                <select
                  className="custom-select wow fadeInUp"
                  data-wow-delay="0.1s"
                  value={paymentInfo.paymentMethod}
                  onChange={(e) => handlePaymentChange("paymentMethod", e.target.value)}
                >
                  <option value="">Select Payment Method</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="card">Credit Card</option>
                  <option value="cod">Cash on Delivery</option>
                  <option value="lc">Letter of Credit (LC)</option>
                </select>
                {renderError("paymentMethod")}
              </div>

              {/* Currency */}


              <div className="form-group">
                <select
                  className="custom-select wow fadeInUp"
                  data-wow-delay="0.2s"
                  value={paymentInfo.currency}
                  onChange={(e) => handlePaymentChange("currency", e.target.value)}
                >
                  <option value="">Select Currency</option>
                  <option value="LKR">LKR</option>
                  <option value="USD">USD</option>
                </select>
                {renderError("currency")}
              </div>

              {/* Payment Terms */}
              <div className="form-group">
                <select
                  className="custom-select wow fadeInUp"
                  data-wow-delay="0.3s"
                  value={paymentInfo.terms}
                  onChange={(e) => handlePaymentChange("terms", e.target.value)}
                >
                  <option value="">Select Payment Terms</option>
                  <option value="100">100% Advance</option>
                  <option value="50-50">50% Advance / 50% on Delivery</option>
                  <option value="net30">Net 30</option>
                  <option value="net60">Net 60</option>
                </select>
                {renderError("terms")}
              </div>

              {/* Reference ID */}
              <div className="form-group">
                <input
                  className="wow fadeInUp"
                  data-wow-delay="0.4s"
                  type="text"
                  placeholder="Transaction / Reference ID"
                  value={paymentInfo.referenceId}
                  onChange={(e) => handlePaymentChange("referenceId", e.target.value)}
                />
                {renderError("referenceId")}
              </div>

              {/* Billing Address */}
              <div className="form-group full-width">
                <textarea
                  className="full-width wow fadeInUp"
                  data-wow-delay="0.5s"
                  placeholder="Billing Address"
                  value={paymentInfo.billingAddress}
                  onChange={(e) => handlePaymentChange("billingAddress", e.target.value)}
                />
                {renderError("billingAddress")}
              </div>
              <div></div>
              {/* Request Invoice */}
              <div className="form-group full-width wow fadeInUp" data-wow-delay="0.6s">
                <label className="checkbox-label">
                  <span>Request a formal invoice</span>
                  <input
                    type="checkbox"
                    checked={paymentInfo.requestInvoice}
                    onChange={(e) => handlePaymentChange("requestInvoice", e)}
                  />
                </label>
              </div>
            </div>
          

          <div className="action-buttons wow fadeInUp d-flex" data-wow-delay="0.7s">
          <Link to={`/orders`}> <button
                type="button"
                className="secondary rounded-pill py-3 px-5"
                
              >
                Return Back
              </button></Link>
            <button  type="button"
                className="btn btn-primary rounded-pill py-3 px-5"
                onClick={() => {
                  const isValid = validateForm();
                  if (isValid) {
                    setShowSubmitModal(true);
                  } else {
                    setScrollToError(true);
                  }
                }}
              >
              Update Order
            </button>
          </div>
        </form>
      </div>

      <SubmitConfirmModal
        show={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={(e) => {
          handleSubmit(e);               // submit logic
          setShowSubmitModal(false);     // close modal
          setShowSuccess(true);          // show success popup
        }}
        message="Do you want to update this tea order?"
      />

      <SuccessMessage
        show={showSuccess}
        message="Order updated successfully!"
      />
    </div>
  );
};

export default UpdateOrder;
