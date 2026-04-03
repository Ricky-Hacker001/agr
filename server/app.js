import express from 'express';
import cors from 'cors';

// ── Route imports ────────────────────────────────────────────────────────────
import authRoutes         from './src/routes/authRoutes.js';
import studentRoutes      from './src/routes/studentRoutes.js';
import achievementRoutes  from './src/routes/achievementRoutes.js';
import galleryRoutes      from './src/routes/galleryRoutes.js';
import leadershipRoutes   from './src/routes/leadershipRoutes.js';
import feeRoutes          from './src/routes/feeRoutes.js';
import marksRoutes        from './src/routes/marksRoutes.js';
import announcementRoutes from './src/routes/announcementRoutes.js';

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth',          authRoutes);
app.use('/api/students',      studentRoutes);
app.use('/api/achievements',  achievementRoutes);
app.use('/api/gallery',       galleryRoutes);
app.use('/api/leadership',    leadershipRoutes);
app.use('/api/fees',          feeRoutes);
app.use('/api/marks',         marksRoutes);
app.use('/api/announcements', announcementRoutes);

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ── Error handler ────────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;
