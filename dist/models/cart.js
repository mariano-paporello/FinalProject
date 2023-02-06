"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var cartCollection = 'carts';
var cartSchema = new mongoose_1.default.Schema({
    userId: { type: String, require: true },
    cart: [
        {
            productId: { type: String, require: true },
            amount: { type: Number, require: true },
        }
    ]
}, { timestamps: true });
var CartModel = mongoose_1.default.model(cartCollection, cartSchema);
exports.default = CartModel;
