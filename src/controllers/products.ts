import { Product } from ".prisma/client";
import { db } from "../db/db";
import { error } from "console";
import { Request, Response } from "express";

export async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    //Get The Data
    const {
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
    } = req.body;

    //Check if Product already exists
    const existingProductBySlug = await db.product.findUnique({
      where: {
        slug,
      },
    });
    if (existingProductBySlug) {
       res.status(409).json({
        error: `Product (${name}) is already existing`,
        data: null,
      });
      return
    }
    const existingProductBySku = await db.product.findUnique({
      where: {
        sku,
      },
    });
    if (existingProductBySku) {
       res.status(409).json({
        error: `Product SKU (${name}) is already existing`,
        data: null,
      });
      return
    }
    const existingProductByProductCode = await db.product.findUnique({
      where: {
        productCode,
      },
    });
    if (existingProductByProductCode) {
       res.status(409).json({
        error: `Product Code (${name}) is already existing`,
        data: null,
      });
      return
    }

    //Create The Product
    const newProduct = await db.product.create({
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

    //Return The Created Product
     res.status(201).json({
      data: newProduct,
      error: null,
    });
    return
  } catch (error) {
    console.log(error);
     res.status(500).json({
      error: `Something Went Wrong`,
      data: null,
    });
    return
  }
}

export async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    const Products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
     res.status(200).json({
      data: Products,
      error: null,
    });
    return
  } catch (error) {
    console.log(error);
     res.status(500).json({
      error: `Something Went Wrong`,
      data: null,
    });
    return
  }
}

export async function getSingleProduct(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });
    if (!existingProduct) {
       res.status(404).json({
        data: null,
        error: "Product does not exist",
      });
      return
    }

     res.status(200).json({
      data: existingProduct,
      error: null,
    });
  } catch (error) {
    console.log(error);
     res.status(500).json({
      error: `Something Went Wrong`,
      data: null,
    });
  }
}

export async function deleteProductById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const Product = await db.product.findUnique({
      where: {
        id,
      },
    });
    if (!Product) {
       res.status(404).json({
        data: null,
        error: "Product Not Found",
      });
      return
    }
    await db.product.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      error: null,
    });
  } catch (error) {
    console.log(error);
     res.status(500).json({
      error: `Something Went Wrong`,
      data: null,
    });
  }
}

export async function updateProductById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const {
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
    } = req.body;
    // Existing Product
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });
    // If Product does not exist we run 404
    if (!existingProduct) {
       res.status(404).json({
        data: null,
        error: "Product Not Found",
      });
      return
    }
    // Check if unique
    if (slug !== existingProduct.slug) {
      const existingProductBySlug = await db.product.findUnique({
        where: {
          slug,
        },
      });
      if (existingProductBySlug) {
         res.status(409).json({
          error: `Product (${name}) Already Taken`,
          data: null,
        });
        return
      }
    }
    if (sku !== existingProduct.sku) {
      const existingProductBySku = await db.product.findUnique({
        where: {
          sku,
        },
      });
      if (existingProductBySku) {
         res.status(409).json({
          error: `Product SKU (${name}) Already Taken`,
          data: null,
        });
        return
      }
    }
    if (productCode !== existingProduct.productCode) {
      const existingProductByProductCode = await db.product.findUnique({
        where: {
          productCode,
        },
      });
      if (existingProductByProductCode) {
         res.status(409).json({
          error: `Product Code (${name}) Already Taken`,
          data: null,
        });
        return
      }
    }
    // Update Product
    const updatedProduct = await db.product.update({
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
    return
  } catch (error) {
    console.log(error);
     res.status(500).json({
      error: `Something Went Wrong`,
      data: null,
    });
    return
  }
}
