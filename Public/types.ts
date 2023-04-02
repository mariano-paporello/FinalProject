export interface User {
  _id: string;
  gmail: string;
  password: string;
  age: string;
  username: string;
  phoneNumber: string;
  image: string;
  admin?: boolean;
  address: string;
}

export type ProductToView = {
  title: string;
  price: number;
  thumbnail: string;
  amount: number;
}[];
export interface singlePorduct {
  id: string | undefined;
  title: string;
  priceUnit: number;
  price: number;
  thumbnail: string;
  amount: number;
}
export type finalProductForm = (
  | {
      id: string | undefined;
      title: string;
      priceUnit: number;
      price: number;
      thumbnail: string;
      amount: number;
    }
  | undefined
)[];

export interface NewMessage {
  id: string;
  author: {
    nombre: string;
    apellido: string;
    edad: number;
    alias: string;
    avatar: string;
  };
  text: string;
}
export enum states {
  generate = "Generado",
  paid = "Pago",
  send = "Enviado",
  ended = "Finalizado",
}
export interface updatedProduct {
  id: string | undefined;
  title: string | undefined;
  price?: number;
  amount: number;
}
