import { FilterQuery, UpdateQuery } from "mongoose";
import {
  AddProductObject,
  ProductObject,
} from "../models/products/products.interface";
import { repositoryProduct } from "../models/products/products.repository";
import { logger } from "../utils/loggers";

export const getProductById = async (id: string) => {
  return await repositoryProduct.getProductById(id);
};

export const getProducts = async (id?: string, category?: string) => {
  if (id && id.length === 24) return await repositoryProduct.getProductById(id);
  else if (id && id !== null) {
    logger.warn("WARNING ID INGRESADO NO ES IGUAL A 24 CARACTERES");
    return false;
  } else if (category) {
    return await repositoryProduct.getProductsByQuery({ category: category });
  } else {
    return await repositoryProduct.getAllProd();
  }
};

export const deleteProduct = async (id: string) => {
  if (id && id.length === 24) {
    return await repositoryProduct.deleteById(id);
  } else {
    logger.warn("ID INGRESADO NO TIENE 24 CARACTERES");
    return false;
  }
};

export const updateProduct = async (
  query: FilterQuery<ProductObject>,
  update: UpdateQuery<ProductObject>
) => {
  return await repositoryProduct.updateProduct(query, update);
};

export const newProductToDB = async (data: AddProductObject) => {
  return await repositoryProduct.postProductToProducts(data);
};
