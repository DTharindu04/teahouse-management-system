import express from "express";
import {
  getAllInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  getInventoryById,
  getInventoryCount
} from "../controllers/inventory.controller.js";

const router = express.Router();

router.get("/inventorydetails", getAllInventory);
router.post("/order_create", createInventory);
router.put("/order_update", updateInventory);
router.delete("/order_delete/:id", deleteInventory);
router.get("/user/:id", getInventoryById);
router.get("/count", getInventoryCount);

export default router;
