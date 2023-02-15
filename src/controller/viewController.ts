import { repositoryProduct } from "../models/products/products.repository"
import { logger } from "../utils/loggers"



export const homeview =(req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url ) 
    repositoryProduct.getAllProd().then((productos:any)  => {
                    res.json({
                        data: req.session.dataUser,
                        productosDisponibles: productos
                    })
            })
        }