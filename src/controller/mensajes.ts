import menssagesMetodos from "../models/messages"
import {logger} from "../utils/loggers"

class mensajeController{

    async list(){
     try{
         const getAll = await menssagesMetodos.find({})
         return getAll
     }catch(err){
         return logger.error(err)
     }}
 
 
    async nuevomensaje(data){
        try{
            const dataCompleta = {
                author:{
                    id: data.id,
                    nombre: data.author.nombre,
                    apellido: data.author.apellido,
                    edad: Number(data.author.edad),
                    alias: data.author.alias,
                    avatar: data.author.avatar,
                    },
                text: data.text ,
            }
           const res=  await menssagesMetodos.create(dataCompleta)
            return res
        }catch(err){
           return logger.error(err)
        }  
     }
 }
 const menssageController = new mensajeController()
 export default menssageController