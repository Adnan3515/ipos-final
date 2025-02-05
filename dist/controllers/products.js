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
exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.getSingleProduct = getSingleProduct;
exports.deleteProductById = deleteProductById;
exports.updateProductById = updateProductById;
const db_1 = require("../db/db");
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, batchNumber, image, alertQty, stockQty, price, buyingPrice, sku, productCode, slug, supplierId, unitId, brandId, categoryId, expiryDate, } = req.body;
            const existingProductBySlug = yield db_1.db.product.findUnique({
                where: {
                    slug,
                },
            });
            if (existingProductBySlug) {
                res.status(409).json({
                    error: `Product (${name}) is already existing`,
                    data: null,
                });
                return;
            }
            const existingProductBySku = yield db_1.db.product.findUnique({
                where: {
                    sku,
                },
            });
            if (existingProductBySku) {
                res.status(409).json({
                    error: `Product SKU (${name}) is already existing`,
                    data: null,
                });
                return;
            }
            const existingProductByProductCode = yield db_1.db.product.findUnique({
                where: {
                    productCode,
                },
            });
            if (existingProductByProductCode) {
                res.status(409).json({
                    error: `Product Code (${name}) is already existing`,
                    data: null,
                });
                return;
            }
            const newProduct = yield db_1.db.product.create({
                data: {
                    name,
                    description,
                    batchNumber,
                    image,
                    alertQty,
                    stockQty,
                    price,
                    buyingPrice,
                    sku,
                    productCode,
                    slug,
                    supplierId,
                    unitId,
                    brandId,
                    categoryId,
                    expiryDate,
                },
            });
            res.status(201).json({
                data: newProduct,
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
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Products = yield db_1.db.product.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });
            res.status(200).json({
                data: Products,
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
function getSingleProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const existingProduct = yield db_1.db.product.findUnique({
                where: {
                    id,
                },
            });
            if (!existingProduct) {
                res.status(404).json({
                    data: null,
                    error: "Product does not exist",
                });
                return;
            }
            res.status(200).json({
                data: existingProduct,
                error: null,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `Something Went Wrong`,
                data: null,
            });
        }
    });
}
function deleteProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const Product = yield db_1.db.product.findUnique({
                where: {
                    id,
                },
            });
            if (!Product) {
                res.status(404).json({
                    data: null,
                    error: "Product Not Found",
                });
                return;
            }
            yield db_1.db.product.delete({
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
        }
    });
}
function updateProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name, description, batchNumber, image, alertQty, stockQty, price, buyingPrice, sku, productCode, slug, supplierId, unitId, brandId, categoryId, expiryDate, } = req.body;
            const existingProduct = yield db_1.db.product.findUnique({
                where: {
                    id,
                },
            });
            if (!existingProduct) {
                res.status(404).json({
                    data: null,
                    error: "Product Not Found",
                });
                return;
            }
            if (slug !== existingProduct.slug) {
                const existingProductBySlug = yield db_1.db.product.findUnique({
                    where: {
                        slug,
                    },
                });
                if (existingProductBySlug) {
                    res.status(409).json({
                        error: `Product (${name}) Already Taken`,
                        data: null,
                    });
                    return;
                }
            }
            if (sku !== existingProduct.sku) {
                const existingProductBySku = yield db_1.db.product.findUnique({
                    where: {
                        sku,
                    },
                });
                if (existingProductBySku) {
                    res.status(409).json({
                        error: `Product SKU (${name}) Already Taken`,
                        data: null,
                    });
                    return;
                }
            }
            if (productCode !== existingProduct.productCode) {
                const existingProductByProductCode = yield db_1.db.product.findUnique({
                    where: {
                        productCode,
                    },
                });
                if (existingProductByProductCode) {
                    res.status(409).json({
                        error: `Product Code (${name}) Already Taken`,
                        data: null,
                    });
                    return;
                }
            }
            const updatedProduct = yield db_1.db.product.update({
                where: {
                    id,
                },
                data: {
                    name,
                    description,
                    batchNumber,
                    image,
                    alertQty,
                    stockQty,
                    price,
                    buyingPrice,
                    sku,
                    productCode,
                    slug,
                    supplierId,
                    unitId,
                    brandId,
                    categoryId,
                    expiryDate,
                },
            });
            res.status(200).json({
                data: updatedProduct,
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
