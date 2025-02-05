"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const brands_1 = require("../controllers/brands");
const express_1 = __importDefault(require("express"));
const brandRouter = express_1.default.Router();
brandRouter.post("/brands", brands_1.createBrand);
brandRouter.get("/brands", brands_1.getBrands);
brandRouter.get("/brands/:id", brands_1.getSingleBrand);
brandRouter.put("/brands/:id", brands_1.updateBrandById);
brandRouter.delete("/brands/:id", brands_1.deleteBrandById);
exports.default = brandRouter;
