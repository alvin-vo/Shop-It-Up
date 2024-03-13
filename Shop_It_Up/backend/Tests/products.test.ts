const httpMocks = require("node-mocks-http");
const { getProductsHandler } = require("../Routes/product_routes");
const { getProducts } = require("../Managers/product_manager.js");

const products = [
  {
    productId: "ABC123",
    sellerId: "seller123",
    title: "Smartphone",
    quantity: 20,
    description: "High-performance smartphone with advanced features.",
    price: 599.99,
    img: "smartphone_image.jpg",
  },
  {
    productId: "DEF456",
    sellerId: "seller456",
    title: "Laptop",
    quantity: 15,
    description: "Thin and lightweight laptop for productivity on the go.",
    price: 1299.99,
    img: "laptop_image.jpg",
  },
  {
    productId: "GHI789",
    sellerId: "seller789",
    title: "Headphones",
    quantity: 30,
    description: "Premium wireless headphones with noise cancellation.",
    price: 249.99,
    img: "headphones_image.jpg",
  },
];

jest.mock("../Managers/product_manager.js");

describe("products", () => {
  describe("get products route", () => {
    test("Given products exists expect return of products array", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      getProducts.mockResolvedValue(products);

      await getProductsHandler(req, res);

      expect(getProducts).toHaveBeenCalled();

      const data = res._getData(); //returns that data we are sending back to client
      const status = data.statusCode; //status code being returned

      expect(data).toEqual(products);
    });

    test("Given products does not exists expect return Error Message", async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      getProducts.mockResolvedValue(null);

      await getProductsHandler(req, res);

      expect(getProducts).toHaveBeenCalled();

      const data = res._getData(); //returns that data we are sending back to client
      const status = data.statusCode; //status code being returned

      expect(data).toEqual("Error: null.");
    });
  });
});
