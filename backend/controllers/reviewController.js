const Review = require('../models/Review');

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).populate('postedBy', 'name email');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const reviewData = { ...req.body, postedBy: req.user.id };
    const review = await Review.create(reviewData);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getReviews, createReview };
