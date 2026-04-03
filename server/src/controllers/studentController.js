import Student from '../models/Student.js';

export const getStudents = async (_req, res) => {
  try {
    const students = await Student.find().sort({ name: 1 });
    // Map to client shape (id instead of _id)
    res.json(students.map(s => ({
      id: s.studentId,
      name: s.name,
      class: s.class,
      section: s.section,
      rollNo: s.rollNo,
      dob: s.dob,
      photo: s.photo,
      results: s.results,
      fees: s.fees,
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.id });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({
      id: student.studentId,
      name: student.name,
      class: student.class,
      section: student.section,
      rollNo: student.rollNo,
      dob: student.dob,
      photo: student.photo,
      results: student.results,
      fees: student.fees,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = await Student.create({ ...req.body, studentId: req.body.id || req.body.studentId });
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { studentId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ studentId: req.params.id });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
