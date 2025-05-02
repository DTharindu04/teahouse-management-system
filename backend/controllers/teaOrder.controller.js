import TeaOrder from "../models/teaOrder.model.js";

// Get All Tea Orders
const getAllTeaOrders = async (req, res, next) => {
    try {
        const teaOrders = await TeaOrder.find();
        if (!teaOrders || teaOrders.length === 0) {
            return res.status(404).json({ message: "Tea orders not found" });
        }
        return res.status(200).json({ teaOrders });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Create A New Tea Order
const createTeaOrder = async (req, res, next) => {
    try {
        req.body.date = new Date();
        const newTeaOrder = new TeaOrder(req.body);
        const savedTeaOrder = await newTeaOrder.save();
        return res.status(201).json({ teaOrder: savedTeaOrder });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update an existing Tea Order by ID
const updateTeaOrder = async (req, res, next) => {
    try {
        const updatedTeaOrder = await TeaOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeaOrder) {
            return res.status(404).json({ message: "Tea order not found" });
        }
        return res.status(200).json({ teaOrder: updatedTeaOrder });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Delete an existing Tea Order by ID
const deleteTeaOrder = async (req, res, next) => {
    try {
        const deletedTeaOrder = await TeaOrder.findByIdAndDelete(req.params.id);
        if (!deletedTeaOrder) {
            return res.status(404).json({ message: "Tea order not found" });
        }
        return res.status(200).json({ message: "Tea order deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get a single Tea Order by ID
const getTeaOrderById = async (req, res, next) => {
    try {
        const teaOrderId = req.params.id;
        const teaOrder = await TeaOrder.findById(teaOrderId);
        if (!teaOrder) {
            return res.status(404).json({ message: "Tea order not found" });
        }
        return res.status(200).json({ teaOrder });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { getAllTeaOrders, createTeaOrder, updateTeaOrder, deleteTeaOrder, getTeaOrderById };
