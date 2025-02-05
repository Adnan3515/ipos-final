import bcrypt from "bcrypt";
import { db } from "../db/db";
import { error } from "console";
import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateJWT";

export async function authorizeUser(req: Request, res: Response): Promise<void> {
  // Receive the Data

  const { email, username, password } = req.body;

  try {
    let existingUser = null;
    if (email) {
      existingUser = await db.user.findUnique({
        where: {
          email,
        },
      });
    }
    if (username) {
      existingUser = await db.user.findUnique({
        where: {
          username,
        },
      });
    }
    if (!existingUser) {
       res.status(403).json({
        error: `Wrong Credentials`,
        data: null,
      });
      return
    }
    //check if the password is correct
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
       res.status(403).json({
        error: `Wrong Credentials`,
        data: null,
      });
      return
    }
    // Destructure out the password from the existing user
    const { password: userPass, ...userWithoutPassword } = existingUser;
    const accessToken = generateAccessToken(userWithoutPassword)
    const result={...userWithoutPassword,accessToken}
     res.json(result);
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
