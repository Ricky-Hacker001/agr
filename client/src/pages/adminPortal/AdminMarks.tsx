import { useState, useEffect } from 'react';
import { type Student } from '../../data/adminStore';
import type { SubjectMark } from '../../types/student.types';
import { fetchStudents, updateStudent } from '../../services/studentService';

const AdminMarks = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [editingExamIdx, setEditingExamIdx] = useState<number | null>(null);
  const [editingMarks, setEditingMarks] = useState<SubjectMark[]>([]);
  const [toast, setToast] = useState('');

  const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    fetchStudents()
      .then(data => {
        setStudents(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(() => notify('❌ Failed to load students'))
      .finally(() => setLoading(false));
  }, []);

  const student = students.find(s => s.id === selectedId);

  const startEdit = (examIdx: number) => {
    setEditingExamIdx(examIdx);
    setEditingMarks(JSON.parse(JSON.stringify(student!.results[examIdx].marks)));
  };

  const saveMark = async () => {
    if (editingExamIdx === null || !student) return;
    const total = editingMarks.reduce((s, m) => s + m.total, 0);
    const percentage = Math.round((total / (editingMarks.length * 100)) * 1000) / 10;

    const updatedResults = student.results.map((r, i) =>
      i === editingExamIdx ? { ...r, marks: editingMarks, percentage } : r
    );
    const updatedStudent = { ...student, results: updatedResults };

    try {
      await updateStudent(selectedId, { results: updatedResults });
      setStudents(prev => prev.map(s => s.id === selectedId ? updatedStudent : s));
      setEditingExamIdx(null);
      notify('✅ Marks updated successfully');
    } catch {
      notify('❌ Failed to save marks');
    }
  };

  const gradeFor = (total: number) => {
    if (total >= 91) return 'A+';
    if (total >= 81) return 'A';
    if (total >= 71) return 'B+';
    if (total >= 61) return 'B';
    return 'C';
  };

  const updateMark = (idx: number, val: number) => {
    setEditingMarks(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], total: val, theory: val, grade: gradeFor(val) };
      return next;
    });
  };

  if (loading) return (
    <div className="text-center py-16 text-gray-400">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin mx-auto mb-3" />
      Loading students…
    </div>
  );

  return (
    <div className="space-y-6">
      {toast && <div className="fixed top-4 right-4 bg-blue-900 text-white px-5 py-3 rounded-xl shadow-lg z-50 text-sm font-semibold">{toast}</div>}

      <div>
        <h1 className="text-2xl font-black text-blue-950">Exam Marks</h1>
        <p className="text-gray-400 text-sm mt-0.5">Edit marks — changes instantly reflect in the Parent Portal</p>
      </div>

      {/* Student Selector */}
      <div className="flex flex-wrap gap-2">
        {students.map(s => (
          <button key={s.id} onClick={() => { setSelectedId(s.id); setEditingExamIdx(null); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedId === s.id ? 'bg-blue-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'}`}>
            {s.name} <span className="opacity-60 ml-1">{s.class}</span>
          </button>
        ))}
      </div>

      {/* Exams */}
      {student && student.results.map((result, examIdx) => (
        <div key={examIdx} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <p className="font-black text-blue-950">{result.examName} – {result.year}</p>
              <p className="text-sm text-gray-400">Overall: <span className="text-yellow-600 font-bold">{result.percentage}%</span>{result.rank ? ` · Rank #${result.rank}` : ''}</p>
            </div>
            {editingExamIdx !== examIdx ? (
              <button onClick={() => startEdit(examIdx)} className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">✏️ Edit Marks</button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setEditingExamIdx(null)} className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-600">Cancel</button>
                <button onClick={saveMark} className="bg-blue-900 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-800 transition-colors">Save</button>
              </div>
            )}
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-2.5 text-left">Subject</th>
                <th className="px-4 py-2.5 text-center">Marks / 100</th>
                <th className="px-4 py-2.5 text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(editingExamIdx === examIdx ? editingMarks : result.marks).map((m, mi) => (
                <tr key={m.subject} className={mi % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-2.5 font-medium text-gray-700">{m.subject}</td>
                  <td className="px-4 py-2.5 text-center">
                    {editingExamIdx === examIdx ? (
                      <input type="number" min={0} max={100} value={m.total}
                        onChange={e => updateMark(mi, Number(e.target.value))}
                        className="w-16 text-center border border-blue-300 rounded-lg px-2 py-1 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    ) : (
                      <span className="font-bold text-gray-800">{m.total}</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      m.grade === 'A+' ? 'bg-green-100 text-green-700 border-green-200' :
                      m.grade === 'A' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                      {m.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AdminMarks;
