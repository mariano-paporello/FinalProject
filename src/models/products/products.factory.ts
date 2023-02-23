import { DaoMongoDB } from "./daos/mongodb";
import { productoSchema } from "./schema/products.schema";
import minimist from "minimist"
import { logger } from "../../utils/loggers";

let dao;
const args = minimist(process.argv)


switch(args.database.toLowerCase()) {
    // agregar mÁs DB
    case 'mongo':
        if(args.testing){
            dao = new DaoMongoDB("testing-products",productoSchema)
            dao.initMongoDB();
            break;
        }else{
            dao = new DaoMongoDB('productos', productoSchema);
            dao.initMongoDB();
            break;
        }
            
    default:
        logger.error("Error en factory al seleccionar Db")
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

export async function postProductToProducts(data){
    return await dao.postProductToProducts(data);
}

export async function postProductToCart(data) {
    return await dao.postProductToCart(data);
};

export async function deleteAll(){
    return await dao.deleteAll()
}

export function getDao(){
    return dao;
};