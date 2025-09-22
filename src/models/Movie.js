import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  directorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Director' },
  duration: { type: Number },
  rating: { type: Number, min: 1, max: 10 },
  language: { type: String },
  budget: { type: Number }
});

export default mongoose.model('Movie', movieSchema);
