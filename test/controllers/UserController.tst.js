const sinon = require("sinon");
const Controller = require("../../controllers/UserController");
const Service = require("../../services/UserService");

describe("User Controller", function () {
  const user = {
    email: "eddyrodriguezdlc@gmail.com",
    password: "T1@35AS!BF3",
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  describe("Login", function () {
    let stubbedService;
    let mReq, mRes;

    beforeEach(function () {
      mRes = { status: sinon.stub().returnsThis(), send: sinon.stub() };
    });

    afterEach(function () {
      stubbedService.restore();
    });

    it("Should allow user to get token (Successful login)", async () => {
      stubbedService = sinon.stub(Service, "getToken").resolves(token);

      mReq = { user };

      await Controller.login(mReq, mRes);

      sinon.assert.calledWith(mRes.status, 200);
      sinon.assert.calledWith(mRes.send, {
        message: "Successful login",
        token,
      });
    });

    it("Shouldn't allow user to get token (Invalid credentials)", async () => {
      stubbedService = sinon.stub(Service, "getToken").resolves(undefined);

      mReq = { ...user, password: "123456" };

      await Controller.login(mReq, mRes);

      sinon.assert.calledWith(mRes.status, 401);
      sinon.assert.calledWith(mRes.send, {
        message: "Invalid credentials",
      });
    });
  });
});
