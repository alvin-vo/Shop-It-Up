const httpMocks = require("node-mocks-http");
const {
  getProductsHandler,
  createProductHandler,
  findOneProductHandler,
  deleteProductHandler,
  updateProductHandler,
} = require("../Routes/product_routes.js");
const {
  getProducts,
  createProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
} = require("../Managers/product_manager.js");

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

const productsAfterCreatingProduct = [
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
  {
    productId: "XYZ123",
    sellerId: "seller89",
    title: "Cool SmartPhone",
    quantity: 20,
    description: "High-performance smartphone with advanced features.",
    price: 599.99,
    img: "smartphone_image.jpg",
  },
];

//Mocking files -- need to mock the file to modify function
jest.mock("../Managers/product_manager.js");
jest.mock("../AccessObjects/product_dao.js");

//reset all mocks before each test
beforeEach(() => {
  jest.resetAllMocks();
});

describe("products", () => {
  describe("get products handler", () => {
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

  describe("create product handler", () => {
    test("Given product in req body expect created product to be returned", async () => {
      const req = httpMocks.createRequest({
        body: {
          productId: "XYZ123",
          title: "Cool SmartPhone",
          quantity: 20,
          description: "High-performance smartphone with advanced features.",
          price: 599.99,
          img: "smartphone_image.jpg",
        },
        userId: "seller89",
      });
      const res = httpMocks.createResponse();

      createProduct.mockResolvedValue(productsAfterCreatingProduct);

      await createProductHandler(req, res);

      expect(createProduct).toHaveBeenCalled();

      const data = res._getData(); //returns that data we are sending back to client
      const status = data.statusCode; //status code being returned

      expect(data).toEqual(productsAfterCreatingProduct);
    });
    test("Given that create Product returns null expect to recieve an Error Message.", async () => {
      const req = httpMocks.createRequest({
        body: {
          productId: "XYZ123",
          title: "Cool SmartPhone",
          quantity: 20,
          description: "High-performance smartphone with advanced features.",
          price: 599.99,
          img: "smartphone_image.jpg",
        },
        userId: "seller89",
      });
      const res = httpMocks.createResponse();

      createProduct.mockResolvedValue(null);

      await createProductHandler(req, res);

      expect(createProduct).toHaveBeenCalled();

      const data = res._getData(); //returns that data we are sending back to client
      const status = data.statusCode; //status code being returned

      expect(data).toEqual("Error: null.");
    });
  });

  describe("find one product handler", () => {
    test("Given valid productId value expect the product that matches the productId.", async () => {
      const req = httpMocks.createRequest({
        params: {
          productId: "ABC123",
        },
      });
      const res = httpMocks.createResponse();

      getOneProduct.mockImplementation(() =>
        req.params.productId === "ABC123" ? products[0] : null
      );

      await findOneProductHandler(req, res);

      expect(getOneProduct).toHaveBeenCalled();

      const data = res._getData(); //returns that data we are sending back to client
      // const status = data.statusCode; //status code being returned

      // expect(data).toEqual(productsAfterCreatingProduct);

      expect(data).toBe(products[0]);
    });

    test("Given invalid productId value expect to return Error Message.", async () => {
      const req = httpMocks.createRequest({
        params: {
          productId: "Ajfksld2l",
        },
      });
      const res = httpMocks.createResponse();

      getOneProduct.mockImplementation(() =>
        req.params.productId === "ABC123" ? products[0] : null
      );

      await findOneProductHandler(req, res);

      expect(getOneProduct).toHaveBeenCalled();

      const data = res._getData(); //returns that data we are sending back to client
      // const status = data.statusCode; //status code being returned

      // expect(data).toEqual(productsAfterCreatingProduct);

      expect(data).toBe("Error: null.");
    });
  });

  describe("Delete Product Handler", () => {
    test("Given a valid productId expect a new array not containing the product with productId.", async () => {
      const req = httpMocks.createRequest({
        params: {
          productId: "DEF456",
        },
      });
      const res = httpMocks.createResponse();

      deleteProduct.mockImplementation(() =>
        req.params.productId === "DEF456"
          ? products.filter((item) => item.productId !== req.params.productId)
          : null
      );

      await deleteProductHandler(req, res);

      expect(deleteProduct).toHaveBeenCalled();

      const data = res._getData(); //returns that data we are sending back to client
      // const status = data.statusCode; //status code being returned

      // expect(data).toEqual(productsAfterCreatingProduct);

      filteredArray = products.filter(
        (item) => item.productId !== req.params.productId
      );
      expect(data).toEqual(filteredArray);
    });
    test("Given an invalid productId expect Error Message", async () => {
      const req = httpMocks.createRequest({
        params: {
          productId: "DEF456",
        },
      });
      const res = httpMocks.createResponse();

      deleteProduct.mockImplementation(() =>
        req.params.productId === "IN89r2"
          ? products.filter((item) => item.productId !== req.params.productId)
          : null
      );

      await deleteProductHandler(req, res);

      expect(deleteProduct).toHaveBeenCalled();

      const data = res._getData(); //returns that data we are sending back to client
      // const status = data.statusCode; //status code being returned

      // expect(data).toEqual(productsAfterCreatingProduct);

      filteredArray = products.filter(
        (item) => item.productId !== req.params.productId
      );
      expect(data).toEqual("Error: null.");
    });
  });

  describe("Update Product Handler", () => {
    test("Given valid product Id and valid updated product expect to be returned the updated product", async () => {
      const req = httpMocks.createRequest({
        params: {
          productId: "DEF456",
        },
        body: {
          sellerId: "John1235",
          title: "Laptop",
          quantity: 15,
          description:
            "Thin and lightweight laptop for productivity on the go updated product.",
          price: 1299.99,
          img: "laptop_image.jpg",
        },
      });
      const res = httpMocks.createResponse();

      //must have all properties to pass as a product. If missing a property in body then throw an error
      expect(req.body).toHaveProperty("sellerId");
      expect(req.body).toHaveProperty("title");
      expect(req.body).toHaveProperty("quantity");
      expect(req.body).toHaveProperty("description");
      expect(req.body).toHaveProperty("price");
      expect(req.body).toHaveProperty("img");

      updateProduct.mockImplementation((req) => {
        let foundProduct = products.find(
          (item) => item.productId === req.params.productId
        );
        if (foundProduct) {
          return req.body;
        } else {
          return null;
        }
      });

      await updateProductHandler(req, res);

      expect(updateProduct).toHaveBeenCalled();

      const data = res._getData(); //returns that data we are sending back to client

      expect(data).toEqual(req.body);
    });

    test("Given invalid product Id and valid updated product expect to return Error Message.", async () => {
      const req = httpMocks.createRequest({
        params: {
          productId: "Invalid456",
        },
        body: {
          sellerId: "John1235",
          title: "Laptop",
          quantity: 15,
          description:
            "Thin and lightweight laptop for productivity on the go updated product.",
          price: 1299.99,
          img: "laptop_image.jpg",
        },
      });
      const res = httpMocks.createResponse();

      //must have all properties to pass as a product. If missing a property in body then throw an error
      expect(req.body).toHaveProperty("sellerId");
      expect(req.body).toHaveProperty("title");
      expect(req.body).toHaveProperty("quantity");
      expect(req.body).toHaveProperty("description");
      expect(req.body).toHaveProperty("price");
      expect(req.body).toHaveProperty("img");

      updateProduct.mockImplementation((req) => {
        let foundProduct = products.find(
          (item) => item.productId === req.params.productId
        );
        if (foundProduct) {
          return req.body;
        } else {
          return null;
        }
      });

      await updateProductHandler(req, res);

      expect(updateProduct).toHaveBeenCalled();

      const data = res._getData(); //returns that data we are sending back to client

      expect(data).toEqual("Error: null.");
    });
    test("Given invalid product Id and invalid updated product expect to return Error Message.", async () => {
      const req = httpMocks.createRequest({
        params: {
          productId: "Ijlktj",
        },
        body: {
          sellerId: "John1235",
          quantity: 15,
          description:
            "Thin and lightweight laptop for productivity on the go updated product.",
          price: 1299.99,
          img: "laptop_image.jpg",
        },
      });
      const res = httpMocks.createResponse();

      //must have all properties to pass as a product. If missing a property in body then throw an error
      expect(req.body).toHaveProperty("sellerId");
      expect(req.body).not.toHaveProperty("title");
      expect(req.body).toHaveProperty("quantity");
      expect(req.body).toHaveProperty("description");
      expect(req.body).toHaveProperty("price");
      expect(req.body).toHaveProperty("img");

      updateProduct.mockImplementation((req) => {
        let foundProduct = products.find(
          (item) => item.productId === req.params.productId
        );
        if (foundProduct) {
          return req.body;
        } else {
          return null;
        }
      });

      await updateProductHandler(req, res);

      expect(updateProduct).toHaveBeenCalled();

      const data = res._getData(); //returns that data we are sending back to client

      expect(data).toEqual("Error: null.");
    });
  });
});
