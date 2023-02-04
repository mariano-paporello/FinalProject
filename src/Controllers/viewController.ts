import ProductoModel from "../models/products"
import menssagesModel from "../models/messages"
import { logger } from "../utils/loggers"



export const homeview =(req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url ) 
            ProductoModel.find({}).then(productos => {
                    res.json({
                        data: req.session.dataUser,
                        productosDisponibles: productos.map(productoIndv => productoIndv.toJSON())
                       
                    })
            })
        } 
