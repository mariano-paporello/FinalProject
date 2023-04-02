import { CartObject } from "../cart.interface";

class ProductsDTO {
  private userId;
  private cart;
  private id;
  constructor(cartOfUser: CartObject) {
    this.id = cartOfUser._id;
    this.userId = cartOfUser.userId;
    this.cart = cartOfUser.cart;
  }
}

export function asDto(cart: CartObject[] | CartObject) {
  if (Array.isArray(cart))
    return cart.map((element) => new ProductsDTO(element));
  else return new ProductsDTO(cart);
}
