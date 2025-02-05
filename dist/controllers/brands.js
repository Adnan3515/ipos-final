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
exports.createBrand = createBrand;
exports.getBrands = getBrands;
exports.getSingleBrand = getSingleBrand;
exports.deleteBrandById = deleteBrandById;
exports.updateBrandById = updateBrandById;
const db_1 = require("../db/db");
function createBrand(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, slug } = req.body;
            const existingBrand = yield db_1.db.brand.findUnique({
                where: {
                    slug,
                },
            });
            if (existingBrand) {
                res.status(409).json({
                    error: `Brand (${name}) is already existing`,
                    data: null,
                });
                return;
            }
            const newBrand = yield db_1.db.brand.create({
                data: {
                    name,
                    slug,
                },
            });
            res.status(201).json({
                data: newBrand,
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
function getBrands(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const brands = yield db_1.db.brand.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });
            res.status(200).json({
                data: brands,
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
function getSingleBrand(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const existingBrand = yield db_1.db.brand.findUnique({
                where: {
                    id,
                },
            });
            if (!existingBrand) {
                res.status(404).json({
                    data: null,
                    error: "Brand does not exist",
                });
                return;
            }
            res.status(200).json({
                data: existingBrand,
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
function deleteBrandById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const brand = yield db_1.db.brand.findUnique({
                where: {
                    id,
                },
            });
            if (!brand) {
                res.status(404).json({
                    data: null,
                    error: "Brand Not Found",
                });
                return;
            }
            yield db_1.db.brand.delete({
                where: {
                    id,
                },
            });
            res.status(200).json({
                success: true,
                error: null,
            });
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
function updateBrandById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name, slug } = req.body;
            const existingBrand = yield db_1.db.brand.findUnique({
                where: {
                    id,
                },
            });
            if (!existingBrand) {
                res.status(404).json({
                    data: null,
                    error: "Brand Not Found",
                });
                return;
            }
            if (slug !== existingBrand.slug) {
                const existingBrandBySlug = yield db_1.db.brand.findUnique({
                    where: {
                        slug,
                    },
                });
                if (existingBrandBySlug) {
                    res.status(409).json({
                        error: `Brand (${name}) Already Taken`,
                        data: null,
                    });
                    return;
                }
            }
            const updatedBrand = yield db_1.db.brand.update({
                where: {
                    id,
                },
                data: {
                    name,
                    slug,
                },
            });
            res.status(200).json({
                data: updatedBrand,
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
