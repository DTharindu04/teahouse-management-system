import CateringModel from "../models/inventory.model.js";

// Get all inventory items
const getAllInventory = async (req, res) => {
  try {
    const data = await CateringModel.find({});
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const createInventory = async (req, res) => {
  try {
      const data = new CateringModel(req.body);
      await data.save(); // Save the new inventory item
      res.send({ success: true, message: "Data created successfully" });
  } catch (err) {
      console.error(err);  // Log any errors for debugging
      res.status(500).json({ success: false, message: "Creation failed" });
  }
};

  




// Update inventory item
const updateInventory = async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    const data = await CateringModel.updateOne({ _id: id }, rest);
    res.send({ success: true, message: "Updated successfully", data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

// Delete inventory item
const deleteInventory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await CateringModel.deleteOne({ _id: id });
    res.send({ success: true, message: "Deleted successfully", data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

// Get inventory item by ID
const getInventoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await CateringModel.findById(id);
    if (!item) {
      return res.status(404).send({ success: false, message: "Item not found" });
    }
    res.send({ success: true, data: item });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// Get count of all items
const getInventoryCount = async (req, res) => {
  try {
    const items = await CateringModel.find({});
    return res.status(200).json({ count: items.length, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: "Count fetch failed" });
  }
};

export {
  getAllInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  getInventoryById,
  getInventoryCount
};
