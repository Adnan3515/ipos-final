import { db } from "../db/db";
import { error } from "console";
import { Request, Response } from "express";

export async function createShop(req: Request, res: Response): Promise<void> {
  try {
    //Get The Data
    const { name, slug, location, adminId, attendantIds } = req.body;

    //Check if shop already exists
    const existingShop = await db.shop.findUnique({
      where: {
        slug,
      },
    });
    if (existingShop) {
       res.status(409).json({
        error: `Shop (${name}) is already existing`,
        data: null,
      });
      return
    }

    //Create The Shop
    const newShop = await db.shop.create({
      data: {
        name,
        slug,
        location,
        adminId,
        attendantIds,
      },
    });

    //Return The Created Shop
     res.status(201).json({
      data: newShop,
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

export async function getShops(req: Request, res: Response): Promise<void> {
  try {
    const shops = await db.shop.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
     res.status(200).json({
      data: shops,
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

export async function getShopAttendants(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const existingShop = await db.shop.findUnique({
      where: {
        id,
      },
    });
    if (!existingShop) {
       res.status(404).json({
        data: null,
        error: "Shop does not exist",
      });
      return
    }
    // Get the users whose ids are equal to existing shop attendants id
    const attendants = await db.user.findMany({
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

export async function getSingleShop(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const existingShop = await db.shop.findUnique({
      where: {
        id,
      },
    });
    if (!existingShop) {
       res.status(404).json({
        data: null,
        error: "Shop does not exist",
      });
      return
    }

     res.status(200).json({
      data: existingShop,
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
