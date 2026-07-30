import { api, submitMultipart } from './client';

/**
 * Factory for a standard CRUD resource: GET list, GET one, POST, PUT, DELETE.
 * Every documented resource in the brief follows this REST shape — if a
 * specific endpoint deviates (e.g. nested routes, custom actions), extend
 * the returned object below rather than changing the factory.
 */
function crud(path) {
  return {
    list: (params) => api.get(path + toQuery(params)),
    get: (id) => api.get(`${path}/${id}`),
    create: (payload) => api.post(path, payload),
     createMultipart: (fields, files) => submitMultipart(path, { method: 'POST', fields, files }),
    update: (id, payload) => api.put(`${path}/${id}`, payload),
    remove: (id) => api.del(`${path}/${id}`),
  };
}

function toQuery(params) {
  if (!params || Object.keys(params).length === 0) return '';
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') usp.set(k, v);
  });
  const s = usp.toString();
  return s ? `?${s}` : '';
}

export const rooms = crud('/rooms');
export const packages = crud('/packages');
export const menu = crud('/menu-item');
export const gallery = crud('/gallery');
export const events = crud('/events');
export const blog = crud('/blogs');
export const testimonials = crud('/testimonials');
export const faq = crud('/faqs');
export const reservations = crud('/reservation');
// /users doesn't follow the generic crud() shape: creation is POST
// /createuser (not POST /), updates are PATCH (not PUT), and there's no
// GET /users/:id — only a list endpoint.
export const users = {
  list: (params) => api.get('/users' + toQuery(params)),
  create: (payload) => api.post('/users/createuser', payload),
  createBulk: (payloadArray) => api.post('/users/createuser/bulk', payloadArray),
  update: (id, payload) => api.patch(`/users/${id}`, payload),
  remove: (id) => api.del(`/users/${id}`),
};

export const contact = {
  send: (payload) => api.post('/contacts', payload, { auth: false }),
  list: (params) => api.get('/contacts' + toQuery(params)),
};

export const dashboard = {
  summary: () => api.get('/dashboards'),
};

export const aiAssistant = {
  // askAssitant only reads req.body.message — nothing else is used server-side.
  ask: (message) => api.post('/assitant', { message }),
};

// Admin management of the canned keyword -> answer entries the assistant
// matches against before falling back to Gemini.
//
// NOTE: chatbotRouter registers `POST /` twice — once for the public
// askAssitant (before the `protect` middleware) and once for the
// admin-only createChat (after it). Express matches the first handler
// registered for a given method+path, so askAssitant always wins and
// createChat is currently unreachable server-side. `create` below is
// wired to match the documented route, but it will hit askAssitant
// instead until that's fixed in chatbotRouter.js.
export const aiChatEntries = {
  list: (params) => api.get('/assitant' + toQuery(params)),
  create: (payload) => api.post('/assitant/entries', payload),
  update: (id, payload) => api.patch(`/assitant/entries/${id}`, payload),
  remove: (id) => api.del(`/assitant/entries/${id}`),
};

export const newsletter = {
  subscribe: (email) => api.post('/subscribers', { email }, { auth: false }),
};

export const website = {
  get: () => api.get('/website', { auth: false }),
  update: (payload) => api.put('/website', payload),
};
