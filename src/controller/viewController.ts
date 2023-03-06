import { Request, Response } from "express"
import { repositoryProduct } from "../models/products/products.repository"
import { logger } from "../utils/loggers"



export const homeview =(req:Request, res:Response)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url ) 
    repositoryProduct.getAllProd().then((productos:any)  => {
                    res.json({
                        data: req.session.dataUser,
                        productosDisponibles: productos
                    })
            })
        }