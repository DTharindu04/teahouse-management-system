import TeaOrder from "../models/teaOrder.model.js";

//  Create a New Tea Order
const createTeaOrder = async (req, res) => {
  try {
    req.body.date = new Date();
    const newTeaOrder = new TeaOrder(req.body);
    const savedOrder = await newTeaOrder.save();
    return res.status(201).json({ teaOrder: savedOrder });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//  Get All Tea Orders (filtered by role)
const getAllTeaOrders = async (req, res) => {
  try {
    const role = req.query.role || "admin"; // role=admin or role=customer
    const filter = {};

    if (role === "admin") {
      filter.hiddenFromAdmin = { $ne: true };
    } else if (role === "customer") {
      filter.hiddenFromCustomer = { $ne: true };
    }

    const teaOrders = await TeaOrder.find(filter);

    if (!teaOrders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json({ teaOrders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//  Get a Single Order by ID
const getTeaOrderById = async (req, res) => {
  try {
    const order = await TeaOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json({ teaOrder: order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//  Update Entire Order
const updateTeaOrder = async (req, res) => {
  try {
    const updated = await TeaOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json({ teaOrder: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//  Update Status of an Order
const updateTeaOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const validStatuses = ['Pending', 'Accepted', 'Shipped', 'Delivered', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const updated = await TeaOrder.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ teaOrder: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//  Conditional Delete
const deleteTeaOrder = async (req, res) => {
  try {
    const { role } = req.query; // ?role=admin or ?role=customer
    const order = await TeaOrder.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    const { status } = order;

    if (role === "admin") {
      if (status === "Pending") {
        return res.status(403).json({ message: "Admins cannot delete pending orders." });
      }
      order.hiddenFromAdmin = true;
      await order.save();
      return res.status(200).json({ message: "Order hidden from admin dashboard." });
    }

    if (role === "customer") {
      if (status === "Pending") {
        await TeaOrder.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Order fully deleted by customer." });
      } else {
        order.hiddenFromCustomer = true;
        await order.save();
        return res.status(200).json({ message: "Order hidden from customer view." });
      }
    }

    return res.status(400).json({ message: "Invalid role." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//  Export All Functions
export {
  getAllTeaOrders,
  createTeaOrder,
  updateTeaOrder,
  deleteTeaOrder,
  getTeaOrderById,
  updateTeaOrderStatus,
};
