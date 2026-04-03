import mongoose from 'mongoose';

const subjectMarkSchema = new mongoose.Schema({
  subject:   { type: String, required: true },
  theory:    { type: Number, required: true },
  practical: { type: Number, default: null },
  total:     { type: Number, required: true },
  grade:     { type: String, required: true },
}, { _id: false });

const examResultSchema = new mongoose.Schema({
  examName:   { type: String, required: true },
  year:       { type: String, required: true },
  percentage: { type: Number, required: true },
  rank:       { type: Number, default: null },
  marks:      [subjectMarkSchema],
}, { _id: false });

const feeRecordSchema = new mongoose.Schema({
  term:   { type: String, required: true },
  amount: { type: Number, required: true },
  paid:   { type: Boolean, default: false },
  paidOn: { type: String, default: null },
}, { _id: false });

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },   // e.g. "S001"
  name:      { type: String, required: true },
  class:     { type: String, required: true },
  section:   { type: String, required: true },
  rollNo:    { type: String, required: true },
  dob:       { type: String, required: true },
  photo:     { type: String, default: null },
  results:   [examResultSchema],
  fees:      [feeRecordSchema],
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
