const OrderSchema = require("../models/Order");
const SendEmail = require("../services/utils/sendEmail");

const saveOrder = async (user, { products, payment }) => {
  let id = "6277ed3d0204989505c46be2";
  let email = "eddyrodriguezdlc@gmail.com";
  if (user != null) {
    id = user.id;
    email = user.email;
  }
  //if (id === undefined || email === undefined) throw new Error('Client information is missing');

  console.log("products", products);
  products.forEach((p) => {
    if (
      p.id === null ||
      p.id === "" ||
      p.title === null ||
      p.title === "" ||
      p.price === null ||
      p.price <= 0 ||
      p.quantity === null ||
      p.quantity <= 0 ||
      p.category === null ||
      p.category === ""
    )
      throw new Error("Product information is missing");
  });

  const totalPrice = products
    .map((p) => p.price)
    .reduce((acc, cur) => cur + acc, 0);
  console.log("Order's total price:", totalPrice);

  const newOrder = new OrderSchema({
    client: {
      id,
      email,
    },
    products,
    totalPrice,
    payment,
    status: "CONFIRMED",
  });

  const savedOrder = await newOrder.save();
  console.log(`Order <${JSON.stringify(savedOrder)}> created`);

  SendEmail.sendConfirmedOrderMail({
    to: email,
    templateId: process.env.SENDGRID_TEMPLATE_RESERVATION_CONFIRMED_ID,
    dynamic_template_data: {
      clientName: "Eddy",
      id: savedOrder._id,
    },
  });

  return savedOrder;
};

module.exports = {
  saveOrder,
};
