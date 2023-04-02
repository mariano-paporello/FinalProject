import { getDao } from "./cart.factory";
import {
  CreateCartObject
} from "./cart.interface";
// import { asDto } from "./dto/cart-dto";

class cartRepository {
  private dao;
  constructor() {
    this.dao = getDao();
  }

  async getCartById(id: string) {
    const cart = await this.dao.getCartById(id);
    const cartDto = cart;
    return cartDto;
  }

  async getCartByQuery(query: unknown) {
    const cart = await this.dao.getCartByQuery(query);
    const cartDto = cart;
    return cartDto;
  }

  async createCart(data: CreateCartObject) {
    const cart = await this.dao.createCart(data);
    const cartDto = cart;
    return cartDto;
  }

  async updateCart(query: unknown, update: unknown) {
    const cart = await this.dao.updateCart(query, update);
    const cartDto = cart;
    return cartDto;
  }
}
export const repositoryCart = new cartRepository();
