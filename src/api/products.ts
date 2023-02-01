import CartModel from "../models/cart";
import ProductoModel from "../models/products";

export const findProduct = async (_id)=>{
    if(_id){
        const product = await ProductoModel.findById({_id})
        return product
    }
}
const searchUserInCart = async (gmail, phone, product)=>{
    console.log(product)
     const checkAndUpdate = await CartModel.findOneAndUpdate(
        {title: product.title},
        {
            $inc:{amount: 100}
        }
        )
        console.log(checkAndUpdate)
     if  (checkAndUpdate){
    
            console.log("LO LOGRAMOSSS")
    }else{
        const pushNewProduct= await CartModel.updateOne({
            $and:[{gmail:gmail},{phoneNumber:phone}]
        },
        {
           $push:{cart: {...product, amount:1}} 
        })
        console.log(pushNewProduct)
    }
}
    
export const añadirProdACart = async (dataUser,product)=>{
    if(product){
        searchUserInCart(dataUser.gmail, dataUser.phoneNumber, product)
    //     await CartModel.create({
    //         user:dataUser,
    //         cart:[
    //                 {
    //                 title: product.title,
    //                 price: product.price,
    //                 thumbnail: product.thumbnail,
    //                 amount: 1,
    //                 category: product.category
    //                 }
    //         ]
    //     }   
    // )
    }
    return product
}