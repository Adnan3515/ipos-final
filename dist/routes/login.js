"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = require("../controllers/login");
const express_1 = __importDefault(require("express"));
const loginRouter = express_1.default.Router();
loginRouter.post("/auth/login", login_1.authorizeUser);
exports.default = loginRouter;
