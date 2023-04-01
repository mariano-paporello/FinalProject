import {
  emptyCartCreator,
  checkCart,
  getCartByQuery,
  getCartByUserId,
  updateCart,
  emptyCart,
} from "../api/cart";
import { logger } from "../utils/loggers";
import { finalProductForm, singlePorduct, User } from "../../public/types";
import { Request, Response } from "express";
import { ProductObject } from "../models/products/products.interface";
import {
  CartObject,
  DocumentMongoGet,
  productInCartObject,
} from "../models/cart/cart.interface";
import { getProductById, updateProduct } from "../api/products";
import { CreateOrder } from "./orders";

export const cart = async (req: Request, res: Response) => {
  if (req.session.dataUser) {
    const productsInCart = await cartGet(req.session.dataUser._id);
    if (productsInCart) {
      res.json({
        carrito: productsInCart,
      });
    }
  }
};

export const cartGet = async (
  id: string
): Promise<finalProductForm | undefined> => {
  try {
    const cartOfUser = await getCartByQuery({ userId: id });
    if (cartOfUser !== null) {
      const products = await cartTransformer(cartOfUser);
      return products;
    }
  } catch (error) {
    logger.error("Error: ", error);
  }
};

const cartTransformer = async (
  cartOfUser: CartObject
): Promise<finalProductForm> => {
  const productsInCart = await Promise.all(
    cartOfUser.cart.map(async (product) => {
      const producto = await getProduct(product);
      return producto;
    })
  );
  const FinalProductForm: finalProductForm = await Promise.all(
    productsInCart.map(async (productFromProducts: any) => {
      if (productFromProducts !== undefined) {
        return modifyTheProductToLookGood(
          await productFromProducts,
          cartOfUser
        );
      }
    })
  );
  return FinalProductForm;
};

const getProduct = async (
  product: productInCartObject
): Promise<ProductObject | undefined> => {
  const productFound = await getProductById(product.productId);
  if (productFound !== null) {
    return productFound;
  }
};

const modifyTheProductToLookGood = async (
  productFromProducts: ProductObject,
  cartOfUser: CartObject
) => {
  if (productFromProducts) {
    const { title, price, thumbnail } = productFromProducts;
    const id = productFromProducts.id;
    const productInCart = await Promise.all(
      cartOfUser.cart.filter(
        (productInCart: productInCartObject) =>
          productFromProducts.id === productInCart.productId
      )
    );
    const theProductInTheCart = {
      id,
      title,
      priceUnit: price,
      price: price * productInCart[0].amount,
      thumbnail,
      amount: productInCart[0].amount,
    };
    return theProductInTheCart;
  }
};

export const cartSender = async (req: Request, res: Response) => {
  try {
    const dataUser = req.session.dataUser;
    if (dataUser) {
      const productsInCart: finalProductForm | undefined = await cartGet(
        dataUser._id
      );
      if (productsInCart !== undefined) {
        const order = await CreateOrder(productsInCart, req.session.dataUser);
        if (order) {
          await emptyCart(dataUser._id);
          res.status(201).json({
            order: order,
          });
        } else {
          logger.error("Error: Error al crear orden de compra");
          res.status(400).json({
            error: "Error when creating the order.",
          });
        }
      }
    }
  } catch (err) {
    logger.error("Error: ", err);
    res.status(400).json({
      error: err,
    });
  }
};

export const createCartOfUser = async (dataUser: User) =>
  await emptyCartCreator(dataUser._id);

export const ifCartExist = async (dataUser: User) => {
  const cartFound: unknown = await checkCart(dataUser._id);
  return cartFound ? null : createCartOfUser(dataUser);
};

export const productToCartController = async (req: Request, res: Response) => {
  try {
    if(req.params.id.length === 24){
    const product = await getProductById(req.params.id);
    if (req.session.dataUser && product !== undefined && product !== null) {
      const productAñadido = await añadirProdACart(
        req.session.dataUser,
        product
      );
      if (productAñadido) {
        res.status(200).json({
          msg: "Product added successfully",
        });
      }
      else{
        res.status(400).json({
          Error: "Error when creating the product"
        })
      }
    }}
    else{
      res.status(400).json({
        Error: "Id  entered is invalid"
      })
    }
  } catch (err) {
    logger.error("Error in productsController: ", err);
  }
};

