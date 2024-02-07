const smsQueue = require("../components/smsQueue");

function post_sendSms(req, res) {
  try {
    const { to, body, delay } = req.body;
    const delayInMs = delay ? delay * 60 * 1000 : 0;
    smsQueue.add("SendSMS", { to, body }, { delay: delayInMs });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to schedule SMS for delivery.",
      error: error.message,
    });
  }
}

module.exports = post_sendSms;
