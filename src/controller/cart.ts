import {emptyCartCreator, checkCart, getCartByQuery, sendTheCartWithEmail, sendTheCartWithWhatsApp, getCartByUserId, updateCart } from "../api/cart"
import { logger } from "../utils/loggers"
import {finalProductForm, ProductToView, User} from "../../Public/types"
import { Request, Response } from "express"
import { ProductObject } from "../models/products/products.interface"
import { CartObject, DocumentMongoGet, productInCartObject } from "../models/cart/cart.interface"
import { getProductById } from "../api/products"


export const cart = async(req:Request, res:Response)=>{
    if(req.session.dataUser){
        const productsInCart = await cartGet(req.session.dataUser._id)
        if(productsInCart){
    res.json({
        carrito: productsInCart
    })
    }
}
}


const cartGet = async(id:string): Promise<finalProductForm | undefined> =>{
    try{
        
        const cartOfUser = await getCartByQuery({userId:id})
        if(cartOfUser !== null){
            const products = await cartTransformer(cartOfUser)
            return products
        }
    }catch (error) {
        logger.error("Error: ", error)
    }
    
}

const cartTransformer =async (cartOfUser: CartObject): Promise<finalProductForm> => {
    const productsInCart = await Promise.all(cartOfUser.cart.map(async product =>{
        const producto = await getProduct(product)
        return producto
    }))
    const FinalProductForm: finalProductForm= await Promise.all( productsInCart.map(async (productFromProducts:any)=>{
        if(productFromProducts !== undefined){
            return modifyTheProductToLookGood(await productFromProducts, cartOfUser)
        }
    }))
    return FinalProductForm
}

const getProduct =async (product:productInCartObject): Promise<ProductObject | undefined> => {
    const productFound = await getProductById(product.productId)
    if(productFound !== null){
        return productFound
    }
}

const modifyTheProductToLookGood = async(productFromProducts: ProductObject  , cartOfUser: CartObject)=>{
    if(productFromProducts){
        const {title, price, thumbnail}= productFromProducts
    const productInCart = await Promise.all(cartOfUser.cart.filter((productInCart:productInCartObject)=>productFromProducts.id===productInCart.productId))
    const theProductInTheCart = {title, price: price*productInCart[0].amount, thumbnail, amount: productInCart[0].amount}
    return theProductInTheCart
    }
}



export const cartSender = async(req:Request, res:Response)=>{
    try {
        const dataUser = req.session.dataUser
        if(dataUser){
            const productsInCart:finalProductForm | undefined = await cartGet(dataUser._id)
            if(productsInCart!== undefined){
                const productsHtml = productsInCart?.map(product=>{
                    if(product!==undefined)
                    return `<li>Producto:<ul><li>Nombre del Producto:${product.title}</li><li>Precio total: $${product.price}</li><li>Imagen del producto: <img src=${product.thumbnail} alt="Image Not Found"></li><li>Cantidad del producto: ${product.amount}</li></ul></li>`}
                    ) 
                const content = `<div><h1>Productos:</h1><ul>${productsHtml}</ul></div>`
                const message = `Nuevo pedido de ${dataUser.username}. Email: ${dataUser.gmail}.
                    Productos: 
                    ${productsInCart.map((product) =>{ product !== undefined? `-${product.title}.
                    -${product.price}`: 'there are no products'})}`
                const done:unknown =  await cartMsgSender(dataUser, `Nuevo pedido de ${dataUser.username}. Email: ${dataUser.gmail}`, content, message)
                if(done){
                    res.json({
                        msg: "TODO PERFECTO EMAIL ENVIADO"
                    })
                }
            }
        
        }
    } catch (err) {
        logger.error("Error: ", err)
    }
}

 const cartMsgSender = async(dataUser:User, subjectEmail:string, contentEmail:string, messageWhatsApp: string)=>{
    try{
        if(subjectEmail&&contentEmail&&messageWhatsApp){
            const enviarEmail = await sendTheCartWithEmail(dataUser.gmail, subjectEmail, contentEmail)
        
        const sendWhatsAppResponse = await sendTheCartWithWhatsApp(`+${dataUser.phoneNumber}`, messageWhatsApp)
        if(enviarEmail && sendWhatsAppResponse){
            return true
        }
        }
    }catch(error){
        logger.error("Error: ", error)
    }
}

export const createCartOfUser = async(dataUser:User) => await emptyCartCreator(dataUser._id) 


export const ifCartExist = async(dataUser:User) =>{
    const cartFound:unknown  = await checkCart(dataUser._id)
   return cartFound ? null : createCartOfUser(dataUser)
}


export const productToCartController = async(req:Request, res:Response)=>{
    try{
        const product  = await getProductById(req.params.id)
        console.log("producto loll ", product)
        if(req.session.dataUser && product !== undefined && product !== null){
            await añadirProdACart(req.session.dataUser, product)
        }
        res.json({
            msg:"👍 👍 👍 👍 TODO BIENN ",
        })
    }catch(err){
        logger.error("Error in productsController: ",err)
    }
}


const añadirProdACart = async (dataUser:User,product:ProductObject | DocumentMongoGet)=>{
    if(product){
        const userHasCart:CartObject | null = await getCartByUserId({userId: dataUser._id})
        if(userHasCart!== null){
            const index: number = await getIndex(userHasCart, product)
            
            if(userHasCart && index != -1 && index || index===0){
               return await addProduct(userHasCart, index, dataUser)
            }else if(userHasCart && index === -1){
                return await addQuantityInCart(product,  dataUser)
            }
        }
    }
    return product
}
const getIndex = async (cartOfUser:any, product:ProductObject | DocumentMongoGet)=>{
    const index: number = cartOfUser.cart.findIndex( (obj:productInCartObject) => {
        if(product){
        return obj.productId === product.id
        }
    })
    return index
}
const addProduct = async (cartOfUser:any, index:number, dataUser:User) =>{
    try{
        const newCart: any = cartOfUser.cart
        newCart[index] = {productId:newCart[index].productId, amount: newCart[index].amount+1}  
        const addAmountToaProduct = await updateCart({userId: dataUser._id},{$set:{cart:newCart}})
        return true
    }catch(err){
        logger.error("Error: ", err)
    }
}
const addQuantityInCart = async (product: ProductObject | DocumentMongoGet, dataUser:User)=>{
    try{
        if(product){
            const addOneProductToExistingCart = await updateCart({userId:dataUser._id},{$push: {cart:{productId: product._id, amount:1}}})
            return true 
        }
    }catch(err){
        logger.error("Error: ", err)
    }
}
