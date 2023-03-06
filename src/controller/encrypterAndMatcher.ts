import byCript from "bcrypt"
export const encryptPasssword= async (password:string)=>{
    const salt = await byCript.genSalt(10);
    return await byCript.hash(password, salt)
}
export const matchPassword = async function(passwordIngresed:string, password:string) {
    return await byCript.compare(passwordIngresed, password)
}