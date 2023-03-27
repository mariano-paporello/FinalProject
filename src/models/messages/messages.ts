import mongoose from "mongoose"

const menssages= 'menssages'

const messagesSchema = new mongoose.Schema(
    {
    author:{
    username: { type: String, require: true},
    email: {type:String, require:true},
    age: { type: Number, require: true, max: 100 },
    image: { type: String, required: true },
    },
    text: {type: String, require: true}
},
{timestamps: true}
)

const menssagesModel = mongoose.model(menssages, messagesSchema)
export default menssagesModel