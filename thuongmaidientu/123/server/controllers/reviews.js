import { ReviewModel } from '../models/ReviewModel.js';
import { CarModel } from '../models/CarModel.js';

export const getReviewsByCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const reviews = await ReviewModel.find({ car: carId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { carId, stars, comment } = req.body;

    const car = await CarModel.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const newReview = new ReviewModel({
      car: carId,
      stars,
      comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
