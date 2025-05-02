import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../../assets/css/OrderManagment/Orders.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ConfirmModal from '../../components/popup/DeleteConfirmModal.js';

const OrderTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const [animateKey, setAnimateKey] = useState(0);
  const tableRef = useRef(null);
  const [triggerScrollOnPageChange, setTriggerScrollOnPageChange] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [orders, setOrders] = useState([]);



  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/teaorder');
        const fetchedOrders = res.data.teaOrders;

        const transformedOrders = fetchedOrders.map((order) => {
          const product = order.products[0];
          return {
            _id: order._id, // Store original MongoDB ID
            id: order._id.slice(-6).toUpperCase(), // UI display
            orderDate: new Date(order.createdAt).toISOString().split('T')[0],
            teaType: product?.type || "-",
            teaGrade: product?.grade || "-",
            packageSize: product?.size || "-",
            quantity: product?.quantity || 0,
            totalPrice: `${order.paymentInfo.currency} ${(product?.quantity * product?.unitPrice).toLocaleString('en-LK', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
            preferredDeliveryDate: order.deliveryInfo?.preferredDate?.split('T')[0] || "-",
            status: "Pending", // Placeholder
          };
        });

        setOrders(transformedOrders);
        setFilteredData(transformedOrders);
      } catch (error) {
        console.error("Error fetching tea orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteClick = (_id) => {
    setOrderToDelete(_id); // set the actual MongoDB ID
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/teaorder/${orderToDelete}`);
      const updatedOrders = orders.filter(order => order._id !== orderToDelete);
      setOrders(updatedOrders);
      setFilteredData(updatedOrders);
    } catch (error) {
      console.error("Failed to delete order:", error);
    } finally {
      setShowConfirm(false);
      setOrderToDelete(null);
    }
  };

  const closeModal = () => {
    setShowConfirm(false);
    setOrderToDelete(null);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    const footer = document.querySelector('.footer');
    if (footer) footer.classList.remove('mt-5');
    return () => {
      if (footer) footer.classList.add('mt-5');
    };
  }, []);

  useEffect(() => {
    const result = orders.filter(order => {
      const matchesSearch = Object.values(order).some(val =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus = statusFilter === 'All' || order.status.trim() === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredData(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, orders]);

  useEffect(() => {
    if (triggerScrollOnPageChange && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTriggerScrollOnPageChange(false);
    }
  }, [currentPage, animateKey]);

  const handlePageChange = (pageNumber) => {
    setTriggerScrollOnPageChange(true);
    setAnimateKey(prev => prev + 1);
    setCurrentPage(pageNumber);
  };


  return (
    <div className="table-container py-5">
      <div className="section-title text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px" }}>
        <p className="fs-5 fw-medium fst-italic text-primary">Order List</p>
        <h1 className="display-6" ref={tableRef}>Every order tells a story. Here’s yours!</h1>
      </div>

      <div className="order-controls wow fadeInUp" data-wow-delay="0.2s">
        <input
          type="text"
          placeholder="Filter tea orders"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="custom-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <Link to="/neworder">
          <button>+ New Order</button>
        </Link>
      </div>

      <div className="table-wrapper mb-5 wow fadeInUp" data-wow-delay="0.3s" style={{ overflow: "hidden" }}>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Tea Type</th>
              <th>Tea Grade</th>
              <th>Package Size</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Delivery Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <AnimatePresence mode="wait">
            <motion.tbody
              key={animateKey}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {},
                exit: {}
              }}
            >
              {paginatedData.length > 0 ? (
                paginatedData.map((order, index) => (
                  <motion.tr
                    key={order._id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -20 }
                    }}
                  >
                    <td>{order.id}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.teaType}</td>
                    <td>{order.teaGrade}</td>
                    <td>{order.packageSize}</td>
                    <td>{order.quantity}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.preferredDeliveryDate}</td>
                    <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                    <td className="actions">
                    <Link to={`/orders/vieworder/${order._id}`}><button className="action-btn view" title="View">
                        <i className="bx bx-show"></i>
                      </button></Link>
                    

                      <button className="action-btn download" title="Download"><i className="bx bx-download"></i></button>
                      <Link to={`/orders/${order._id}`}> <button className="action-btn edit" title="Edit"><i className="bx bx-edit"></i></button></Link>
                      <button className="action-btn delete" title="Delete" onClick={() => handleDeleteClick(order._id)}><i className="bx bx-trash"></i></button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -20 }
                  }}
                >
                  <td colSpan="10" className="text-center">No matching orders found.</td>
                </motion.tr>
              )}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>

      <div className="pagination wow fadeInUp" data-wow-delay="0.4s">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <ConfirmModal
        show={showConfirm}
        onClose={closeModal}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this order?"
      />
    </div>
  );
};

export default OrderTable;
