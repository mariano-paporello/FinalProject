import { newMessageObject } from "../models/messages/messages.interface";
import { repositoryMessage } from "../models/messages/messages.respository";

export const getMessages = async (id: string) => {
  return await repositoryMessage.getAllTheMessagesOfThisUser(id);
};

export const createMessage = async (newMessage: newMessageObject) => {
  return await repositoryMessage.createMessage(newMessage);
};
