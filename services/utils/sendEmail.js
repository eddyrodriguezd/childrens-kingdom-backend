const sgMail = require("@sendgrid/mail");

const sendConfirmedOrderMail = ({ to, dynamic_template_data }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  sgMail
    .send({
      to,
      from: process.env.SMTP_MAIL,
      templateId: process.env.SENDGRID_TEMPLATE_ID,
      dynamic_template_data,
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error.response.body);
    });
};

module.exports = { sendConfirmedOrderMail };
