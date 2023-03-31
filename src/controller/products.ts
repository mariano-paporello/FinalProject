import { Request, Response } from "express";
import {
  deleteProduct,
  getProducts,
  newProductToDB,
  updateProduct,
} from "../api/products";
import {
  DocumentMongoGet,
  ProductObject,
} from "../models/products/products.interface";
import { repositoryProduct } from "../models/products/products.repository";

import { logger } from "../utils/loggers";

export const productsGetController = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const productoBuscado = await getProducts(req.params.id);
      if (productoBuscado !== null && productoBuscado) {
        res.json({
          productoBuscado: productoBuscado,
        });
      } else if (!productoBuscado) {
        res.status(400).json({
          Error: "ID ingresado es incorrecto. Debe de tener 24 caracteres",
        });
      } else {
        logger.warning("EL ID DEL PRODUCTO BUSCADO NO EXISTE");
        res.status(400).json({
          Error: "ID del producto no fue encontrado",
        });
      }
    } else if (req.params.category) {
      const productosBuscados = await getProducts(
        undefined,
        req.params.category
      );
      if (
        productosBuscados &&
        Array.isArray(productosBuscados) &&
        productosBuscados.length >= 1
      ) {
        res.json({
          productosBuscados: productosBuscados,
        });
      } else {
        res.status(400).json({
          Error: "No se pudo encontrar ningun producto con esa categoria",
        });
      }
    } else {
      res.status(200).json({
        productos: await getProducts(),
      });
    }
  } catch (err) {
    logger.error("Error in productsController: ", err);
  }
};
export const newProductController = async (req: Request, res: Response) => {
  try {
    if (req.session.admin) {
      const productCreated = await newProductToDB(req.body);
      res.status(200).json({
        productoCreado: productCreated,
      });
    } else {
      res.status(404).json({
        Error: "User no es administrador",
      });
    }
  } catch (error) {
    logger.error(`Error in productsController: ${error}`);
    res.json({
      error: error,
    });
  }
};

export const modifyAProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: ProductObject = req.body;
  const changedProduct = await updateProduct({ _id: id }, { $set: data });
  if (changedProduct.acknowledged && changedProduct.modifiedCount > 0) {
    res.status(200).json({
      msg: "Modificacion realizada de forma correcta",
    });
  } else {
    res.status(400).json({
      Error: "Modificacion falló",
    });
  }
};

export const deleteAProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteResult = await deleteProduct(id);
  if(id.length !== 24)
    res.status(400).json({
      error: `Error al intentar borrar el producto con id: ${id}. Debido a que el mismo no es un id posible (minimo 24 caracteres)`,
    });
  if (
    deleteResult &&
    deleteResult.acknowledged &&
    deleteResult.deletedCount > 0
  ) {
    res.status(200).json({
      msg: `Producto con id: ${id}. Fue borrado`,
    });
  } else {
    logger.error(
      "No se a podido borrar el producto debido a un mal ingresado id"
    );
    res.status(400).json({
      error: `Error al intentar borrar el producto con id: ${id}. Este no existe.`,
    });
  }
};
