import mongoose from 'mongoose';

const directorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: Date },
  nationality: { type: String, required: true },
  awards: [{ type: String }]
});

export default mongoose.model('Director', directorSchema);
