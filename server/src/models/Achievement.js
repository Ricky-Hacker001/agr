import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  category:    { type: String, enum: ['academic', 'sports', 'cultural', 'faculty'], required: true },
  description: { type: String, required: true },
  year:        { type: String, required: true },
  studentName: { type: String, default: '' },
  award:       { type: String, default: '' },
  photos:      [{ type: String }],
}, { timestamps: true });

export default mongoose.model('Achievement', achievementSchema);
