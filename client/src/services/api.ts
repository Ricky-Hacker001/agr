/**
 * api.ts
 * Central API client for ARG Academy (FETCH VERSION)
 */

const BASE ='http://localhost:5000/api'; // ✅ FIXED (http + /api)

/** Get auth token */
const getToken = (): string | null =>
  sessionStorage.getItem('adminToken') ||
  sessionStorage.getItem('parentToken');

/** Generic request handler */
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // 🔥 Handle non-JSON errors safely
  let data;
  try {
    data = await res.json();
  } catch {
    data = { message: res.statusText };
  }

  if (!res.ok) {
    throw new Error(data.message || 'API Error');
  }

  return data;
}

/** API methods */
export const api = {
  get: <T>(ep: string) => request<T>(ep),

  post: <T>(ep: string, body: unknown) =>
    request<T>(ep, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(ep: string, body: unknown) =>
    request<T>(ep, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: <T>(ep: string) =>
    request<T>(ep, {
      method: 'DELETE',
    }),
};

export default api;