import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import config from "../../../config";
import {
  BaseCartClass,
  CartObject,
  CreateCartObject,
} from "../cart.interface";
dotenv.config();

mongoose.set("strictQuery", false);

export class DaoMongoDB implements BaseCartClass {
  private collection;
  private initDB;

  constructor(collection: string, schema: Schema) {
    this.collection = mongoose.model<CartObject>(collection, schema);
    this.initDB = mongoose.connect(config.MONGO_ATLAS_URL);
  }
  async initMongoDB() {
    return this.initDB;
  }
  async getCartById(id: string) {
    const cart: CartObject | null = await this.collection.findById(id);
    return cart;
  }
  async getCartByQuery(query: any) {
    const cart: CartObject | null = await this.collection.findOne(query);
    return cart;
  }
  async createCart(data: CreateCartObject) {
    const cart = await this.collection.create(data);
    return cart;
  }
  async updateCart(query: any, update: any) {
    const cartUpdate = await this.collection.updateOne(query, update);
    return cartUpdate;
  }
}
