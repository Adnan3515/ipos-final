import { authorizeUser } from "@/controllers/login";
import express from "express";

const loginRouter = express.Router();

loginRouter.post("/auth/login",authorizeUser);

export default loginRouter;
