import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title:      { type: String, required: true },
  category:   { type: String, enum: ['sports', 'cultural', 'academic', 'general'], required: true },
  url:        { type: String, required: true },
  uploadedAt: { type: String, required: true },
  pdfUrl:     { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
