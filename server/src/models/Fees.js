import mongoose from 'mongoose';

const feesSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  term:      { type: String, required: true },
  amount:    { type: Number, required: true },
  paid:      { type: Boolean, default: false },
  paidOn:    { type: String, default: null },
}, { timestamps: true });

export default mongoose.model('Fees', feesSchema);
