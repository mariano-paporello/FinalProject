import { Request, Response } from "express";
import {
  deleteProduct,
  getProducts,
  newProductToDB,
  updateProduct,
} from "../api/products";
import {
  ProductObject,
} from "../models/products/products.interface";
import { logger } from "../utils/loggers";

export const productsGetController = async (req: Request, res: Response) => {
  try {
    if (req.params.id && req.params.id.length > 1) {
      const productoBuscado = await getProducts(req.params.id);
      if (productoBuscado !== null && productoBuscado) {
        res.json({
          productoBuscado: productoBuscado,
        });
      } else if (!productoBuscado) {
        res.status(400).json({
          Error: "The ID received is incorrect (it needs to have 24 characters) or doesn´t exist.",
        });
      } else {
        logger.warning("EL ID DEL PRODUCTO BUSCADO NO EXISTE");
        res.status(400).json({
          Error: "The ID of the product wasn't found.",
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
          Error: "It couldn't find any products with that category.",
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
        Error: "User isn't admin",
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
      msg: `Modification  done to product with ID: ${id}`,
    });
  } else {
    res.status(400).json({
      Error: "Modification failed",
    });
  }
};

export const deleteAProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteResult = await deleteProduct(id);
  if(id.length !== 24)
    res.status(400).json({
      error: `Error when trying to delete the product with ID: ${id}. Because the id hasn't got 24 caracters.`});
  if (
    deleteResult &&
    deleteResult.acknowledged &&
    deleteResult.deletedCount > 0
  ) {
    res.status(200).json({
      msg: `Product with ID: ${id}. Was deleted`,
    });
  } else {
    logger.error(
      "It wasn't possible to delete the product because the ID was entered wrong"
    );
    res.status(400).json({
      error: `Error when trying to delete the product with ID: ${id}. It doesn't exist.`,
    });
  }
};
