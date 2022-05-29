const sinon = require("sinon");
const Service = require("../../services/ProductService");
const UploadService = require("../../services/utils/UploadService");
const Product = require("../../models/Product");
const assert = require("assert");

describe("Product Service", function () {
  const product = {
    title: "Frasco de melatonina",
    description: "Contiene 50 gomitas",
    price: 110,
    category: "health",
  };
  const file = "/tmp/file.jpg";
  const url = "https://res.cloudinary.com/dhd7i9orq/image/upload/img001.jpg";

  describe("Save product", function () {
    let uploadStubbedService;

    afterEach(function () {
      uploadStubbedService.restore();
    });

    it("Should save a Product", async () => {
      const productCreated = {
        _id: "600abcde000a0abc0abcd000",
        ...product,
        isActive: true,
        url: url,
      };

      sinon.stub(Product.prototype, "save").resolves(productCreated);
      uploadStubbedService = sinon
        .stub(UploadService, "uploadImage")
        .resolves(url);

      const result = await Service.saveProduct(file, product);

      assert.equal(result, productCreated);
    });

    it("Should return an Error: Missing title (Empty)", async () => {
      uploadStubbedService = sinon
        .stub(UploadService, "uploadImage")
        .resolves(url);

      await assert.rejects(
        async () => {
          await Service.saveProduct(file, { ...product, title: "" });
        },
        {
          name: "Error",
          message: "Title is missing",
        }
      );
    });

    it("Should return an Error: Missing title (null)", async () => {
      await assert.rejects(
        async () => {
          await Service.saveProduct({ ...product, title: null });
        },
        {
          name: "TypeError",
          message:
            "Cannot destructure property 'title' of 'product' as it is undefined.",
        }
      );
    });
  });

  describe("Fetch products by category", function () {

    it("Should bring list with products", async () => {
      sinon.stub(Product, "findByCategoryAndIsActive").resolves([product]);

      const result = await Service.findAllActiveProductsByCategory(product.category);

      assert.equal(result[0], product);
    });
  });
});
