import mongoose, { Schema } from 'mongoose';

const campaignSchema = new Schema(
  {
    title: String,
    description: String,
    validity: {
      year: Number,
      month: Number,
      day: Number
    }
  },
  {
    timestamps: true,
  }
);

const Campaign = mongoose.models.Campaign ||
mongoose.model('Campaign', campaignSchema);

export default Campaign;