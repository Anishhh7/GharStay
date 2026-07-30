const BASE_URL = import.meta.env.VITE_API_URL || 'https://gharstay-1.onrender.com/api/v1';
const TOKEN_KEY = 'gharstay_token';

/**
 * Authentication Helpers
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

/**
 * Custom Error Class for API responses
 */
class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

/**
 * Helper to build URL query strings from an object
 */
function buildQueryString(params) {
  if (!params || Object.keys(params).length === 0) return '';
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value);
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Core Request Helper
 * - Automatically attaches JWT token when available.
 * - Parses query parameters if provided in options.
 * - Throws ApiError on non-2xx HTTP responses so calling functions can handle errors predictably.
 */
async function request(path, { method = 'GET', body, params, auth = true, headers = {}, signal } = {}) {
  const finalHeaders = { ...headers };

  // Set JSON header when a body is present
  if (body !== undefined) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  // Attach authorization header if requested
  if (auth) {
    const token = getToken();
    if (token) {
      finalHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  // Build target URL with optional query string
  const queryString = buildQueryString(params);
  const targetUrl = `${BASE_URL}${path}${queryString}`;

  let res;
  try {
    res = await fetch(targetUrl, {
      method,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (networkErr) {
    throw new ApiError(
      `Network error — is the API running at ${BASE_URL}?`,
      0,
      null
    );
  }

  // Parse response body
  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  // Handle non-2xx status codes
  if (!res.ok) {
    if (res.status === 401) {
      setToken(null);
      localStorage.removeItem('gharstay_user');
    }

    // Extract exact backend error message from AppError or standard JSON response
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${res.status}`;

    throw new ApiError(message, res.status, data);
  }

  return data;
}

/**
 * Exported API Client Methods
 */
export const api = {
  get: (path, opts) => request(path, { method: 'GET', ...opts }),
  post: (path, body, opts) => request(path, { method: 'POST', body, ...opts }),
  put: (path, body, opts) => request(path, { method: 'PUT', body, ...opts }),
  patch: (path, body, opts) => request(path, { method: 'PATCH', body, ...opts }),
  del: (path, opts) => request(path, { method: 'DELETE', ...opts }),
};

/**
 * Upload single file as multipart/form-data (for admin room images/photos).
 * Bypasses standard JSON request handling so browser sets boundary headers automatically.
 */
export async function uploadFile(file, { path = '/upload', fieldName = 'file' } = {}) {
  const formData = new FormData();
  formData.append(fieldName, file);

  const headers = {};
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers,
      body: formData,
    });
  } catch {
    throw new ApiError(
      `Network error while uploading — is the API running at ${BASE_URL}?`,
      0,
      null
    );
  }

  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) || `Upload failed (${res.status})`;
    throw new ApiError(message, res.status, data);
  }

  const url = data?.url || data?.data?.url || data?.imageUrl || data?.data?.imageUrl;
  if (!url) {
    throw new ApiError(
      `Upload succeeded but no URL was returned from POST ${path}`,
      res.status,
      data
    );
  }

  return url;
}
export async function submitMultipart(path, { method = 'POST', fields = {}, files = {} } = {}) {
  const formData = new FormData();
  Object.entries(fields).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (typeof v === 'boolean') formData.append(k, String(v));
    else if (Array.isArray(v)) v.forEach((item) => formData.append(k, item));
    else formData.append(k, v);
  });
  Object.entries(files).forEach(([fieldName, file]) => {
    if (file) formData.append(fieldName, file);
  });

  const headers = {};
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, { method, headers, body: formData });
  } catch {
    throw new ApiError('Network error — is the API running at ' + BASE_URL + '?', 0, null);
  }

  const text = await res.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }

  if (!res.ok) {
    if (res.status === 401) {
      setToken(null);
      localStorage.removeItem('gharstay_user');
    }
    const message = (data && (data.message || data.error)) || `Request failed (${res.status})`;
    throw new ApiError(message, res.status, data);
  }

  return data;
}

export { ApiError, BASE_URL };