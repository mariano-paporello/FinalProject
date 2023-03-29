export interface MessageObject extends newMessageObject {
    _id: string
}

export interface newMessageObject {
    userId: string,
    type: tipos,
    message: string
}


export enum tipos {
    Usuario = "Usuario",
    Sistema = "Sistema"
}