import { Brand } from "./../../node_modules/.prisma/client/index.d";
import { db } from "../db/db";
import { error } from "console";
import { Request, Response } from "express";

export async function createBrand(req: Request, res: Response): Promise<void> {
  try {
    //Get The Data
    const { name, slug } = req.body;

    //Check if Brand already exists
    const existingBrand = await db.brand.findUnique({
      where: {
        slug,
      },
    });
    if (existingBrand) {
       res.status(409).json({
        error: `Brand (${name}) is already existing`,
        data: null,
      });
      return
    }

    //Create The Brand
    const newBrand = await db.brand.create({
      data: {
        name,
        slug,
      },
    });

    //Return The Created Brand
     res.status(201).json({
      data: newBrand,
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

export async function getBrands(req: Request, res: Response): Promise<void> {
  try {
    const brands = await db.brand.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
     res.status(200).json({
      data: brands,
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

export async function getSingleBrand(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const existingBrand = await db.brand.findUnique({
      where: {
        id,
      },
    });
    if (!existingBrand) {
       res.status(404).json({
        data: null,
        error: "Brand does not exist",
      });
      return
    }

     res.status(200).json({
      data: existingBrand,
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

export async function deleteBrandById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const brand = await db.brand.findUnique({
      where: {
        id,
      },
    });
    if (!brand) {
       res.status(404).json({
        data: null,
        error: "Brand Not Found",
      });
      return
    }
    await db.brand.delete({
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
    return
  }
}

export async function updateBrandById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;
    // Existing Brand
    const existingBrand = await db.brand.findUnique({
      where: {
        id,
      },
    });
    // If Brand does not exist we run 404
    if (!existingBrand) {
       res.status(404).json({
        data: null,
        error: "Brand Not Found",
      });
      return
    }
    // Check if unique
    if (slug !== existingBrand.slug) {
      const existingBrandBySlug = await db.brand.findUnique({
        where: {
          slug,
        },
      });
      if (existingBrandBySlug) {
         res.status(409).json({
          error: `Brand (${name}) Already Taken`,
          data: null,
        });
        return
      }
    }
    // Update Brand
    const updatedBrand = await db.brand.update({
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
