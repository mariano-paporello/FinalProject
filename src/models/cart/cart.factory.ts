import { DaoMongoDB } from "./daos/mongodb";
import minimist from "minimist"
import { cartSchema } from "./schema/cart.schema";
import { logger } from "../../utils/loggers";

let dao;
const args = minimist(process.argv)


switch(args.database.toLowerCase()) {
    // agregar mÁs DB
    case 'mongo':
        dao = new DaoMongoDB('carts', cartSchema);
        dao.initMongoDB();
        break;
    default:
        logger.error("Error al querer seleccionar DB en Carrito")
        break;
};

export async function getCartById(id) {
    return await dao.getCartById(id);
};

export async function getCartByQuery(query) {
    return await dao.getProductByQuery(query);
};

export async function createCart(data) {
    return await dao.createCart(data);
};

export async function updateCart(query, update) {
    return await dao.updateCart(query, update);
};

export function getDao(){
    return dao;
};