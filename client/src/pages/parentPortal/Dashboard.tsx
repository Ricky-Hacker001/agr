import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { Student, ExamResult } from '../../types/student.types';
import { logoutParent } from '../../services/authService';

// ── Sub-components ──────────────────────────────────────────────────────────

const GradeBadge = ({ grade }: { grade: string }) => {
  const colors: Record<string, string> = {
    'A+': 'bg-green-100 text-green-700 border-green-200',
    'A': 'bg-blue-100 text-blue-700 border-blue-200',
    'B+': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'B': 'bg-orange-100 text-orange-700 border-orange-200',
    'C': 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${colors[grade] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {grade}
    </span>
  );
};

const ResultCard = ({ result }: { result: ExamResult }) => (
  <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
    <div className="bg-blue-900 text-white px-5 py-3 flex justify-between">
      <div>
        <p className="font-bold text-sm">{result.examName}</p>
        <p className="text-blue-300 text-xs">{result.year}</p>
      </div>
      <div className="text-right">
        <p className="text-yellow-400 text-xl font-black">{result.percentage}%</p>
        {result.rank && <p className="text-blue-300 text-xs">Rank #{result.rank}</p>}
      </div>
    </div>

    <table className="w-full text-sm">
      <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
        <tr>
          <th className="px-4 py-2 text-left">Subject</th>
          <th className="px-4 py-2 text-center">Marks</th>
          <th className="px-4 py-2 text-center">Grade</th>
        </tr>
      </thead>
      <tbody>
        {result.marks.map((m, i) => (
          <tr key={m.subject} className={i % 2 ? 'bg-gray-50' : ''}>
            <td className="px-4 py-2">{m.subject}</td>
            <td className="px-4 py-2 text-center font-bold">{m.total}</td>
            <td className="px-4 py-2 text-center"><GradeBadge grade={m.grade} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FeeTable = ({ student }: { student: Student }) => {
  const total = student.fees.reduce((s, f) => s + f.amount, 0);
  const paid = student.fees.filter(f => f.paid).reduce((s, f) => s + f.amount, 0);
  const pending = total - paid;

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="px-5 py-4 flex justify-between border-b">
        <p className="font-bold text-blue-950">Fee Statement</p>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${pending > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {pending > 0 ? `₹${pending} Due` : 'All Paid ✓'}
        </span>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
          <tr>
            <th className="px-4 py-2 text-left">Term</th>
            <th className="px-4 py-2 text-right">Amount</th>
            <th className="px-4 py-2 text-center">Status</th>
            <th className="px-4 py-2 text-center">Paid On</th>
          </tr>
        </thead>
        <tbody>
          {student.fees.map((f, i) => (
            <tr key={f.term} className={i % 2 ? 'bg-gray-50' : ''}>
              <td className="px-4 py-2">{f.term}</td>
              <td className="px-4 py-2 text-right font-bold">₹{f.amount}</td>
              <td className="px-4 py-2 text-center">
                {f.paid ? '✓ Paid' : '⚠ Pending'}
              </td>
              <td className="px-4 py-2 text-center text-gray-400 text-xs">{f.paidOn ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StudentProfile = ({ student }: { student: Student }) => (
  <div className="space-y-5">
    <div className="bg-blue-900 text-white p-5 rounded-2xl">
      <h3 className="font-black">{student.name}</h3>
      <p className="text-sm">{student.class} — {student.section}</p>
    </div>

    {student.results.map(r => (
      <ResultCard key={r.examName} result={r} />
    ))}

    <FeeTable student={student} />
  </div>
);

// ── Main ─────────────────────────────────────────────────────────────

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<any>(null);
  const [activeStudentId, setActiveStudentId] = useState('');

  useEffect(() => {
    try {
      const session = sessionStorage.getItem('parentSession');

      if (!session) {
        navigate('/parent-login');
        return;
      }

      const parsed = JSON.parse(session);

      setAccount(parsed);
      setActiveStudentId(parsed.students[0]?.id || '');
    } catch {
      navigate('/parent-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutParent();
    navigate('/parent-login');
  };

  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  const activeStudent = account.students.find((s: Student) => s.id === activeStudentId);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top bar */}
      <div className="bg-blue-900 text-white px-6 py-3 flex justify-between">
        <p className="font-bold">Parent Portal</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* Welcome */}
        <div>
          <h2 className="text-xl font-bold">Welcome, {account.parentName}</h2>
          <p className="text-sm text-gray-500">
            {account.students.length} child(ren) enrolled
          </p>
        </div>

        {/* Tabs */}
        {account.students.length > 1 && (
          <div className="flex gap-2 flex-wrap">
            {account.students.map((s: Student) => (
              <button
                key={s.id}
                onClick={() => setActiveStudentId(s.id)}
                className={`px-4 py-2 rounded-full ${
                  activeStudentId === s.id ? 'bg-blue-900 text-white' : 'bg-white border'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}

        {/* Profile */}
        {activeStudent && <StudentProfile student={activeStudent} />}

        {/* Back */}
        <div className="text-center">
          <Link to="/" className="text-xs text-gray-400">
            ← Back to Website
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ParentDashboard;