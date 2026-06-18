import { Schema, models, model } from 'mongoose'

const CarbonProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    annualCO2: { type: Number, required: true },
    breakdown: {
      transport: { type: Number, default: 0 },
      food: { type: Number, default: 0 },
      home: { type: Number, default: 0 },
      shopping: { type: Number, default: 0 },
    },
    inputs: {
      transport: {
        mode: { type: String, enum: ['car', 'bus', 'train', 'bike', 'walk', 'metro'], default: 'car' },
        weeklyKm: { type: Number, default: 0 },
        flightsPerYear: { type: Number, default: 0 },
        flightType: { type: String, enum: ['short', 'long'], default: 'long' },
      },
      food: {
        diet: { type: String, enum: ['vegan', 'vegetarian', 'mixed', 'high-meat'], default: 'mixed' },
      },
      home: {
        source: { type: String, enum: ['grid', 'solar', 'mixed', 'lpg'], default: 'grid' },
        monthlyKwh: { type: Number, default: 0 },
        householdSize: { type: Number, default: 1 },
      },
      shopping: {
        habit: { type: String, enum: ['fast', 'secondhand', 'sustainable', 'minimal'], default: 'fast' },
      },
    },
    ecoScore: { type: Number, default: 50 },
    history: [
      {
        date: { type: Date, default: Date.now },
        co2: Number,
        score: Number,
      },
    ],
  },
  { timestamps: true }
)

export default models.CarbonProfile || model('CarbonProfile', CarbonProfileSchema)
