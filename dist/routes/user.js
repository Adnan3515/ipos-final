"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("@/controllers/users");
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.post("/users", users_1.createUser);
userRouter.get("/users", users_1.getUsers);
userRouter.get("/attendants", users_1.getAttendants);
userRouter.get("/users/:id", users_1.getUserById);
userRouter.put("/users/:id", users_1.updateUserById);
userRouter.put("/users/update-password/:id", users_1.updateUserPasswordById);
userRouter.delete("/users/:id", users_1.deleteUserById);
exports.default = userRouter;
