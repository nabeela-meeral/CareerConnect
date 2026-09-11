const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  type: { type: String, enum: ['internship', 'part-time', 'full-time'], required: true },
  companyName: { type: String, required: true },
  role: { type: String, required: true },
  salary: { type: String, required: true },
  duration: { type: String, required: true },
  skillsRequired: { type: [String], required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  applicationLink: { type: String, required: true },
  deadline: { type: Date, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
