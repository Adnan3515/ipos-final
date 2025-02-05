"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customers_1 = require("@/controllers/customers");
const express_1 = __importDefault(require("express"));
const customerRouter = express_1.default.Router();
customerRouter.post("/customers", customers_1.createCustomers);
customerRouter.get("/customers", customers_1.getCustomers);
customerRouter.get("/customers/:id", customers_1.getCustomersById);
customerRouter.delete("/customers/:id", customers_1.deleteCustomerById);
exports.default = customerRouter;
