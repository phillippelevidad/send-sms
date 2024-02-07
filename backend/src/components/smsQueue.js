const { Queue, Worker } = require("bullmq");
const sendSms = require("./sendSms");
const redisConfig = {
  connection: {
    host: "localhost",
    port: 6379,
    password: "",
  },
};

const queueName = "smsQueue";
const smsQueue = new Queue(queueName, { connection: redisConfig.connection });

new Worker(
  queueName,
  async (job) => {
    const { to, body } = job.data;
    await sendSms(to, body);
  },
  { connection: redisConfig.connection }
);

module.exports = smsQueue;
