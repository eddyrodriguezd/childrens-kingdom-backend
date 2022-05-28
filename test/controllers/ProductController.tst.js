const sinon = require("sinon");
const Controller = require("../../controllers/ProductController");
const Service = require("../../services/ProductService");

describe("Product Controller", function () {
  const product = {
    title: 'Frasco de melatonina',
    description: 'Contiene 50 gomitas',
    price: 110,
    category: 'health',
  };
  const file = '/tmp/file.jpg';

  describe("Save new product", function () {
    let stubbedService;
    let mReq, mRes;

    beforeEach(function () {
      mRes = { status: sinon.stub().returnsThis(), send: sinon.stub() };
    });

    afterEach(function () {
      stubbedService.restore();
    });

    it("Should return create new product (200 status code)", async () => {
      const productCreated = {
        _id: "600abcde000a0abc0abcd000",
        ...product,
        isActive: true,
        url: 'https://res.cloudinary.com/dhd7i9orq/image/upload/'
      };

      stubbedService = sinon.stub(Service, "saveProduct").resolves(productCreated);

      mReq = {body: product, file: file};

      await Controller.createProduct(mReq, mRes);

      sinon.assert.calledWith(mRes.status, 200);
      sinon.assert.calledWith(mRes.send, {
        message: 'New product created',
        data: productCreated,
      });
    });

    it("Should throw a Bad Request Error when trying to create new product(400 status code)", async () => {
      stubbedService = sinon
        .stub(Service, "saveProduct")
        .throws(new Error("Title parameter is missing"));

      mReq = {body: {...product, title: null}, file: file};

      await Controller.createProduct(mReq, mRes);

      sinon.assert.calledWith(mRes.status, 400);
      sinon.assert.calledWith(mRes.send, {
        error: "Title parameter is missing",
      });
    });
  });

  describe("Fetch products by category", function () {
    let stubbedService;
    let mReq, mRes;

    beforeEach(function () {
      mRes = { status: sinon.stub().returnsThis(), send: sinon.stub() };
    });

    afterEach(function () {
      stubbedService.restore();
    });

    it("Should return a list of two products (200 status code)", async () => {
      const products = [product, product];

      stubbedService = sinon.stub(Service, "findAllActiveProductsByCategory").resolves(products);

      mReq = {params: {category: 'health'}};

      await Controller.getAllActiveProductsByCategory(mReq, mRes);

      sinon.assert.calledWith(mRes.status, 200);
      sinon.assert.calledWith(mRes.send, {
        message: 'Products retrieved',
        data: products,
      });
    });

    it("SShould return an empty list (200 status code)", async () => {
      const products = [];

      stubbedService = sinon.stub(Service, "findAllActiveProductsByCategory").resolves(products);

      mReq = {params: {category: 'health'}};

      await Controller.getAllActiveProductsByCategory(mReq, mRes);

      sinon.assert.calledWith(mRes.status, 200);
      sinon.assert.calledWith(mRes.send, {message: 'No products for this category'});
    });
  });

});
