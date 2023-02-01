import CartModel from "../models/cart"

export const cart = async(req, res)=>{
    // await getCarrito(req, res).then(producto =>{
    //     res.render("Cart",{
    //         data: req.session.dataUser,
    //         carrito: producto
    //     })
    // })

    CartModel.find({gmail: req.session.gmail}).then(productos => {
        console.log(productos)
        res.render("Cart", {
        carrito: productos.map(productoIndv => productoIndv.toJSON()),
        data: req.session.dataUser
    })
})

    
}



