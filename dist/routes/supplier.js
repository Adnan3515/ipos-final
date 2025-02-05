"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supplier_1 = require("@/controllers/supplier");
const express_1 = __importDefault(require("express"));
const supplierRouter = express_1.default.Router();
supplierRouter.post("/suppliers", supplier_1.createSuppliers);
supplierRouter.get("/suppliers", supplier_1.getSuppliers);
supplierRouter.get("/suppliers/:id", supplier_1.getSuppliersById);
supplierRouter.delete("/suppliers/:id", supplier_1.deleteSupplierById);
exports.default = supplierRouter;
