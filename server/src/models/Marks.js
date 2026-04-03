import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema({
  studentId:  { type: String, required: true },
  examName:   { type: String, required: true },
  year:       { type: String, required: true },
  percentage: { type: Number, required: true },
  rank:       { type: Number, default: null },
  marks: [{
    subject:   { type: String, required: true },
    theory:    { type: Number, required: true },
    practical: { type: Number, default: null },
    total:     { type: Number, required: true },
    grade:     { type: String, required: true },
  }],
}, { timestamps: true });

export default mongoose.model('Marks', marksSchema);
