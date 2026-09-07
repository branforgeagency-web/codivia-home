/**
 * Codivia MERN API Client
 * -------------------------------------------------------------
 * Provides lightweight REST API methods for authentication,
 * user registration, profile sync, and Razorpay payment.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const TOKEN_KEY = 'codivia_jwt_token';
export const USER_KEY = 'codivia_user_profile';

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);
export const setStoredToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeStoredToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

/**
 * Helper to make authenticated fetch requests with automatic JSON parsing
 */
async function request(endpoint, options = {}) {
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (err) {
    // If backend is offline or network error, provide a clear friendly error
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Backend server is currently offline. Please ensure the server is running on port 5000.');
    }
    throw err;
  }
}

/**
 * Register a new coder account
 */
export async function registerUser({ fullName, email, password, specialty }) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ fullName, email, password, specialty }),
  });

  if (data.token) {
    setStoredToken(data.token);
  }
  if (data.user) {
    setStoredUser(data.user);
  }

  return data;
}

/**
 * Sign in an existing coder
 */
export async function loginUser({ email, password }) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    setStoredToken(data.token);
  }
  if (data.user) {
    setStoredUser(data.user);
  }

  return data;
}

/**
 * Fetch current authenticated user profile
 */
export async function getMe() {
  const data = await request('/auth/me', {
    method: 'GET',
  });

  if (data.user) {
    setStoredUser(data.user);
  }

  return data;
}

/**
 * Create Razorpay order from backend
 */
export async function createBackendOrder() {
  return await request('/payment/create-order', {
    method: 'POST',
  });
}

/**
 * Verify Razorpay payment signature on backend
 */
export async function verifyBackendPayment({ orderId, paymentId, signature }) {
  const data = await request('/payment/verify-signature', {
    method: 'POST',
    body: JSON.stringify({ orderId, paymentId, signature }),
  });

  if (data.user) {
    setStoredUser(data.user);
  }

  return data;
}

/**
 * Sign out
 */
export function signOutUser() {
  removeStoredToken();
}
