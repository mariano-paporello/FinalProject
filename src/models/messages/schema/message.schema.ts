import mongoose from "mongoose"
import { MessageObject } from "../messages.interface"

export const messagesSchema = new mongoose.Schema<MessageObject>(
    {
        userId: {type:String, require: true},
        type: {type: String, require: true },
        message: {type: String, require: true}
},
{timestamps: true}
)