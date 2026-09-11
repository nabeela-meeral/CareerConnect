const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  interviewDifficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  interviewQuestions: { type: [String], required: true },
  experience: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
