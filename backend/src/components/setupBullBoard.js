const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const smsQueue = require("./smsQueue");

function setupBullBoard(app) {
  const serverAdapter = new ExpressAdapter();
  createBullBoard({
    queues: [new BullMQAdapter(smsQueue)],
    serverAdapter,
  });
  serverAdapter.setBasePath("/admin/queues");
  app.use("/admin/queues", serverAdapter.getRouter());
}

module.exports = setupBullBoard;
