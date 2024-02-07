const express = require("express");
const router = express.Router();

router.get("/jobs", require("./get_jobs"));
router.post("/send-sms", require("./post_sendSms"));

module.exports = router;
