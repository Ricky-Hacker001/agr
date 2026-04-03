/**
 * reset.js — Drop all collections and re-seed with clean data.
 * Run once: node reset.js
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './src/config/db.js';
import seedDatabase from './seed.js';

await connectDB();

// Drop the three collections that had stale field schemas
const db = mongoose.connection.db;
const toDrop = ['students', 'parents', 'achievements', 'galleries', 'leaderships'];
for (const col of toDrop) {
  try {
    await db.dropCollection(col);
    console.log(`🗑️  Dropped: ${col}`);
  } catch {
    console.log(`⏩  Skipped (not found): ${col}`);
  }
}

// Re-seed fresh
await seedDatabase();
console.log('✅ Reset complete!');
process.exit(0);
