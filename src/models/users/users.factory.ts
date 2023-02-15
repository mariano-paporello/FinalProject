import minimist from "minimist"
import DaoMongoDB from "./daos/mongodb";
import usersSchema  from "./schema/users.schema";


let dao;
let argv = process.argv[2];
console.log(argv)

const args = minimist(process.argv)

switch(args.database.toLowerCase()) {
    // agregar mÁs DB
    case 'mongo':
        dao = new DaoMongoDB('users', usersSchema);
        dao.initMongoDB();
        console.log("BASE DE DATOS MONGOATLAS")
        break;
    default:
        console.log("ERRORR", args.database);
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