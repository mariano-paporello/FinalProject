import mongoose, { FilterQuery, Schema, UpdateQuery } from "mongoose";
import config from "../../../config";
import { logger } from "../../../utils/loggers";
import {
  AddProductObject,
  ProductBaseClass,
  ProductObject,
} from "../products.interface";

mongoose.set("strictQuery", true);

export class DaoMongoDB implements ProductBaseClass {
  private collection;
  private initDB;

  constructor(collection: string, schema: Schema) {
    this.collection = mongoose.model<ProductObject>(collection, schema);
    this.initDB = mongoose.connect(config.MONGO_ATLAS_URL);
  }

  async initMongoDB() {
    return this.initDB;
  }

  async getAllProd() {
    const products: ProductObject[] | [] = await this.collection.find({});
    return products;
  }
  async getProductById(id: string) {
    try {
      const productFound: ProductObject | null = await this.collection.findById(
        id
      );
      return productFound;
    } catch (error) {
      logger.info(`Error in getProductById: ${error}`);
    }
  }
  async getOneProductByQuery(query: FilterQuery<ProductObject>) {
    const productFound: ProductObject | null = await this.collection.findOne(
      query
    );
    return productFound;
  }
  async getProductsByQuery(query: FilterQuery<ProductObject>) {
    const productFound: ProductObject[] | null = await this.collection.find(
      query
    );
    return productFound;
  }
  async postProductToProducts(data: AddProductObject) {
    const productAdded: ProductObject = await this.collection.create(data);
    return productAdded;
  }
  async updateProduct(
    query: FilterQuery<ProductObject>,
    update: UpdateQuery<ProductObject>
  ) {
    const result = await this.collection.updateOne(query, update);
    return result;
  }
  async deleteById(id: string) {
    const deleting = await this.collection.deleteOne({ _id: id });
    return deleting;
  }
  async deleteAll() {
    await this.collection.deleteMany();
    return true;
  }
}
