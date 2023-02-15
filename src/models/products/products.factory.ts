import { DaoMongoDB } from "./daos/mongodb";
import { productoSchema } from "./schema/products.schema";
import minimist from "minimist"

let dao;
const args = minimist(process.argv)


switch(args.database.toLowerCase()) {
    // agregar mÁs DB
    case 'mongo':
        dao = new DaoMongoDB('productos', productoSchema);
        dao.initMongoDB();
        console.log("BASE DE DATOS MONGOATLAS")
        break;
    default:
        console.log("ERRORR");
        break;
};

export async function getAllProd() {
    return await dao.getAllProd();
};

export async function getProductById(id) {
    return await dao.getProductById(id);
};

export async function getProductByQuery(query) {
    return await dao.getProductByQuery(query);
};

export async function postProductToCart(data) {
    return await dao.postProductToCart(data);
};

export function getDao(){
    return dao;
};