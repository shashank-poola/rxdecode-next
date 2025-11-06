// API functions for authentication
const API_BASE_URL = 'http://localhost:3001';

export const apiLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },  
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Login error:', error);
    throw error;
  }
};

export const apiRegister = async (name: string, email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Register error:', error);
    throw error;
  }
};

export const apiGoogleLogin = async (userData: {
  id: string;
  email: string;
  name: string;
  imageUrl?: string;
  emailVerified?: boolean;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Google login failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Google Login error:', error);
    throw error;
  }
};

// Temporary: Store user data in localStorage for demo purposes
export const saveUserToStorage = (user: any) => {
  localStorage.setItem('rxdecode_user', JSON.stringify(user));
};

export const getUserFromStorage = () => {
  const user = localStorage.getItem('rxdecode_user');
  return user ? JSON.parse(user) : null;
};

export const clearUserFromStorage = () => {
  localStorage.removeItem('rxdecode_user');
};
