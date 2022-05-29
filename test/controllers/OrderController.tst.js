const sinon = require("sinon");
const Controller = require("../../controllers/OrderController");
const Service = require("../../services/OrderService");

describe("Order Controller", function () {
  const user = {
    id: "6277ed3d0204989505c46be2",
    email: "eddyrodriguezdlc@gmail.com",
  };
  const order = {
    products: [
      {
        title: "Frasco de melatonina",
        price: 110,
        quantity: 2,
        category: "health",
      },
      {
        title: "Frasco multivitamínico",
        price: 120,
        quantity: 1,
        category: "health",
      },
    ],
    payment: {
      payer: {
        email: "eddyrodriguezdlc@gmail.com",
        identification: {
          type: "DNI",
          number: "76444245",
        },
      },
      installments: 1,
    },
  };
  const totalPrice = 230;

  describe("Save new order", function () {
    let stubbedService;
    let mReq, mRes;

    beforeEach(function () {
      mRes = { status: sinon.stub().returnsThis(), send: sinon.stub() };
    });

    afterEach(function () {
      stubbedService.restore();
    });

    it("Should return create new order (200 status code)", async () => {
      const orderCreated = {
        _id: "300abcde000a0abc0abcd000",
        ...order,
        client: user,
        totalPrice: totalPrice,
        status: "CONFIRMED",
      };

      stubbedService = sinon.stub(Service, "saveOrder").resolves(orderCreated);

      mReq = { body: order, user: user };

      await Controller.createOrder(mReq, mRes);

      sinon.assert.calledWith(mRes.status, 200);
      sinon.assert.calledWith(mRes.send, {
        message: "New order created",
        data: orderCreated,
      });
    });

    it("Should throw a Bad Request Error when trying to create new order without product information(400 status code)", async () => {
      stubbedService = sinon
        .stub(Service, "saveOrder")
        .throws(new Error("Product information is missing"));

      body = order;
      body.products[0].category = null;
      mReq = { body: order, user: user };

      await Controller.createOrder(mReq, mRes);

      sinon.assert.calledWith(mRes.status, 400);
      sinon.assert.calledWith(mRes.send, {
        error: "Product information is missing",
      });
    });
  });
});
