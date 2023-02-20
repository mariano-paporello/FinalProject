class ProductsDTO {
    private userId
    private cart
    private id
    constructor({_id, userId, cart }) {
        this.id= _id
        this.userId = userId
        this.cart = cart
    }
}

export function asDto(cart) {
    if(Array.isArray(cart))
        return cart.map(element => new ProductsDTO(element))
    else
        return new ProductsDTO(cart)
}