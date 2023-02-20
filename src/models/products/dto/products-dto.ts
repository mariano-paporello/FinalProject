class ProductsDTO {
    private id
    private title
    private price
    private stock
    private thumbnail
    constructor({ _id,title, price, thumbnail, stock }) {
        this.id = _id
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
        this.stock = stock
    }
}

export function asDto(products) {
    if(Array.isArray(products))
        return products.map(element => new ProductsDTO(element))
    else
        return new ProductsDTO(products)
}