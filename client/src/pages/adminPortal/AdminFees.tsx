import { useState, useEffect } from 'react';
import { type Student } from '../../data/adminStore';
import type { FeeRecord } from '../../types/student.types';
import { fetchStudents, updateStudent } from '../../services/studentService';

const AdminFees = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [editingFees, setEditingFees] = useState<FeeRecord[] | null>(null);
  const [toast, setToast] = useState('');
  const [showAddFee, setShowAddFee] = useState(false);
  const [newFee, setNewFee] = useState<Partial<FeeRecord>>({ term: '', amount: 0, paid: false, paidOn: null });

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

  const startEdit = () => setEditingFees(JSON.parse(JSON.stringify(student!.fees)));

  const saveFees = async () => {
    if (!editingFees || !student) return;
    try {
      await updateStudent(selectedId, { fees: editingFees });
      setStudents(prev => prev.map(s => s.id === selectedId ? { ...s, fees: editingFees } : s));
      setEditingFees(null);
      notify('✅ Fee records updated');
    } catch {
      notify('❌ Failed to save fees');
    }
  };

  const togglePaid = (idx: number) => {
    setEditingFees(prev => {
      if (!prev) return prev;
      const next = [...prev];
      next[idx] = { ...next[idx], paid: !next[idx].paid, paidOn: !next[idx].paid ? new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : null };
      return next;
    });
  };

  const addFeeRecord = async () => {
    if (!newFee.term || !newFee.amount || !student) return;
    const fee: FeeRecord = { term: newFee.term!, amount: Number(newFee.amount), paid: newFee.paid ?? false, paidOn: newFee.paid ? new Date().toLocaleDateString('en-IN') : null };
    const updatedFees = [...student.fees, fee];
    try {
      await updateStudent(selectedId, { fees: updatedFees });
      setStudents(prev => prev.map(s => s.id === selectedId ? { ...s, fees: updatedFees } : s));
      setShowAddFee(false);
      setNewFee({ term: '', amount: 0, paid: false, paidOn: null });
      notify('✅ Fee term added');
    } catch {
      notify('❌ Failed to add fee');
    }
  };

  const deleteFee = async (termName: string) => {
    if (!student) return;
    const updatedFees = student.fees.filter(f => f.term !== termName);
    try {
      await updateStudent(selectedId, { fees: updatedFees });
      setStudents(prev => prev.map(s => s.id === selectedId ? { ...s, fees: updatedFees } : s));
      notify('🗑️ Fee record removed');
    } catch {
      notify('❌ Failed to delete fee');
    }
  };

  const totalAmount = student?.fees.reduce((s, f) => s + f.amount, 0) ?? 0;
  const paidAmount = student?.fees.filter(f => f.paid).reduce((s, f) => s + f.amount, 0) ?? 0;

  if (loading) return (
    <div className="text-center py-16 text-gray-400">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin mx-auto mb-3" />
      Loading students…
    </div>
  );

  return (
    <div className="space-y-6">
      {toast && <div className="fixed top-4 right-4 bg-blue-900 text-white px-5 py-3 rounded-xl shadow-lg z-50 text-sm font-semibold">{toast}</div>}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Fee Records</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage student fee payments · reflects in Parent Portal immediately</p>
        </div>
      </div>

      {/* Student tabs */}
      <div className="flex flex-wrap gap-2">
        {students.map(s => (
          <button key={s.id} onClick={() => { setSelectedId(s.id); setEditingFees(null); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedId === s.id ? 'bg-blue-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'}`}>
            {s.name} <span className="opacity-60 ml-1">{s.class}</span>
          </button>
        ))}
      </div>

      {student && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          {/* Summary bar */}
          <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-5 text-sm">
              <div><p className="text-gray-400 text-xs">Total</p><p className="font-black text-blue-950">₹{totalAmount.toLocaleString()}</p></div>
              <div><p className="text-gray-400 text-xs">Paid</p><p className="font-black text-green-600">₹{paidAmount.toLocaleString()}</p></div>
              <div><p className="text-gray-400 text-xs">Pending</p><p className="font-black text-red-500">₹{(totalAmount - paidAmount).toLocaleString()}</p></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowAddFee(true)} className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700">+ Add Term</button>
              {!editingFees ? (
                <button onClick={startEdit} className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-100">✏️ Edit Payments</button>
              ) : (
                <>
                  <button onClick={() => setEditingFees(null)} className="px-3 py-1.5 text-xs text-gray-400 hover:text-gray-600">Cancel</button>
                  <button onClick={saveFees} className="bg-blue-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-800">Save</button>
                </>
              )}
            </div>
          </div>

          {/* Add fee modal */}
          {showAddFee && (
            <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-black text-blue-950">Add Fee Term</h3>
                  <button onClick={() => setShowAddFee(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Term Name</label>
                    <input type="text" value={newFee.term ?? ''} onChange={e => setNewFee(p => ({ ...p, term: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="e.g. Term 1 – April 2026" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Amount (₹)</label>
                    <input type="number" value={newFee.amount ?? 0} onChange={e => setNewFee(p => ({ ...p, amount: Number(e.target.value) }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={newFee.paid ?? false} onChange={e => setNewFee(p => ({ ...p, paid: e.target.checked }))} className="rounded" />
                    Mark as already paid
                  </label>
                </div>
                <div className="p-5 border-t border-gray-100 flex justify-end gap-2">
                  <button onClick={() => setShowAddFee(false)} className="px-4 py-2 text-sm text-gray-400">Cancel</button>
                  <button onClick={addFeeRecord} className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-800">Add</button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Term</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Paid On</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(editingFees ?? student.fees).map((f, i) => (
                <tr key={f.term} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3 font-medium text-gray-700">{f.term}</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-800">₹{f.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    {editingFees ? (
                      <button onClick={() => togglePaid(i)} className={`text-xs font-bold px-3 py-1 rounded-full border transition-colors ${f.paid ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' : 'bg-red-100 text-red-600 border-red-200 hover:bg-red-200'}`}>
                        {f.paid ? '✓ Paid' : '⚠ Pending'} (click)
                      </button>
                    ) : (
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${f.paid ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-600 border-red-200'}`}>
                        {f.paid ? '✓ Paid' : '⚠ Pending'}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-400 text-xs">{f.paidOn ?? '—'}</td>
                  <td className="px-4 py-3 text-right">
                    {!editingFees && (
                      <button onClick={() => deleteFee(f.term)} className="text-red-400 hover:text-red-600 text-xs font-bold px-2 py-1 rounded hover:bg-red-50">Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminFees;
