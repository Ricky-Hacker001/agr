import api from './api';

// ── Types ─────────────────────────────

export interface ParentSession {
  token: string;
  parentName: string;
  mobile: string;
  students: any[];
}

export interface AdminSession {
  token: string;
  username: string;
  role: string;
}

// ── Parent Login ─────────────────────

export const parentLogin = async (
  mobile: string,
  password: string
): Promise<ParentSession> => {
  try {
    // ✅ data comes directly
    const data = await api.post<ParentSession>('/auth/parent-login', {
      mobile,
      password,
    });

    // ✅ store session
    sessionStorage.setItem('parentToken', data.token);
    sessionStorage.setItem('parentSession', JSON.stringify(data));

    return data;
  } catch (err: any) {
    throw new Error(err.message || 'Login failed');
  }
};

// ── Admin Login ─────────────────────

export const adminLogin = async (
  username: string,
  password: string
): Promise<AdminSession> => {
  try {
    const data = await api.post<AdminSession>('/auth/admin-login', {
      username,
      password,
    });

    sessionStorage.setItem('adminToken', data.token);
    sessionStorage.setItem('adminSession', JSON.stringify(data));

    return data;
  } catch (err: any) {
    throw new Error(err.message || 'Login failed');
  }
};

// ── Logout ──────────────────────────

export const logoutParent = () => {
  sessionStorage.removeItem('parentToken');
  sessionStorage.removeItem('parentSession');
};

export const logoutAdmin = () => {
  sessionStorage.removeItem('adminToken');
  sessionStorage.removeItem('adminSession');
};