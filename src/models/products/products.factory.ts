import { DaoMongoDB } from "./daos/mongodb";
import { productoSchema } from "./schema/products.schema";
import minimist from "minimist"
import { logger } from "../../utils/loggers";
import { AddProductObject } from "./products.interface";

let dao : DaoMongoDB;
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
        dao = new DaoMongoDB('productos', productoSchema);
        dao.initMongoDB();
        break;
};

export function getDao(){
    return dao;
};