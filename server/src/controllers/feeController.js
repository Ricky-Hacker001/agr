import Student from '../models/Student.js';

// GET all fees (flattened from all students)
export const getAllFees = async (_req, res) => {
  try {
    const students = await Student.find();
    const fees = students.flatMap(s =>
      s.fees.map(f => ({
        studentId: s.studentId,
        studentName: s.name,
        class: s.class,
        term: f.term,
        amount: f.amount,
        paid: f.paid,
        paidOn: f.paidOn,
      }))
    );
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE fee status for a student
export const updateFee = async (req, res) => {
  try {
    const { studentId, term, paid, paidOn } = req.body;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const fee = student.fees.find(f => f.term === term);
    if (!fee) return res.status(404).json({ message: 'Fee record not found' });

    fee.paid = paid;
    fee.paidOn = paidOn || null;
    await student.save();

    res.json({ message: 'Fee updated', fee });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
