import { Router } from "express";
import { logger } from "../utils/loggers";
import session from 'express-session';
import { storeOptions } from "../api/storeOptions";
import cookieParser from "cookie-parser";
import { getAllDenorm, getAllNorm } from "../Controllers/otherControllers/normalizeController";
import { crear5Productos } from "../Controllers/otherControllers/testController";
import minimist from "minimist"
import path from "path"
import {fork} from "child_process"
import os from "os"


const othersRoute:Router = Router()

othersRoute.use(cookieParser());
othersRoute.use(session(storeOptions));

const controllerPath = path.resolve(__dirname, '../Controllers/randomsController.ts')
const args = minimist(process.argv)

othersRoute.get("/normalize", async(req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.json(await getAllNorm())
})
othersRoute.get("/denormalize", async(req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.json(await getAllDenorm())
})
othersRoute.get("/test-fake-products", async(req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.json({ProductosFake: await crear5Productos()})
})
othersRoute.get("/info", (req, res) => {
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

othersRoute.get("/randoms", (req, res)=>{
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







export default othersRoute