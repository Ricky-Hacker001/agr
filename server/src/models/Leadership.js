import mongoose from 'mongoose';

const leadershipSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  role:  { type: String, enum: ['SPL', 'ASPL'], required: true },
  class: { type: String, required: true },
  photo: { type: String, default: null },
  quote: { type: String, default: '' },
  year:  { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Leadership', leadershipSchema);
