const { Queue, Worker } = require("bullmq");
const sendSms = require("./sendSms");
const redisConfig = {
  connection: {
    host: "localhost", // Your Redis host
    port: 6379, // Your Redis port
    password: "", // Your Redis password, if any
  },
};

const queueName = "smsQueue";
const smsQueue = new Queue(queueName, { connection: redisConfig.connection });

// Define a worker for processing jobs in the 'smsQueue'
new Worker(
  queueName,
  async (job) => {
    const { to, body } = job.data;
    await sendSms(to, body);
  },
  { connection: redisConfig.connection }
);

module.exports = smsQueue;
