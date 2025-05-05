import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { IconSearch, IconEdit, IconTrash } from '@tabler/icons-react';
import MainCard from '../../ui-component/cards/MainCard';

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/teaorder');
        const fetchedOrders = res.data.teaOrders;

        const transformedOrders = fetchedOrders.map((order) => {
          const firstProduct = order.products[0];
          const totalAmount = order.products.reduce(
            (sum, item) => sum + item.unitPrice * item.quantity,
            0
          );

          return {
            id: order._id,
            companyName: order.customerInfo?.companyName || '',
            contactPerson: order.customerInfo?.contactPerson || '',
            email: order.customerInfo?.email || '',
            createdAt: new Date(order.createdAt).toLocaleDateString(),
            status: order.status || 'Pending',
            paymentMethod: order.paymentInfo?.paymentMethod || 'N/A',
            totalAmount: totalAmount.toFixed(2),
            teaType: firstProduct?.teaType || '',
            teaGrade: firstProduct?.grade || '',
            quantity: firstProduct?.quantity || 0,
            unitPrice: firstProduct?.unitPrice || 0
          };
        });

        setOrders(transformedOrders);
      } catch (error) {
        console.error("Error fetching tea orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Processing':
        return 'info';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainCard title="Tea Orders Dashboard">
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by Contact Person or Company"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Contact Person</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id.slice(-6).toUpperCase()}</TableCell>
                      <TableCell>{order.companyName}</TableCell>
                      <TableCell>{order.contactPerson}</TableCell>
                      <TableCell>{order.email}</TableCell>
                      <TableCell>{order.createdAt}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={getStatusColor(order.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">${order.totalAmount}</TableCell>
                      <TableCell>{order.paymentMethod}</TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" size="small">
                          <IconEdit size="20px" />
                        </IconButton>
                        <IconButton color="error" size="small">
                          <IconTrash size="20px" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </MainCard>
  );
}
