"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../controllers/products");
const express_1 = __importDefault(require("express"));
const productRouter = express_1.default.Router();
productRouter.post("/products", products_1.createProduct);
productRouter.get("/products", products_1.getProducts);
productRouter.get("/products/:id", products_1.getSingleProduct);
productRouter.put("/products/:id", products_1.updateProductById);
productRouter.delete("/products/:id", products_1.deleteProductById);
exports.default = productRouter;
