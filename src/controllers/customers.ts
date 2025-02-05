import { db } from "../db/db";
import { Customer } from "./../../node_modules/.prisma/client/index.d";
import { Request, Response } from "express";

export async function createCustomers(req: Request, res: Response): Promise<void> {
  const {
    customerType,
    firstName,
    lastName,
    phone,
    gender,
    country,
    location,
    maxCreditLimit,
    maxCreditDays,
    taxPin,
    dod,
    email,
    NIN,
  } = req.body;
  try {
    // Check if phone ,email and name are Unique
    const existingCustomerByPhone = await db.customer.findUnique({
      where: {
        phone,
      },
    });
    if (existingCustomerByPhone) {
       res.status(409).json({
        error: `Phone number ${phone} is already in use`,
      });
      return
    }
    if (email) {
      const existingCustomerByEmail = await db.customer.findUnique({
        where: {
          email,
        },
      });
      if (existingCustomerByEmail) {
         res.status(409).json({
          error: `Email ${email} is already in use`,
        });
        return
      }
    }
    if (NIN) {
      const existingCustomerByNIN = await db.customer.findUnique({
        where: {
          NIN,
        },
      });
      if (existingCustomerByNIN) {
         res.status(409).json({
          error: `NIN ${NIN} is already in use`,
        });
        return
      }
    }
    //Create the Customer
    const newCustomer = await db.customer.create({
      data: {
        customerType,
        firstName,
        lastName,
        phone,
        gender,
        country,
        location,
        maxCreditLimit,
        maxCreditDays,
        taxPin,
        dod,
        email,
        NIN,
      },
    });
    //Return the created customer
     res.status(201).json(newCustomer);
     return
  } catch (error) {
    console.log(error);
     res.status(500).json({ error: "Internal Server Error" });
     return
  }
}
export async function getCustomers(req: Request, res: Response): Promise<void> {
  try {
    const customers = await db.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

     res.status(200).json(customers);
     return
  } catch (error) {
    console.log(error);
  }
}

export async function getCustomersById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const customer = await db.customer.findUnique({
      where: {
        id,
      },
    });
    if(!customer){
       res.status(404).json({
        error:`Customer ${customer} not found`,
        data:null
      })
      return
    }
     res.status(200).json(customer);
     return
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCustomerById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const customer = await db.customer.findUnique({
      where: {
        id,
      },
    });
    if (!customer) {
       res.status(404).json({
        data: null,
        error: "Customer Not Found",
      });
      return
    }
    await db.customer.delete({
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
