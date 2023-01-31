import { logged } from "../routes/mainRoute"

export const isLogged = (req, res, next)=>{
if(logged&& logged.islogged){
next()
}
else{
    res.redirect("/register")
    // res.status(400).json({
    //     Error: "Not Logged"
    // })
}
}
 export const loggedIsNotDestroyed =(req, res, next)=>{
    if(logged && !logged.isDestroyed){
        next()
    }else{
        res.status(400).json({
            Error: "Session is destroyed"
        })
    }
 }