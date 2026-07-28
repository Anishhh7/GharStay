import { api } from './client';

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
    update: (id, payload) => api.patch(`${path}/${id}`, payload),
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
export const users = crud('/users');

export const contact = {
  send: (payload) => api.post('/contacts', payload, { auth: false }),
  list: (params) => api.get('/contacts' + toQuery(params)),
};

export const dashboard = {
  summary: () => api.get('/dashboards'),
};

export const aiAssistant = {
  ask: (message, context) => api.post('/assistant', { message, context }),
};
