import { producto } from "../../../Public/types"
import productosModels from "../../models/products"
import {logger} from "../../utils/loggers"
// class productController{
//    async list(){
//     try{
//         const getAll = await productosModels.find({})
//         return getAll
//     }catch(err){
//         return logger.error(err)
//     }}


//    async newProduct(data){
//     try{
//         const nuevoProducto : producto = {
//             ...data
//         }
//        const res = await productosModels.create(nuevoProducto)
//         return res
//    }catch(err){
//     return logger.error(err)
//    }    
//     }
// }

export const productsController = async (req, res)=>{
    try{
        productosModels.find({}).then(productos => {
            res.render("products", {
                productos: productos.map(productoIndv => productoIndv.toJSON()),
                data: req.session.dataUser
            })
        })
    }catch(err){
        logger.error("Error: ",err)
    }
    
} 
// const productsMethods = new productController()

// export default  productsMethods