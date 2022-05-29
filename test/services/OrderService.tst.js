const sinon = require("sinon");
const Service = require("../../services/OrderService");
const SendEmailService = require("../../services/utils/sendEmail");
const Order = require("../../models/Order");
const assert = require("assert");

describe("Order Service", function () {
  const user = {
    id: "6277ed3d0204989505c46be2",
    email: "eddyrodriguezdlc@gmail.com",
  };
  const products = [
    {
      id: "100abcde000a0abc0abcd000",
      title: "Frasco de melatonina",
      price: 110,
      quantity: 2,
      category: "health",
    },
    {
      id: "200abcde000a0abc0abcd000",
      title: "Frasco multivitamínico",
      price: 120,
      quantity: 1,
      category: "health",
    },
  ];
  const payment = {
    payer: {
      email: "eddyrodriguezdlc@gmail.com",
      identification: {
        type: "DNI",
        number: "76444245",
      },
    },
    installments: 1,
  };
  const totalPrice = 230;

  describe("Save order", function () {
    let mailStubbedService;

    afterEach(function () {
      mailStubbedService.restore();
    });

    it("Should save an Order", async () => {
      const orderCreated = {
        _id: "300abcde000a0abc0abcd000",
        products: products,
        payment: payment,
        client: user,
        totalPrice: totalPrice,
        status: "CONFIRMED",
      };

      sinon.stub(Order.prototype, "save").resolves(orderCreated);
      mailStubbedService = sinon
        .stub(SendEmailService, "sendConfirmedOrderMail")
        .resolves();

      const result = await Service.saveOrder(user, { products, payment });

      assert.equal(result, orderCreated);
    });

    it("Should return an Error: Product information missing (Empty category)", async () => {
      mailStubbedService = sinon
        .stub(SendEmailService, "sendConfirmedOrderMail")
        .resolves();

      productWithEmptyCategory = [
        {
          ...products[0],
          category: "",
        },
      ];

      await assert.rejects(
        async () => {
          await Service.saveOrder(user, {
            products: productWithEmptyCategory,
            payment,
          });
        },
        {
          name: "Error",
          message: "Product information is missing",
        }
      );
    });

    it("Should return an Error: Product information missing (null category)", async () => {
      mailStubbedService = sinon
        .stub(SendEmailService, "sendConfirmedOrderMail")
        .resolves();

      productWithoutCategory = [
        {
          ...products[0],
          category: null,
        },
      ];
      console.log(productWithoutCategory);

      await assert.rejects(
        async () => {
          await Service.saveOrder(user, {
            products: productWithoutCategory,
            payment,
          });
        },
        {
          name: "Error",
          message: "Product information is missing",
        }
      );
    });
  });
});
