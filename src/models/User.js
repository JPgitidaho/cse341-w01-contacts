import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: { type: String, lowercase: true, trim: true, unique: true, sparse: true },
    passwordHash: { type: String },
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
    providerId: { type: String },
    displayName: { type: String }
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
