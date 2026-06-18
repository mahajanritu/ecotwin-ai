import mongoose, { Schema, models, model } from 'mongoose'

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    password: { type: String, select: false }, // for credentials auth (optional)
    ecoScore: { type: Number, default: 50 },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActiveDate: { type: Date },
    location: {
      city: { type: String, default: '' },
      country: { type: String, default: '' },
    },
    badges: [{ type: String }],
    onboarded: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default models.User || model('User', UserSchema)
