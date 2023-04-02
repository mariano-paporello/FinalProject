import { ProductObject } from "../products.interface";

class ProductsDTO {
  private id;
  private title;
  private price;
  private stock;
  private thumbnail;
  constructor(product: ProductObject) {
    this.id = product._id;
    this.title = product.title;
    this.price = product.price;
    this.thumbnail = product.thumbnail;
    this.stock = product.stock;
  }
}

export function asDto(products: ProductObject[] | ProductObject) {
  if (Array.isArray(products))
    return products.map((element) => new ProductsDTO(element));
  else return new ProductsDTO(products);
}
