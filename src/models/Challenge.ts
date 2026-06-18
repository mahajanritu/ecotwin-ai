import { Schema, models, model } from 'mongoose'

const ChallengeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: '🌱' },
    category: { type: String, default: 'general' },
    co2Impact: { type: Number, default: 0 }, // kg CO2 potential savings
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
    status: { type: String, enum: ['active', 'upcoming', 'completed'], default: 'active' },
    startsAt: { type: Date, default: Date.now },
    endsAt: { type: Date, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

export default models.Challenge || model('Challenge', ChallengeSchema)
