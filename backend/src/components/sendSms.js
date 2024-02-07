const twilioClient = require("./twilioClient");

const sendSms = async (to, body) => {
  await twilioClient.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
    body,
  });
  console.log(`Message sent to ${to}`);
};

module.exports = sendSms;
