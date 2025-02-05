"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = require("../controllers/categories");
const express_1 = __importDefault(require("express"));
const categoryRouter = express_1.default.Router();
categoryRouter.post("/categories", categories_1.createCategory);
categoryRouter.get("/categories", categories_1.getCategories);
categoryRouter.get("/categories/:id", categories_1.getSingleCategory);
categoryRouter.put("/categories/:id", categories_1.updateCategoryById);
categoryRouter.delete("/categories/:id", categories_1.deleteCategoryById);
exports.default = categoryRouter;
