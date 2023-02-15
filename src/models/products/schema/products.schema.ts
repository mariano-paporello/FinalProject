import mongoose from "mongoose"


export const productoSchema= new mongoose.Schema(
    {
        title: {type: String, require:true, max: 100},
        price: { type: Number, require: true},
        thumbnail: { type: String, require: true, max: 100 },
        stock: { type: Number, require: true},
        category: { type: String, require:false}

    },
    {timestamps: true}
)