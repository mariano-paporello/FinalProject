import minimist from "minimist"
import { logger } from "../../utils/loggers";
import DaoMongoDB from "./daos/mongodb";
import usersSchema  from "./schema/users.schema";


let dao;

const args = minimist(process.argv)
switch(args.database.toLowerCase()) {
    // agregar mÁs DB
    case 'mongo':
        dao = new DaoMongoDB('users', usersSchema);
        dao.initMongoDB();
        break;
    default:
        logger.error("Error al querer seleccionar DB en users")
        break;
};

export async function findById(id) {
    return await dao.findById(id);
};

export async function find(username) {
    return await dao.find(username);
};

export async function logIn(username:string, password:string) {
    return await dao.logIn(username, password);
};

export async function singUp(data) {
    return await dao.singUp(data);
};

export function getDao(){
    return dao;
};