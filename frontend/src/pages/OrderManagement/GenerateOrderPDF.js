import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoImage from '../../assets/img/PDFlogo.png'; 

export const GenerateOrderPDF = (order) => {
  if (!order || typeof order !== 'object') {
    console.error('Invalid order data.');
    return;
  }

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // 1. Add logo (optional: adjust size and position)
  const addLogo = () => {
    const logoWidth = 50; 
    const logoHeight = 18.5; 
    const x = (210 - logoWidth) / 2; 
    const y = 10; 
  
    doc.addImage(logoImage, 'PNG', x, y, logoWidth, logoHeight);
  };
  
  addLogo();
  

  // 2. Title
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text('', pageWidth / 2, 20, { align: 'center' });

  let y = 45;

  const customer = order.customerInfo || {};
  const delivery = order.deliveryInfo || {};
  const payment = order.paymentInfo || {};
  const products = order.products || [];

  const currency = payment.currency || 'LKR';

  // 3. Customer Info
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Customer Information', 14, y);
  doc.setFont(undefined, 'normal');
  autoTable(doc, {
    startY: y + 5,
    theme: 'striped',
    head: [['Field', 'Value']],
    body: [
      ['Company Name', customer.companyName || ''],
      ['Company Website', customer.companyWebsite || ''],
      ['Contact Person Name', customer.contactPerson || ''],
      ['Contact Number', customer.phone || ''],
      ['Email Address', customer.email || ''],
    ],
  });

  // 4. Tea Products
  let finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont(undefined, 'bold');
  doc.text('Tea Order Details', 14, finalY);
  doc.setFont(undefined, 'normal');
  autoTable(doc, {
    startY: finalY + 5,
    theme: 'striped',
    head: [['Tea Type', 'Grade', 'Packaging', 'Size', 'Qty', `Unit Price (${currency})`, `Total (${currency})`]],
    body: products.map((item) => [
      item.type || '',
      item.grade || '',
      item.packaging || '',
      item.size || '',
      item.quantity || 0,
      (item.unitPrice || 0).toFixed(2),
      ((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2),
    ]),
  });

  // 5. Delivery
  finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont(undefined, 'bold');
  doc.text('Shipping & Delivery Information', 14, finalY);
  doc.setFont(undefined, 'normal');
  autoTable(doc, {
    startY: finalY + 5,
    theme: 'striped',
    head: [['Field', 'Value']],
    body: [
      ['Delivery Method', delivery.deliveryMethod || ''],
      ['Preferred Date', delivery.preferredDate ? new Date(delivery.preferredDate).toLocaleDateString() : ''],
      ['Destination Port', delivery.destinationPort || ''],
      ['Delivery Address', delivery.deliveryAddress || ''],
      ['Special Instructions', delivery.instructions || ''],
    ],
  });

  // 6. Payment Info
  finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont(undefined, 'bold');
  doc.text('Payment Information', 14, finalY);
  doc.setFont(undefined, 'normal');
  autoTable(doc, {
    startY: finalY + 5,
    theme: 'striped',
    head: [['Field', 'Value']],
    body: [
      ['Payment Method', payment.paymentMethod || ''],
      ['Currency', payment.currency || ''],
      ['Payment Terms', payment.terms || ''],
      ['Reference ID', payment.referenceId || ''],
      ['Billing Address', payment.billingAddress || ''],
    ],
  });

  // 7. Order Status
  finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont(undefined, 'bold');
  doc.text('Order Status', 14, finalY);
  doc.setFont(undefined, 'normal');
  autoTable(doc, {
    startY: finalY + 5,
    theme: 'striped',
    head: [['Status']],
    body: [[order.status || '']],
  });

  // 8. Footer
  const addFooter = () => {
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      'Thank you for doing business with us! | Tea House Ltd.',
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  };

  addFooter();

  // Save
  const fileName = `TeaOrder_${(order._id || 'XXXXXX').slice(-6).toUpperCase()}.pdf`;
  doc.save(fileName);
};
