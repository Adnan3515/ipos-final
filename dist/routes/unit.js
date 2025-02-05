"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const units_1 = require("../controllers/units");
const express_1 = __importDefault(require("express"));
const unitRouter = express_1.default.Router();
unitRouter.post("/units", units_1.createUnit);
unitRouter.get("/units", units_1.getUnits);
unitRouter.get("/units/:id", units_1.getSingleUnit);
unitRouter.put("/units/:id", units_1.updateUnitById);
unitRouter.delete("/units/:id", units_1.deleteUnitById);
exports.default = unitRouter;
