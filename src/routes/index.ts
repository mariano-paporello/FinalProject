import {Router} from "express"
import {getAllNorm, getAllDenorm} from "../Controllers/normalizeController"
import { crear5Productos } from "../Controllers/testController";
import {fork} from "child_process"
import {logger} from "../middlewares/loggers"
import os from "os"
import minimist from 'minimist'


import path from "path"


const sideRoute: Router = Router();

const controllerPath = path.resolve(__dirname, '../Controllers/randomsController.ts')
const args = minimist(process.argv)

sideRoute.get("/normalize", async(req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.json(await getAllNorm())
})
sideRoute.get("/denormalize", async(req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.json(await getAllDenorm())
})
sideRoute.get("/test-fake-products", async(req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.json({ProductosFake: await crear5Productos()})
})
sideRoute.get("/info", (req, res) => {
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.json({
        "Directorio actual de trabajo": process.cwd(),
        "id ID Del proceso actual": process.pid,
        "Version de NodeJs corriendo": process.version,
        "Titulo del proceso": process.title,
        "Sistema Operativo": process.platform,   
        "Uso de memoria": JSON.stringify(process.memoryUsage()),
        "Cantidad de procesadores": os.cpus().length,
        "port": args.port
    })

})

sideRoute.get("/randoms", (req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    let cantidad
    if(req.query.cant){(cantidad = Number(req.query.cant))}else{ 100000000};
    const calculo = fork(controllerPath)
    calculo.send(JSON.stringify({msg:"start", cantidad:cantidad}))
    calculo.on('message', (result)=>{
        res.json({
            Resultado: result
        })
    })
    
})


export default sideRoute;