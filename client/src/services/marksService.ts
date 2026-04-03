import api from './api';

export const fetchAllMarks = () => api.get('/marks');
export const fetchStudentMarks = (studentId: string) => api.get(`/marks/${studentId}`);
export const addMarks = (data: unknown) => api.post('/marks', data);
