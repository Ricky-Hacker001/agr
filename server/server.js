import 'dotenv/config';
import app from './app.js';
import connectDB from './src/config/db.js';
import seedDatabase from './seed.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 ARG Academy server running on http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📋 Achievements: http://localhost:${PORT}/api/achievements`);
    console.log(`📋 Gallery:      http://localhost:${PORT}/api/gallery`);
  });
};

start();