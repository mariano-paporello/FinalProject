import { FilterQuery, UpdateQuery } from "mongoose";
import { getDao } from "./mesages.factory";
import { newMessageObject, MessageObject } from "./messages.interface";

class MessageRepository {
  private dao;
  constructor() {
    this.dao = getDao();
  }

  async getAllTheMessagesOfThisUser(id: string) {
    const ordersOfUser = await this.dao.getAllTheMessagesOfThisUser(id);
    return ordersOfUser;
  }

  async createMessage(data: newMessageObject) {
    const createdOrder = await this.dao.createMessage(data);
    return createdOrder;
  }

  async updateMessage(
    query: FilterQuery<MessageObject>,
    update: UpdateQuery<MessageObject>
  ) {
    const updateResult = await this.dao.updateMessage(query, update);
    return updateResult;
  }
}
export const repositoryMessage = new MessageRepository();
