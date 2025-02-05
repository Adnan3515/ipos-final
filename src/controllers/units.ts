import { Unit } from "./../../node_modules/.prisma/client/index.d";
import { db } from "../db/db";
import { error } from "console";
import { Request, Response } from "express";

export async function createUnit(req: Request, res: Response): Promise<void> {
  try {
    //Get The Data
    const { name, abbreviation, slug } = req.body;

    //Check if unit already exists
    const existingUnit = await db.unit.findUnique({
      where: {
        slug,
      },
    });
    if (existingUnit) {
       res.status(409).json({
        error: `Unit (${name}) is already existing`,
        data: null,
      });
      return
    }

    //Create The Unit
    const newUnit = await db.unit.create({
      data: {
        name,
        abbreviation,
        slug,
      },
    });

    //Return The Created Unit
     res.status(201).json({
      data: newUnit,
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

export async function getUnits(req: Request, res: Response): Promise<void> {
  try {
    const units = await db.unit.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
     res.status(200).json({
      data: units,
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

export async function getSingleUnit(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const existingUnit = await db.unit.findUnique({
      where: {
        id,
      },
    });
    if (!existingUnit) {
       res.status(404).json({
        data: null,
        error: "Unit does not exist",
      });
      return
    }

     res.status(200).json({
      data: existingUnit,
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

export async function deleteUnitById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const unit = await db.unit.findUnique({
      where: {
        id,
      },
    });
    if (!unit) {
       res.status(404).json({
        data: null,
        error: "Unit Not Found",
      });
      return
    }
    await db.unit.delete({
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

export async function updateUnitById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { name, abbreviation, slug } = req.body;
    // Existing Unit
    const existingUnit = await db.unit.findUnique({
      where: {
        id,
      },
    });
    // If Unit does not exist we run 404
    if (!existingUnit) {
       res.status(404).json({
        data: null,
        error: "Unit Not Found",
      });
      return
    }
    // Check if unique
    if (slug !== existingUnit.slug) {
      const existingUnitBySlug = await db.unit.findUnique({
        where: {
          slug,
        },
      });
      if (existingUnitBySlug) {
         res.status(409).json({
          error: `Unit (${name}) Already Taken`,
          data: null,
        });
        return
      }
    }
    // Update Unit
    const updatedUnit = await db.unit.update({
      where: {
        id,
      },
      data: {
        name,
        abbreviation,
        slug,
      },
    });

     res.status(200).json({
      data: updatedUnit,
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
