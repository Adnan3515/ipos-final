import { createSuppliers, deleteSupplierById, getSuppliers, getSuppliersById } from "@/controllers/supplier";
import express from "express";

const supplierRouter = express.Router();

supplierRouter.post("/suppliers", createSuppliers);
supplierRouter.get("/suppliers", getSuppliers);
supplierRouter.get("/suppliers/:id", getSuppliersById);
supplierRouter.delete("/suppliers/:id", deleteSupplierById);

export default supplierRouter;
