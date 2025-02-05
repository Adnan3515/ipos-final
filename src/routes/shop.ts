import { createShop, getShopAttendants, getShops, getSingleShop } from "@/controllers/shops";
import express from "express";

const shopRouter = express.Router();

shopRouter.post("/shops", createShop);
shopRouter.get("/shops", getShops);
shopRouter.get("/shops/:id", getSingleShop);
shopRouter.get("/attendants/shop/:id", getShopAttendants);

export default shopRouter;
