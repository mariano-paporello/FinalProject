import mongoose, { connect } from "mongoose"
import { getDao, getProductById } from "../products.factory"
import { repositoryProduct } from "../products.repository"


describe("Product Test", ()=>{
    let daoTest:any 
    beforeAll(async () => {
        jest.spyOn(mongoose, "connect").mockResolvedValue(mongoose)
        daoTest = await getDao() 
    })

    describe("productDao getAll", ()=>{
        it('deberia traer un array vacio si no hay elementos en la db',async () => {
            const mockResponse:[] = [] 
            jest.spyOn(repositoryProduct, "getAllProd").mockResolvedValueOnce(mockResponse);
            
            const data = await daoTest.getAllProd()
            
            expect(data).toBeDefined()
        })
    })
    describe("producDao get by Query", () => {
        it("deberia traer el objeto que quiero por el query",async () => {
            const mockResponse = {"_id":"61994f4a02cb778668c50409","title":"boca","price":300,"thumbnail":"notFound","category":"the best","stock":1}
            jest.spyOn(repositoryProduct, 'getProductByQuery').mockResolvedValue(mockResponse);

            const data = await daoTest.getProductByQuery({title:mockResponse.title})

            expect(data.title).toEqual(mockResponse.title)
            expect(data.price).toEqual(mockResponse.price)
            expect(data.thumbnail).toEqual(mockResponse.thumbnail)
            expect(data.category).toEqual(mockResponse.category)
            expect(data.stock).toEqual(mockResponse.stock)
            expect(data._id).toBeDefined()
        })
    })
    describe("ProductDao post",()=>{
        it("deberia guardar correctamente el nuevo producto", async ()=>{
            const newProduct ={
                title:"NuevoProducto",
                price:300,
                thumbnail:"notFound",
                category:"the best",
                stock:1
            }
            jest.spyOn(repositoryProduct, "postProductToProducts").mockImplementation(()=>{
                return Promise.resolve({_id:'61994f4a02cb778668c50409', ...newProduct})
            })

            const result = await daoTest.postProductToProducts(newProduct)

            expect(result.title).toEqual(newProduct.title)
            expect(result.price).toEqual(newProduct.price)
            expect(result.thumbnail).toEqual(newProduct.thumbnail)
            expect(result.category).toEqual(newProduct.category)
            expect(result.stock).toEqual(newProduct.stock)
            expect(result._id).toBeDefined()
        })
    })
    describe("ProductDao delete", ()=>{
        it("deberia eliminar correcamente el producto por query",async () => {
            const mockResponse = { acknowledged: true, deletedCount: 1 }

            jest.spyOn(repositoryProduct, "deleteByQuery").mockResolvedValue(mockResponse)

            const deleted = await daoTest.deleteByQuery({title: "NuevoProducto"})

            expect(deleted.deletedCount).toEqual(mockResponse.deletedCount)
            expect(deleted.acknowledged).toEqual(mockResponse.acknowledged)
        })
    })



})