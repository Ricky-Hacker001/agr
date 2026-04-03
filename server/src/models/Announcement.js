import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  content: { type: String, required: true },
  date:    { type: String, default: () => new Date().toISOString().slice(0, 10) },
}, { timestamps: true });

export default mongoose.model('Announcement', announcementSchema);
