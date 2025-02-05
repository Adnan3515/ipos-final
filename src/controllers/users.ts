import { error } from "console";
import { User } from "./../../node_modules/.prisma/client/index.d";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../db/db";

export async function createUser(req: Request, res: Response): Promise<void> {
  // Receive the Data

  const {
    email,
    username,
    password,
    firstName,
    lastName,
    phone,
    dob,
    gender,
    image,
    role,
  } = req.body;

  try {
    // check if user exists (email,user,phone)
    const existingUserByEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    const existingUserByPhone = await db.user.findUnique({
      where: {
        phone,
      },
    });
    const existingUserByUserName = await db.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUserByEmail) {
      res.status(409).json({
        error: `Email (${email}) Already Taken`,
        data: null,
      });
      return;
    }
    if (existingUserByPhone) {
      res.status(409).json({
        error: `Phone (${phone}) Already Taken`,
        data: null,
      });
      return;
    }
    if (existingUserByUserName) {
      res.status(409).json({
        error: `Username (${username}) Already Taken`,
        data: null,
      });
      return;
    }
    // hash the password
    const hashedPassword: string = await bcrypt.hash(password, 10);
    // Create User
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        dob,
        gender,
        role,
        image: image
          ? image
          : "http://adnanfaizanpvt.com.pk/img/icon/favicon.png",
      },
    });
    // Modify the return User
    const { password: savedPassword, ...others } = newUser;
    res.status(201).json({
      data: others,
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

export async function getAttendants(req: Request, res: Response): Promise<void> {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        role: "ATTENDANT",
      },
    });
    const filteredUsers = users.map((user) => {
      const { password, ...others } = user;
      return others;
    });
    res.status(200).json({
      data: filteredUsers,
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

export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    const filteredUsers = users.map((user) => {
      const { password, ...others } = user;
      return others;
    });
    res.status(200).json({
      data: filteredUsers,
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

export async function getUserById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
       res.status(404).json({
        data: null,
        error: "User Not Found",
      });
      return
    }
    const { password, ...result } = user;
    res.status(200).json({
      data: result,
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

export async function updateUserById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const {
      email,
      username,
      firstName,
      lastName,
      phone,
      dob,
      gender,
      image,
      password,
    } = req.body;
    // Existing User
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    // If User does not exist we run 404
    if (!existingUser) {
       res.status(404).json({
        data: null,
        error: "User Not Found",
      });
      return
    }
    // if the email,username,phone are unique
    if (email && email !== existingUser.email) {
      const existingUserByEmail = await db.user.findUnique({
        where: {
          email,
        },
      });
      if (existingUserByEmail) {
         res.status(409).json({
          error: `Email (${email}) Already Taken`,
          data: null,
        });
        return
      }
    }
    if (phone && phone !== existingUser.phone) {
      const existingUserByPhone = await db.user.findUnique({
        where: {
          phone,
        },
      });
      if (existingUserByPhone) {
         res.status(409).json({
          error: `Phone (${phone}) Already Taken`,
          data: null,
        });
        return
      }
    }
    if (username && username !== existingUser.username) {
      const existingUserByUserName = await db.user.findUnique({
        where: {
          username,
        },
      });
      if (existingUserByUserName) {
         res.status(409).json({
          error: `Username (${username}) Already Taken`,
          data: null,
        });
        return
      }
    }
    // Hash the password if it exists
    let hashedPassword = existingUser.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    // Update User
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        email,
        username,
        firstName,
        lastName,
        phone,
        dob,
        gender,
        image,
        password: hashedPassword,
      },
    });

    // Return updated user without password
    const { password: userPass, ...others } = updatedUser;
     res.status(200).json({
      data: others,
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

export async function updateUserPasswordById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
       res.status(404).json({
        data: null,
        error: "User Not Found",
      });
      return
    }
    // hash the password
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
    const { password: savedPassword, ...others } = updatedUser;
     res.status(200).json({
      data: others,
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

export async function deleteUserById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
       res.status(404).json({
        data: null,
        error: "User Not Found",
      });
      return
    }
    await db.user.delete({
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
