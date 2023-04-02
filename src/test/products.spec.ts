import { repositoryProduct } from "../models/products/products.repository";
import axios from "axios";
import server from "..";
import supertest from "supertest";

describe("Test products", () => {
  let request: any;
  beforeAll(async () => {
    request = supertest(server);
  });

  afterAll(async () => {
    server.close();
  });

  it("obtener el array de productos de la base de datos", async () => {
    const expectedResponse = await repositoryProduct.getAllProd();

    const response =
      (await request.get("/products")) || (await axios.get("/products"));

    expect(response.body.productos[0].title).toEqual(expectedResponse[0].title);
    expect(response.body.productos[0].price).toEqual(expectedResponse[0].price);
    expect(response.body.productos[0].category).toEqual(
      expectedResponse[0].category
    );
    expect(response.body.productos[0].thumbnail).toEqual(
      expectedResponse[0].thumbnail
    );
    expect(response.statusCode).toBe(200);
  });
});
