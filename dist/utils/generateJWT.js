"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DEFAULT_SIGN_OPTION = {
    expiresIn: "1h",
};
function generateAccessToken(payload, options = DEFAULT_SIGN_OPTION) {
    const secret = process.env.SECRET_KEY;
    if (!secret) {
        throw new Error("SECRET_KEY is not defined in the environment variables.");
    }
    const token = jsonwebtoken_1.default.sign(payload, secret, options);
    return token;
}