const añadirProdACart = async (
  dataUser: User,
  product: ProductObject | DocumentMongoGet
) => {
  if (product) {
    const userHasCart: CartObject | null = await getCartByUserId({
      userId: dataUser._id,
    });
    if (userHasCart !== null) {
      const index: number = await getIndex(userHasCart, product);

      if ((userHasCart && index != -1 && index) || index === 0) {
        return await addProduct(userHasCart, index, dataUser);
      } else if (userHasCart && index === -1) {
        return await addQuantityInCart(product, dataUser);
      }
    }
  }
  return product;
};
const getIndex = async (
  cartOfUser: any,
  product: ProductObject | DocumentMongoGet
) => {
  const index: number = cartOfUser.cart.findIndex(
    (obj: productInCartObject) => {
      if (product) {
        return obj.productId === product.id;
      }
    }
  );
  return index;
};
const addProduct = async (cartOfUser: any, index: number, dataUser: User) => {
  try {
    const newCart: any = cartOfUser.cart;
    newCart[index] = {
      productId: newCart[index].productId,
      amount: newCart[index].amount + 1,
    };
    const addAmountToaProduct = await updateCart(
      { userId: dataUser._id },
      { $set: { cart: newCart } }
    );
    return addAmountToaProduct;
  } catch (err) {
    logger.error("Error: ", err);
  }
};
const addQuantityInCart = async (
  product: ProductObject | DocumentMongoGet,
  dataUser: User
) => {
  try {
    if (product) {
      const addOneProductToExistingCart = await updateCart(
        { userId: dataUser._id },
        { $push: { cart: { productId: product._id, amount: 1 } } }
      );
      return addOneProductToExistingCart;
    }
  } catch (err) {
    logger.error("Error: ", err);
  }
};

export const deleteCartProducts = async (req: Request, res: Response) => {
  try {
    const idOfUser = req.session.dataUser?._id;
    const { id, cuantity } = req.body;

    if (idOfUser && id.length === 24 && cuantity) {
      const carrito = await cartGet(idOfUser);
      if (carrito) {
        const index = carrito.findIndex((element: singlePorduct) => {
          return element.id === id;
        });

        if ((index != -1 && index) || index === 0) {
          const numberOfAmountOfThatProduct = carrito[index]?.amount;
          const filterCarrito = carrito
            .map((element: singlePorduct) => {
              const productObj = {
                productId: element.id !== id ? element.id : false,
                amount: element.amount,
              };
              if (productObj.productId) {
                return productObj;
              }
            })
            .filter((element: any) => element !== undefined);

          if (
            numberOfAmountOfThatProduct &&
            Number(cuantity) >= numberOfAmountOfThatProduct
          ) {
            const newCart = await updateCart(
              { userId: idOfUser },
              { $set: { cart: filterCarrito } }
            );

            if (newCart.acknowledged && newCart.modifiedCount > 0) {
              res.status(200).json({
                msg: "Product in cart was deleted successfully.",
              });
            }
          } else if (
            numberOfAmountOfThatProduct &&
            numberOfAmountOfThatProduct > Number(cuantity)
          ) {
            const product: any = {
              productId: carrito[index]?.id,
              amount: Number(carrito[index]?.amount) - cuantity,
            };
            filterCarrito.push(product);
            const newCart = await updateCart(
              { userId: idOfUser },
              { $set: { cart: filterCarrito } }
            );

            if (newCart.acknowledged && newCart.modifiedCount > 0) {
              res.status(200).json({
                msg: "Product amount in cart was modify successfully.",
              });
            }
          } else {
            res.status(400).json({
              Error: "Error when checking the amount that want to be deleted.",
            });
          }
        } else {
          res.status(400).json({
            Error: "Product not found in the cart",
          });
        }
      }
    }else{
      res.status(400).json({
        Error: "The amount or ID was not entered correctly"
      })
    }
  } catch (error) {
    logger.error(error);
  }
};
