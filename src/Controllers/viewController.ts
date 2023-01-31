import ProductoModel from "../models/products"
import menssagesModel from "../models/messages"


export const homeview =(req, res)=>{
    console.log(req.session)
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
