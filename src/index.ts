const server = require('./services/server')
const initWsServer = require("./services/sockets")
import minimist from "minimist"
import os from "os"
import cluster from "cluster"
import config from "./config"
import { logger } from "./utils/loggers"

const args = minimist(process.argv)

const port = args.port || config.PORT
const numCPUs = os.cpus().length


initWsServer(server);

if (args.modo === "CLUSTER" && cluster.isPrimary ) {
    logger.info("💡💡💡 TIPO CLUSTER")
    for (let i=0;i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code) => {
        logger.info(`Worker ${worker.process.pid} with code ${code}`);
        cluster.fork();
    })
}else{
    logger.info("💩💩💩 TIPO FORK")
        server.listen(port, () => {
            logger.info(`Server is up in ${port}`);
        });
}

server.on('error', (err) => {
    logger.error('SERVER ERROR: ', err);
  });
  
  // Log on exit
  process.on('exit', (code) => {
    logger.error(`Exit ==> El proceso termino con codigo ${code}\n\n`);
  });

  export default  server