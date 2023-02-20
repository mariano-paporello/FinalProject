 class ProductsDTO {
    private gmail
    private username
    private password
    private image
    private age
    private id
    private phoneNumber 
    constructor({_id, gmail, password,username, age,image, phoneNumber }) {
        this.id = _id
        this.gmail = gmail
        this.username = username
        this.password= password
        this.age= age
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