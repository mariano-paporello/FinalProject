"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.orderSchema = new mongoose_1.default.Schema({
    items: [
        {
            productName: { type: String, require: true },
            amount: { type: Number, require: true },
            price: { type: Number, require: true }
        }
    ],
    userId: { type: String, require: true },
    numberOrder: { type: Number, require: true },
    state: { type: String, require: true },
    gmail: { type: String, require: true },
    total: { type: Number, require: true }
}, { timestamps: true });
