import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Parent from '../models/Parent.js';

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

// ── Parent Login ─────────────────────────────────────────────────────────────
export const parentLogin = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({ message: 'Mobile and password are required' });
    }

    const parent = await Parent.findOne({ mobile }).populate('students');
    if (!parent) {
      return res.status(401).json({ message: 'Invalid mobile number or password' });
    }

    const match = await bcrypt.compare(password, parent.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid mobile number or password' });
    }

    const token = signToken({ id: parent._id, role: 'parent' });

    // Shape the response to match what the client expects
    res.json({
      token,
      parentName: parent.parentName,
      mobile: parent.mobile,
      students: parent.students.map((s) => ({
        id: s.studentId,
        name: s.name,
        class: s.class,
        section: s.section,
        rollNo: s.rollNo,
        dob: s.dob,
        photo: s.photo,
        results: s.results,
        fees: s.fees,
      })),
    });
  } catch (error) {
    console.error('Parent login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ── Admin Login ──────────────────────────────────────────────────────────────
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = signToken({ username, role: 'admin' });
      return res.json({ token, username, role: 'Administrator' });
    }

    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
