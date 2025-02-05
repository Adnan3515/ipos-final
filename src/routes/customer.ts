import {
  createCustomers,
  deleteCustomerById,
  getCustomers,
  getCustomersById,
} from "@/controllers/customers";
import express from "express";

const customerRouter = express.Router();

customerRouter.post("/customers", createCustomers);
customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomersById);
customerRouter.delete("/customers/:id", deleteCustomerById);

//customerRouter.get("/api/v2/customers", getV2Customers);

export default customerRouter;
