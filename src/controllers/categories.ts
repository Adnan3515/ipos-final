import { Category } from ".prisma/client";
import { db } from "../db/db";
import { error } from "console";
import { Request, Response } from "express";

export async function createCategory(req: Request, res: Response): Promise<void> {
  try {
    //Get The Data
    const { name, slug } = req.body;

    //Check if Category already exists
    const existingCategory = await db.category.findUnique({
      where: {
        slug,
      },
    });
    if (existingCategory) {
       res.status(409).json({
        error: `Category (${name}) is already existing`,
        data: null,
      });
      return
    }

    //Create The Category
    const newCategory = await db.category.create({
      data: {
        name,
        slug,
      },
    });

    //Return The Created Category
     res.status(201).json({
      data: newCategory,
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

export async function getCategories(req: Request, res: Response): Promise<void> {
  try {
    const Categories = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
     res.status(200).json({
      data: Categories,
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

export async function getSingleCategory(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const existingCategory = await db.category.findUnique({
      where: {
        id,
      },
    });
    if (!existingCategory) {
       res.status(404).json({
        data: null,
        error: "Category does not exist",
      });
      return
    }

     res.status(200).json({
      data: existingCategory,
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

export async function deleteCategoryById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const Category = await db.category.findUnique({
      where: {
        id,
      },
    });
    if (!Category) {
       res.status(404).json({
        data: null,
        error: "Category Not Found",
      });
      return
    }
    await db.category.delete({
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

export async function updateCategoryById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;
    // Existing Category
    const existingCategory = await db.category.findUnique({
      where: {
        id,
      },
    });
    // If Category does not exist we run 404
    if (!existingCategory) {
       res.status(404).json({
        data: null,
        error: "Category Not Found",
      });
      return
    }
    // Check if unique
    if (slug !== existingCategory.slug) {
      const existingCategoryBySlug = await db.category.findUnique({
        where: {
          slug,
        },
      });
      if (existingCategoryBySlug) {
         res.status(409).json({
          error: `Category (${name}) Already Taken`,
          data: null,
        });
        return
      }
    }
    // Update Category
    const updatedCategory = await db.category.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
      },
    });

     res.status(200).json({
      data: updatedCategory,
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
