const Job = require('../models/Job');

const getJobs = async (req, res) => {
  try {
    const query = {};
    if (req.query.type) query.type = req.query.type;
    if (req.query.companyName) query.companyName = new RegExp(req.query.companyName, 'i');
    if (req.query.role) query.role = new RegExp(req.query.role, 'i');

    const jobs = await Job.find(query).sort({ createdAt: -1 }).populate('postedBy', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const jobData = { ...req.body, postedBy: req.user.id };
    const job = await Job.create(jobData);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getJobs, createJob };
