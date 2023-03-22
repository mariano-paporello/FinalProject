export interface User{
    _id:string
    gmail:string
    password:string
    age:string
    username:string
    phoneNumber:string
    image:string
    admin: boolean
}

export type ProductToView = ({title:string, price: number, thumbnail:string, amount: number})[] 
export interface singlePorduct{
        title: any;
        price: number;
        thumbnail: any;
        amount: number;
}
export type finalProductForm = ({
    title: string;
    price: number;
    thumbnail: string;
    amount: number;
} | undefined)[]

export interface NewMessage{
    id: string
    author:{
        nombre: string
        apellido: string
        edad: number
        alias: string
        avatar: string
        },
    text: string
}