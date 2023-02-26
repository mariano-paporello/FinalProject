import { repositoryProduct } from "../models/products/products.repository";
import axios from "axios"
import server from "..";
import supertest from "supertest"
import request from "supertest"



describe("Test products", ()=>{
    let request
    beforeAll(async()=>{
        request = supertest(server)
        await repositoryProduct.deleteAll()
    })

    afterAll(async () => {
        server.close()
    })

    it("obtener el array de productos de la base de datos", async ()=>{
        const expectedResponse = await repositoryProduct.getAllProd()

        const response = await request.get("/products") || await axios.get("/products")
        expect(response.body.productos).toEqual(expectedResponse)
        expect(response.statusCode).toBe(200)
    })
    
})