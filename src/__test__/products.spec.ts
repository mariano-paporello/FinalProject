import { repositoryProduct } from "../models/products/products.repository";
import mongoose from "mongoose";
import server from "..";
import request from "supertest"
import axios from "axios";



describe("Test products", ()=>{
    beforeEach(async()=>{
        await mongoose.connection.collections['products']
        console.log("LOLLLL")  
    })

    it("getAllProducts", async ()=>{
        console.log("it worksss")
    })
})