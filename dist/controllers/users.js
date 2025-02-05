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
exports.createUser = createUser;
exports.getAttendants = getAttendants;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUserById = updateUserById;
exports.updateUserPasswordById = updateUserPasswordById;
exports.deleteUserById = deleteUserById;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db/db");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password, firstName, lastName, phone, dob, gender, image, role, } = req.body;
        try {
            const existingUserByEmail = yield db_1.db.user.findUnique({
                where: {
                    email,
                },
            });
            const existingUserByPhone = yield db_1.db.user.findUnique({
                where: {
                    phone,
                },
            });
            const existingUserByUserName = yield db_1.db.user.findUnique({
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
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield db_1.db.user.create({
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
            const { password: savedPassword } = newUser, others = __rest(newUser, ["password"]);
            res.status(201).json({
                data: others,
                error: null,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `Something Went Wrong`,
                data: null,
            });
        }
    });
}
function getAttendants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield db_1.db.user.findMany({
                orderBy: {
                    createdAt: "desc",
                },
                where: {
                    role: "ATTENDANT",
                },
            });
            const filteredUsers = users.map((user) => {
                const { password } = user, others = __rest(user, ["password"]);
                return others;
            });
            res.status(200).json({
                data: filteredUsers,
                error: null,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `Something Went Wrong`,
                data: null,
            });
        }
    });
}
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield db_1.db.user.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });
            const filteredUsers = users.map((user) => {
                const { password } = user, others = __rest(user, ["password"]);
                return others;
            });
            res.status(200).json({
                data: filteredUsers,
                error: null,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `Something Went Wrong`,
                data: null,
            });
        }
    });
}
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield db_1.db.user.findUnique({
                where: {
                    id,
                },
            });
            if (!user) {
                res.status(404).json({
                    data: null,
                    error: "User Not Found",
                });
                return;
            }
            const { password } = user, result = __rest(user, ["password"]);
            res.status(200).json({
                data: result,
                error: null,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `Something Went Wrong`,
                data: null,
            });
        }
    });
}
function updateUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { email, username, firstName, lastName, phone, dob, gender, image, password, } = req.body;
            const existingUser = yield db_1.db.user.findUnique({
                where: {
                    id,
                },
            });
            if (!existingUser) {
                res.status(404).json({
                    data: null,
                    error: "User Not Found",
                });
                return;
            }
            if (email && email !== existingUser.email) {
                const existingUserByEmail = yield db_1.db.user.findUnique({
                    where: {
                        email,
                    },
                });
                if (existingUserByEmail) {
                    res.status(409).json({
                        error: `Email (${email}) Already Taken`,
                        data: null,
                    });
                    return;
                }
            }
            if (phone && phone !== existingUser.phone) {
                const existingUserByPhone = yield db_1.db.user.findUnique({
                    where: {
                        phone,
                    },
                });
                if (existingUserByPhone) {
                    res.status(409).json({
                        error: `Phone (${phone}) Already Taken`,
                        data: null,
                    });
                    return;
                }
            }
            if (username && username !== existingUser.username) {
                const existingUserByUserName = yield db_1.db.user.findUnique({
                    where: {
                        username,
                    },
                });
                if (existingUserByUserName) {
                    res.status(409).json({
                        error: `Username (${username}) Already Taken`,
                        data: null,
                    });
                    return;
                }
            }
            let hashedPassword = existingUser.password;
            if (password) {
                hashedPassword = yield bcrypt_1.default.hash(password, 10);
            }
            const updatedUser = yield db_1.db.user.update({
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
            const { password: userPass } = updatedUser, others = __rest(updatedUser, ["password"]);
            res.status(200).json({
                data: others,
                error: null,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `Something Went Wrong`,
                data: null,
            });
        }
    });
}
function updateUserPasswordById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { password } = req.body;
        try {
            const user = yield db_1.db.user.findUnique({
                where: {
                    id,
                },
            });
            if (!user) {
                res.status(404).json({
                    data: null,
                    error: "User Not Found",
                });
                return;
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const updatedUser = yield db_1.db.user.update({
                where: {
                    id,
                },
                data: {
                    password: hashedPassword,
                },
            });
            const { password: savedPassword } = updatedUser, others = __rest(updatedUser, ["password"]);
            res.status(200).json({
                data: others,
                error: null,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `Something Went Wrong`,
                data: null,
            });
        }
    });
}
function deleteUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield db_1.db.user.findUnique({
                where: {
                    id,
                },
            });
            if (!user) {
                res.status(404).json({
                    data: null,
                    error: "User Not Found",
                });
                return;
            }
            yield db_1.db.user.delete({
                where: {
                    id,
                },
            });
            res.status(200).json({
                success: true,
                error: null,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error: `Something Went Wrong`,
                data: null,
            });
        }
    });
}
