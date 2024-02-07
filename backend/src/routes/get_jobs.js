const smsQueue = require("../components/smsQueue");

async function get_jobs(req, res) {
  try {
    const jobs = await smsQueue.getJobs([
      "waiting",
      "active",
      "completed",
      "failed",
      "delayed",
    ]);

    const formattedJobs = jobs.map((job) => ({
      id: job.id,
      status: job._progress,
      data: job.data,
      attemptsMade: job.attemptsMade,
      failedReason: job.failedReason,
    }));

    res.json({ success: true, data: formattedJobs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
}

module.exports = get_jobs;
