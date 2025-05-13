import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Chip,
  CircularProgress,
  Grid
} from '@mui/material';
import {
  IconSearch,
  IconChevronDown,
  IconChevronUp,
  IconCheck,
  IconX,
  IconTrash,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react';
import axios from 'axios';

export default function ModernOrderTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/teaorder');
      const transformed = res.data.teaOrders
        .filter(order => !order.adminDeleted) // <- hide orders deleted by admin
        .map((order) => {
          const product = order.products[0] || {};
          const totalAmount = order.products.reduce(
            (sum, p) => sum + p.unitPrice * p.quantity,
            0
          );
          return {
            id: order._id,
            orderDate: new Date(order.createdAt).toLocaleDateString('en-US'),
            companyName: order.customerInfo?.companyName || '',
            email: order.customerInfo?.email || '',
            phone: order.customerInfo?.phone || '',
            teaType: product?.type || '',
            deliveryDate: order.deliveryInfo?.preferredDate
              ? new Date(order.deliveryInfo.preferredDate).toLocaleDateString('en-US')
              : 'N/A',
            amount: totalAmount.toFixed(2),
            paymentMethod: order.paymentInfo?.paymentMethod || 'N/A',
            status: order.status || 'Pending',
            details: order
          };
        });
      setOrders(transformed);
    } catch (error) {
      console.error('Error fetching tea orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/teaorder/${orderId}/status`, {
        status: newStatus
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = async (orderId, status) => {
    if (status === 'Pending') {
      alert('Admins cannot delete orders with Pending status.');
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${status} order? This action will hide the order from the admin dashboard.`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/teaorder/${orderId}?role=admin`);

      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Failed to delete order:', error);
      alert('An error occurred while trying to delete the order.');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setPage(0);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.companyName.toLowerCase().includes(searchTerm) ||
      order.email.toLowerCase().includes(searchTerm)
  );

  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'success';
      case 'Rejected':
        return 'error';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleNextPage = () => {
    setPage((prev) =>
      Math.min(prev + 1, Math.ceil(filteredOrders.length / rowsPerPage) - 1)
    );
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Card sx={{ p: 2, borderRadius: 0, boxShadow: 'none' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by Company or Email"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 2, fontSize: '0.74rem' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch size={18} />
            </InputAdornment>
          ),
          sx: { fontSize: '0.74rem' }
        }}
        inputProps={{ style: { fontSize: '0.74rem' } }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: 0, boxShadow: 'none' }}>
            <Table sx={{ fontSize: '0.74rem' }}>
              <TableHead>
                <TableRow>
                  {[
                    'Order ID',
                    'Order Date',
                    'Company',
                    'Phone',
                    'Tea Type',
                    'Delivery Date',
                    'Amount',
                    'Status',
                    'Actions'
                  ].map((label, idx) => (
                    <TableCell
                      key={idx}
                      sx={{
                        fontSize: '0.74rem',
                        color: '#673ab7 !important',
                        textAlign: label === 'Amount' ? 'right' : 'left'
                      }}
                    >
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                <Box component="tbody" display="contents">
                  {paginatedOrders.map((order) => (
                    <React.Fragment key={order.id}>
                      <TableRow hover>
                        <TableCell sx={{ fontSize: '0.85rem' }}>
                          {order.id.slice(-6).toUpperCase()}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.85rem' }}>
                          {order.orderDate}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.85rem' }}>
                          {order.companyName}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.85rem' }}>
                          {order.phone}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.85rem' }}>
                          {order.teaType}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.85rem' }}>
                          {order.deliveryDate}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: '0.85rem' }}>
                          {order.amount}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.85rem' }}>
                          <Chip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              setExpandedOrderId(
                                order.id === expandedOrderId ? null : order.id
                              )
                            }
                          >
                            {order.id === expandedOrderId ? (
                              <IconChevronUp size={18} />
                            ) : (
                              <IconChevronDown size={18} />
                            )}
                          </IconButton>
                          <IconButton
                            color="success"
                            onClick={() =>
                              handleStatusUpdate(order.id, 'Accepted')
                            }
                            disabled={order.status !== 'Pending'}
                          >
                            <IconCheck size={16} />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() =>
                              handleStatusUpdate(order.id, 'Rejected')
                            }
                            disabled={order.status !== 'Pending'}
                          >
                            <IconX size={16} />
                          </IconButton>
                          <IconButton
                            color="default"
                            onClick={() => handleDelete(order.id, order.status)}
                            disabled={order.status === 'Pending'}
                          >
                            <IconTrash size={16} />
                          </IconButton>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={10} style={{ paddingBottom: 0, paddingTop: 0 }}>
                          <Collapse in={order.id === expandedOrderId} timeout="auto" unmountOnExit>
                            <Box margin={2} sx={{ fontSize: '0.80rem' }}>
                              <Typography variant="subtitle2" sx={{ color: '#4527a0' }}>
                                Customer Information
                              </Typography>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>Company: {order.details.customerInfo?.companyName}</Grid>
                                <Grid item xs={12} sm={6}>Website: {order.details.customerInfo?.companyWebsite}</Grid>
                                <Grid item xs={12} sm={6}>Contact: {order.details.customerInfo?.contactPerson}</Grid>
                                <Grid item xs={12} sm={6}>Phone: {order.details.customerInfo?.phone}</Grid>
                              </Grid>

                              <Typography variant="subtitle2" sx={{ mt: 2, color: '#4527a0' }}>
                                Tea Order Details
                              </Typography>
                              {order.details.products.map((p, i) => (
                                <Box key={i} pl={2}>
                                  {p.type} / {p.grade} / {p.packaging} / {p.size} — {p.quantity} x ${p.unitPrice} = ${(p.quantity * p.unitPrice).toFixed(2)}
                                </Box>
                              ))}

                              <Typography variant="subtitle2" sx={{ mt: 2, color: '#4527a0' }}>
                                Shipping & Delivery
                              </Typography>
                              <Box pl={2}>
                                Method: {order.details.deliveryInfo?.deliveryMethod}<br />
                                Address: {order.details.deliveryInfo?.deliveryAddress}<br />
                                Port: {order.details.deliveryInfo?.destinationPort}<br />
                                Instructions: {order.details.deliveryInfo?.instructions}
                              </Box>

                              <Typography variant="subtitle2" sx={{ mt: 2, color: '#4527a0' }}>
                                Payment Info
                              </Typography>
                              <Box pl={2}>
                                Method: {order.details.paymentInfo?.paymentMethod}<br />
                                Currency: {order.details.paymentInfo?.currency}<br />
                                Terms: {order.details.paymentInfo?.terms}<br />
                                Reference ID: {order.details.paymentInfo?.referenceId}<br />
                                Billing Address: {order.details.paymentInfo?.billingAddress}
                              </Box>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </Box>
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="flex-end" alignItems="center" mt={3} gap={1}>
            <IconButton
              size="small"
              onClick={handlePrevPage}
              disabled={page === 0}
              sx={{ color: '#88B44E' }}
            >
              <IconChevronLeft size={18} />
            </IconButton>
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              Page {page + 1} of {Math.ceil(filteredOrders.length / rowsPerPage)}
            </Typography>
            <IconButton
              size="small"
              onClick={handleNextPage}
              disabled={page >= Math.ceil(filteredOrders.length / rowsPerPage) - 1}
              sx={{ color: '#88B44E' }}
            >
              <IconChevronRight size={18} />
            </IconButton>
          </Box>
        </>
      )}
    </Card>
  );
}
