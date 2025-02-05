"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shops_1 = require("../controllers/shops");
const express_1 = __importDefault(require("express"));
const shopRouter = express_1.default.Router();
shopRouter.post("/shops", shops_1.createShop);
shopRouter.get("/shops", shops_1.getShops);
shopRouter.get("/shops/:id", shops_1.getSingleShop);
shopRouter.get("/attendants/shop/:id", shops_1.getShopAttendants);
exports.default = shopRouter;
