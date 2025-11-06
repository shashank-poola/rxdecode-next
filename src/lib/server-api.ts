const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function authGoogle(credential: string) {
  const res = await fetch(`${API_BASE}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ credential }),
  });
  if (!res.ok) throw new Error('Google auth failed');
  const data = await res.json();
  return data.user;
}

export async function getMe() {
  const res = await fetch(`${API_BASE}/me`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
}

export async function logoutSession() {
  await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

export async function loginWithPassword(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  return data.user;
}

export async function registerWithPassword(name: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error('Registration failed');
  const data = await res.json();
  return data.user;
}

 