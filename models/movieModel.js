const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A movie must have a title"],
      trim: true,
      unique: true,
    },
    director: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
      min: 1888,
      max: 2100,
    },
    genre: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
