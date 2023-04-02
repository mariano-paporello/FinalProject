import mongoose, { FilterQuery, Schema, UpdateQuery } from "mongoose";
import config from "../../../config";
import { MessageObject, newMessageObject } from "../messages.interface";

export class DaoMongoDB {
  private collection;
  private initDB;

  constructor(collection: string, schema: Schema) {
    this.collection = mongoose.model<MessageObject>(collection, schema);
    this.initDB = mongoose.connect(config.MONGO_ATLAS_URL);
  }

  async initMongoDB() {
    return this.initDB;
  }

  async getAllTheMessagesOfThisUser(id: string) {
    return await this.collection.find({ userId: id });
  }
  async createMessage(data: newMessageObject) {
    return await this.collection.create(data);
  }
  async updateMessage(
    query: FilterQuery<MessageObject>,
    update: UpdateQuery<MessageObject>
  ) {
    return await this.collection.updateOne(query, update);
  }
}
