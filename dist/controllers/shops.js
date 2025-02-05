"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShop = createShop;
exports.getShops = getShops;
exports.getShopAttendants = getShopAttendants;
exports.getSingleShop = getSingleShop;
const db_1 = require("../db/db");
function createShop(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, slug, location, adminId, attendantIds } = req.body;
            const existingShop = yield db_1.db.shop.findUnique({
                where: {
                    slug,
                },
            });
            if (existingShop) {
                res.status(409).json({
                    error: `Shop (${name}) is already existing`,
                    data: null,
                });
                return;
            }
            const newShop = yield db_1.db.shop.create({
                data: {
                    name,
                    slug,
                    location,
                    adminId,
                    attendantIds,
                },
            });
            res.status(201).json({
                data: newShop,
                error: null,
            });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `Something Went Wrong`,
                data: null,
            });
            return;
        }
    });
}
function getShops(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const shops = yield db_1.db.shop.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });
            res.status(200).json({
                data: shops,
                error: null,
            });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `Something Went Wrong`,
                data: null,
            });
            return;
        }
    });
}
function getShopAttendants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const existingShop = yield db_1.db.shop.findUnique({
                where: {
                    id,
                },
            });
            if (!existingShop) {
                res.status(404).json({
                    data: null,
                    error: "Shop does not exist",
                });
                return;
            }
            const attendants = yield db_1.db.user.findMany({
                where: {
                    id: {
                        in: existingShop.attendantIds,
                    },
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    image: true,
                    phone: true,
                    email: true,
                    username: true,
                },
            });
            res.status(200).json({
                data: attendants,
                error: null,
            });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `Something Went Wrong`,
                data: null,
            });
            return;
        }
    });
}
function getSingleShop(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const existingShop = yield db_1.db.shop.findUnique({
                where: {
                    id,
                },
            });
            if (!existingShop) {
                res.status(404).json({
                    data: null,
                    error: "Shop does not exist",
                });
                return;
            }
            res.status(200).json({
                data: existingShop,
                error: null,
            });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `Something Went Wrong`,
                data: null,
            });
            return;
        }
    });
}
