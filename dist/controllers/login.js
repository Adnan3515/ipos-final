"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = authorizeUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db/db");
const generateJWT_1 = require("../utils/generateJWT");
function authorizeUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password } = req.body;
        try {
            let existingUser = null;
            if (email) {
                existingUser = yield db_1.db.user.findUnique({
                    where: {
                        email,
                    },
                });
            }
            if (username) {
                existingUser = yield db_1.db.user.findUnique({
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
                return;
            }
            const passwordMatch = yield bcrypt_1.default.compare(password, existingUser.password);
            if (!passwordMatch) {
                res.status(403).json({
                    error: `Wrong Credentials`,
                    data: null,
                });
                return;
            }
            const { password: userPass } = existingUser, userWithoutPassword = __rest(existingUser, ["password"]);
            const accessToken = (0, generateJWT_1.generateAccessToken)(userWithoutPassword);
            const result = Object.assign(Object.assign({}, userWithoutPassword), { accessToken });
            res.json(result);
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `Something Went Wrong`,
                data: null,
            });
            return;
        }
    });
}
