 class ProductsDTO {
    private gmail
    private username
    private image
    private id
    private phoneNumber 
    constructor({id, gmail, username, image, phoneNumber }) {
        this.id = id
        this.gmail = gmail
        this.username = username
        this.image = image
        this.phoneNumber = phoneNumber
    }
}

export function asDto(users) {
    if(Array.isArray(users)){
        const products:any = users.map(element => new ProductsDTO(element))
        return products
    }
    else{
        const product:any =  new ProductsDTO(users)
        return product
    }
         
}