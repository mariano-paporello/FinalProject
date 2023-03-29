import { repositoryMessage } from "../models/messages/messages.respository"

export const getMessages = async(id: string)=>{
    return await repositoryMessage.getAllTheMessagesOfThisUser(id)
}