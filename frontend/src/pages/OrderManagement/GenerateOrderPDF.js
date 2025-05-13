import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const GenerateOrderPDF = (order) => {
  const doc = new jsPDF();

  const customer = order.customerInfo || {};
  const products = order.products || [];
  const delivery = order.deliveryInfo || {};
  const payment = order.paymentInfo || {};
  const status = order.status || '-';

  // Title
  doc.setFontSize(18);
  doc.text('Tea Order Report', 105, 15, { align: 'center' });

  doc.setFontSize(12);
  doc.setTextColor(40);
  let y = 25;

  // Customer Information
  doc.setFont(undefined, 'bold');
  doc.text('Customer Information', 14, y);
  doc.setFont(undefined, 'normal');
  autoTable(doc, {
    startY: y + 5,
    theme: 'striped',
    head: [['Field', 'Value']],
    body: [
      ['Company Name', customer.companyName || '-'],
      ['Company Website', customer.companyWebsite || '-'],
      ['Contact Person Name', customer.contactPerson || '-'],
      ['Contact Number', customer.phone || '-'],
      ['Email Address', customer.email || '-'],
    ],
  });

  // Tea Order Information
  let finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont(undefined, 'bold');
  doc.text('Tea Order Information', 14, finalY);
  doc.setFont(undefined, 'normal');
  autoTable(doc, {
    startY: finalY + 5,
    theme: 'striped',
    head: [['Tea Type', 'Grade', 'Packaging', 'Size', 'Quantity', 'Unit Price', 'Total']],
    body: products.map(p => [
      p.type || '-',
      p.grade || '-',
      p.packaging || '-',
      p.size || '-',
      p.quantity != null ? p.quantity : '-',
      `${payment.currency || ''} ${p.unitPrice != null ? p.unitPrice.toFixed(2) : '0.00'}`,
      `${payment.currency || ''} ${p.quantity != null && p.unitPrice != null ? (p.quantity * p.unitPrice).toFixed(2) : '0.00'}`
    ]),
  });

  // Shipping & Delivery Information
  finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont(undefined, 'bold');
  doc.text('Shipping & Delivery Information', 14, finalY);
  doc.setFont(undefined, 'normal');
  autoTable(doc, {
    startY: finalY + 5,
    theme: 'striped',
    head: [['Field', 'Value']],
    body: [
      ['Delivery Method', delivery.deliveryMethod || '-'],
      ['Preferred Date', delivery.preferredDate ? delivery.preferredDate.split('T')[0] : '-'],
      ['Destination Port', delivery.destinationPort || '-'],
      ['Delivery Address', delivery.deliveryAddress || '-'],
      ['Special Instructions', delivery.instructions || 'None'],
    ],
  });

  // Payment Information
  finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont(undefined, 'bold');
  doc.text('Payment Information', 14, finalY);
  doc.setFont(undefined, 'normal');
  autoTable(doc, {
    startY: finalY + 5,
    theme: 'striped',
    head: [['Field', 'Value']],
    body: [
      ['Payment Method', payment.paymentMethod || '-'],
      ['Currency', payment.currency || '-'],
      ['Payment Terms', payment.terms || '-'],
      ['Reference ID', payment.referenceId || '-'],
      ['Billing Address', payment.billingAddress || '-'],
    ],
  });

  // Order Status
  finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont(undefined, 'bold');
  doc.text('Order Status', 14, finalY);
  doc.setFont(undefined, 'normal');
  autoTable(doc, {
    startY: finalY + 5,
    theme: 'striped',
    head: [['Status']],
    body: [[status]],
  });

  // Save PDF
  const fileName = `TeaOrder_${(order._id || 'XXXXXX').slice(-6).toUpperCase()}.pdf`;
  doc.save(fileName);
};
