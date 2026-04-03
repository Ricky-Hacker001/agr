import Student from '../models/Student.js';

// GET all marks (flattened from all students)
export const getAllMarks = async (_req, res) => {
  try {
    const students = await Student.find();
    const marks = students.flatMap(s =>
      s.results.map(r => ({
        studentId: s.studentId,
        studentName: s.name,
        class: s.class,
        examName: r.examName,
        year: r.year,
        percentage: r.percentage,
        rank: r.rank,
        marks: r.marks,
      }))
    );
    res.json(marks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET marks for a specific student
export const getStudentMarks = async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student.results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD exam result for a student
export const addMarks = async (req, res) => {
  try {
    const { studentId, examName, year, percentage, rank, marks } = req.body;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.results.push({ examName, year, percentage, rank, marks });
    await student.save();

    res.status(201).json({ message: 'Marks added', results: student.results });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
