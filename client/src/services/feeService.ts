import api from './api';

export const fetchAllFees = () => api.get('/fees');
export const updateFee = (data: { studentId: string; term: string; paid: boolean; paidOn: string | null }) =>
  api.put('/fees', data);
