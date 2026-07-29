const BASE_URL = import.meta.env.VITE_API_URL || 'https://gharstay-1.onrender.com/api/v1';
const TOKEN_KEY = 'gharstay_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

/**
 * Core request helper.
 * - Attaches JWT automatically when present.
 * - Throws ApiError with status + parsed body on non-2xx so callers can branch
 *   (e.g. 401 -> log out, 422 -> show field errors).
 */
async function request(path, { method = 'GET', body, auth = true, headers = {}, signal } = {}) {
  const finalHeaders = { ...headers };
  if (body !== undefined) finalHeaders['Content-Type'] = 'application/json';
  if (auth) {
    const token = getToken();
    if (token) finalHeaders['Authorization'] = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (networkErr) {
    throw new ApiError('Network error — is the API running at ' + BASE_URL + '?', 0, null);
  }

  let data = null;
  const text = await res.text();
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

export const api = {
  get: (path, opts) => request(path, { method: 'GET', ...opts }),
  post: (path, body, opts) => request(path, { method: 'POST', body, ...opts }),
  put: (path, body, opts) => request(path, { method: 'PUT', body, ...opts }),
  patch: (path, body, opts) => request(path, { method: 'PATCH', body, ...opts }),
  del: (path, opts) => request(path, { method: 'DELETE', ...opts }),
};

/**
 * Uploads a single file as multipart/form-data (for image/photo fields in
 * the admin panel). Deliberately bypasses `request()`'s JSON handling —
 * the browser needs to set its own multipart Content-Type with boundary,
 * so we must NOT set Content-Type manually here.
 *
 * Assumes the API exposes `POST /upload` accepting a `file` field and
 * returning a URL as `{ url }` or `{ data: { url } }`. Adjust the path
 * and field name below if your API differs (e.g. per-resource upload
 * routes, or a different multipart field name like `image`).
 */
export async function uploadFile(file, { path = '/upload', fieldName = 'file' } = {}) {
  const formData = new FormData();
  formData.append(fieldName, file);

  const headers = {};
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, { method: 'POST', headers, body: formData });
  } catch {
    throw new ApiError('Network error while uploading — is the API running at ' + BASE_URL + '?', 0, null);
  }

  const text = await res.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }

  if (!res.ok) {
    const message = (data && (data.message || data.error)) || `Upload failed (${res.status})`;
    throw new ApiError(message, res.status, data);
  }

  const url = data?.url || data?.data?.url || data?.imageUrl || data?.data?.imageUrl;
  if (!url) {
    throw new ApiError('Upload succeeded but no URL was returned — check the response shape from POST ' + path, res.status, data);
  }
  return url;
}

export { ApiError, BASE_URL };
