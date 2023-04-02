import mongoose from "mongoose";
import { OrderObject } from "../orders.interface";

export const orderSchema = new mongoose.Schema<OrderObject>(
  {
    items: [
      {
        productName: { type: String, require: true },
        amount: { type: Number, require: true },
        price: { type: Number, require: true },
      },
    ],
    userId: { type: String, require: true },
    numberOrder: { type: Number, require: true },
    state: { type: String, require: true },
    gmail: { type: String, require: true },
    total: { type: Number, require: true },
  },
  { timestamps: true }
);
