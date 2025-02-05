import { db } from "../db/db";
import { Supplier } from "./../../node_modules/.prisma/client/index.d";
import { Request, Response } from "express";
import { error } from "console";

export async function createSuppliers(
  req: Request,
  res: Response
): Promise<void> {
  const {
    supplierType,
    name,
    contactPerson,
    phone,
    email,
    location,
    country,
    website,
    taxPin,
    regNumber,
    bankAccountNumber,
    bankName,
    paymentTerms,
    logo,
    rating,
    notes,
  } = req.body;
  try {
    // Check if phone ,email and name are Unique
    const existingSupplierByPhone = await db.supplier.findUnique({
      where: {
        phone,
      },
    });
    if (existingSupplierByPhone) {
      res.status(409).json({
        error: `Phone number ${phone} is already in use`,
      });
      return;
    }
    if (email) {
      const existingSupplierByEmail = await db.supplier.findUnique({
        where: {
          email,
        },
      });
      if (existingSupplierByEmail) {
        res.status(409).json({
          error: `Email ${email} is already in use`,
        });
        return;
      }
    }
    if (regNumber) {
      const existingSupplierByRegNo = await db.supplier.findUnique({
        where: {
          regNumber,
        },
      });
      if (existingSupplierByRegNo) {
        res.status(409).json({
          error: `Registration Number ${regNumber} is already in use`,
        });
        return;
      }
    }
    //Create the Supplier
    const newSupplier = await db.supplier.create({
      data: {
        supplierType,
        name,
        contactPerson,
        phone,
        email,
        location,
        country,
        website,
        taxPin,
        regNumber,
        bankAccountNumber,
        bankName,
        paymentTerms,
        logo,
        rating,
        notes,
      },
    });
    //Return the created customer
    res.status(201).json(newSupplier);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function getSuppliers(req: Request, res: Response): Promise<void> {
  try {
    const suppliers = await db.supplier.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(suppliers);
  } catch (error) {
    console.log(error);
  }
}

export async function getSuppliersById(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  try {
    const supplier = await db.supplier.findUnique({
      where: {
        id,
      },
    });
    if (!supplier) {
      res.status(404).json({
        error: `Supplier ${supplier} not found`,
        data: null,
      });
      return;
    }
    res.status(200).json(supplier);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSupplierById(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  try {
    const supplier = await db.supplier.findUnique({
      where: {
        id,
      },
    });
    if (!supplier) {
      res.status(404).json({
        data: null,
        error: "Supplier Not Found",
      });
      return;
    }
    await db.supplier.delete({
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
