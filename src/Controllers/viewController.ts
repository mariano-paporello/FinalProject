import ProductoModel from "../models/products"
import menssagesModel from "../models/messages"
import { logger } from "../utils/loggers"



export const homeview =(req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url ) 
            ProductoModel.find({}).then(productos => {
                menssagesModel.find({}).then(mensajes => {
                    res.render('main', {
                        productos: productos.map(productoIndv => productoIndv.toJSON()),
                        mensajes: mensajes.map(mensajeIndv => mensajeIndv.toJSON()),
                        data: req.session.dataUser
                    })
                })
            })
        } 
