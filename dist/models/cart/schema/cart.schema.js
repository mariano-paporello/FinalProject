"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.cartSchema = new mongoose_1.default.Schema({
    userId: { type: String, require: true },
    cart: [
        {
            productId: { type: String, require: true },
            amount: { type: Number, require: true },
        }
    ]
}, { timestamps: true });
