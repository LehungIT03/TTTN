import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the car being reviewed
      ref: 'Cars',
      required: true,
    },
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Assuming the rating is out of 5 stars
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ReviewModel = mongoose.model('Reviews', reviewSchema);
