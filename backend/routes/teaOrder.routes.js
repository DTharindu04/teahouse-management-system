import express from "express";
import {getAllTeaOrders, createTeaOrder, updateTeaOrder, deleteTeaOrder, getTeaOrderById, updateTeaOrderStatus} from "../controllers/teaOrder.controller.js";

const router = express.Router();

router.get("/", getAllTeaOrders);
router.post("/", createTeaOrder);
router.put("/:id", updateTeaOrder);
router.delete("/:id", deleteTeaOrder);
router.get("/:id", getTeaOrderById);
router.put('/:id/status', updateTeaOrderStatus);

export default router;
