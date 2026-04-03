import mongoose from 'mongoose';

const parentSchema = new mongoose.Schema({
  mobile:     { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  parentName: { type: String, required: true },
  students:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
}, { timestamps: true });

export default mongoose.model('Parent', parentSchema);
