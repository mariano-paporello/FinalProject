import { DaoMongoDB } from "./daos/mongodb";
import minimist from "minimist"
import { logger } from "../../utils/loggers";
import { messagesSchema } from "./schema/message.schema";

let dao : DaoMongoDB;
const args = minimist(process.argv)
if(args.database){
const database = args.database.toLowerCase()
switch(database) {
    case 'mongo':
        if(args){
            dao = new DaoMongoDB('menssages', messagesSchema);
            dao.initMongoDB();
            break;
        }
            
    default:
        logger.info(" inicinado con la default")
        dao = new DaoMongoDB('menssages', messagesSchema);
        dao.initMongoDB();
        break;
}}else{
    dao = new DaoMongoDB('menssages', messagesSchema);
    dao.initMongoDB();
}

export function getDao(){
    return dao;
};