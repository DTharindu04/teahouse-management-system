import mongoose from "mongoose";

const TeaOrderSchema = new mongoose.Schema(
  {
    customerInfo: {
      companyName: { type: String, required: true },
      companyWebsite: { type: String },
      contactPerson: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    products: [
      {
        type: { type: String, required: true },
        grade: { type: String, required: true },
        packaging: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
      },
    ],
    deliveryInfo: {
      deliveryMethod: { type: String, required: true },
      preferredDate: { type: Date },
      destinationPort: { type: String },
      instructions: { type: String },
      deliveryAddress: { type: String },
    },
    paymentInfo: {
      paymentMethod: { type: String, required: true },
      currency: { type: String, required: true },
      terms: { type: String, required: true },
      referenceId: { type: String },
      requestInvoice: { type: Boolean },
      billingAddress: { type: String },
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    hiddenFromCustomer: { type: Boolean, default: false },
    hiddenFromAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TeaOrder = mongoose.model("TeaOrder", TeaOrderSchema);
export default TeaOrder;
