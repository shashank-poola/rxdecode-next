import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Prisma client generated to ../generated/prisma by prisma/schema.prisma
// Import from the generated output to avoid relying on @prisma/client path
import { PrismaClient } from '../generated/prisma/index.js';

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'rxdecode-server' });
});

// Register with email & password
app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, hashedPassword },
    });

    const sessionToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('session', sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ user: { id: user.id, email: user.email, name: user.name, imageUrl: user.imageUrl } });
  } catch (err) {
    console.error('[auth/register] error', err);
    res.status(500).json({ error: 'Register failed' });
  }
});

// Login with email & password
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.hashedPassword) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.hashedPassword);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const sessionToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('session', sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ user: { id: user.id, email: user.email, name: user.name, imageUrl: user.imageUrl } });
  } catch (err) {
    console.error('[auth/login] error', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Example of reading session cookie
app.get('/me', async (req, res) => {
  try {
    const token = req.cookies?.session;
    if (!token) return res.status(401).json({ error: 'No session' });
    const payload = jwt.verify(token, JWT_SECRET);
    const userId = payload.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid session' });
  }
});

app.post('/auth/logout', (req, res) => {
  res.clearCookie('session', { httpOnly: true, sameSite: 'lax' });
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});


