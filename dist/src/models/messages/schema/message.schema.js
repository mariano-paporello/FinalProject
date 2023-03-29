"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.messagesSchema = new mongoose_1.default.Schema({
    userId: { type: String, require: true },
    type: { type: String, require: true },
    message: { type: String, require: true }
}, { timestamps: true });
