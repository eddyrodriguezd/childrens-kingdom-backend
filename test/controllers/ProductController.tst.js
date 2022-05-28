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
      let productCreated = {
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

    it("Should throw a Bad Request Error (400 status code)", async () => {
      stubbedService = sinon
        .stub(Service, "saveProduct")
        .throws(new Error("Name parameter is missing"));

      mReq = {body: {...product, title: null}, file: file};

      await Controller.createProduct(mReq, mRes);
      
      sinon.assert.calledWith(mRes.status, 400);
      sinon.assert.calledWith(mRes.send, {
        error: "Name parameter is missing",
      });
    });
  });
});
