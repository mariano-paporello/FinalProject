import {productoModel} from "../models/products"
import { logger } from "../utils/loggers"



export const homeview =(req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url ) 
    productoModel.getAllProd().then(productos => {
                    res.json({
                        data: req.session.dataUser,
                        productosDisponibles: productos.map(productoIndv => productoIndv.toJSON())
                       
                    })
            })
        }