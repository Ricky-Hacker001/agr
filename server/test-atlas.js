import 'dotenv/config';
import mongoose from 'mongoose';

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Atlas connected:', mongoose.connection.host);
  process.exit(0);
} catch (e) {
  console.error('❌ Failed:', e.message);
  process.exit(1);
}
