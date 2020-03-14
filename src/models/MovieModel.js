import mongoose from "mongoose";

let MovieSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  released_on: {
    type: Date,
    trim: true,
    required: true
  }
});

let MovieModel = mongoose.model("/movies", MovieSchema);

export default MovieModel;
