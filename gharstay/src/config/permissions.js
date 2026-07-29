// Mirrors the backend's Config/permission.js exactly. Keep these two in
// sync — this file only controls what the UI shows/hides; the backend's
// restrictTo(...) is the real enforcement either way.
export default {
  users: {
    create: ['superAdmin'],
    readAll: ['superAdmin'],
    update: ['superAdmin'],
    delete: ['superAdmin'],
  },
  rooms: {
    create: ['admin', 'superAdmin'],
    update: ['admin', 'superAdmin'],
    delete: ['admin', 'superAdmin'],
  },
  packages: {
    create: ['admin', 'superAdmin'],
    update: ['admin', 'superAdmin'],
    delete: ['admin', 'superAdmin'],
  },
  menu: {
    create: ['admin', 'superAdmin'],
    update: ['admin', 'superAdmin'],
    delete: ['admin', 'superAdmin'],
  },
  gallery: {
    create: ['superAdmin'],
    update: ['superAdmin'],
    delete: ['superAdmin'],
  },
  events: {
    create: ['superAdmin'],
    update: ['superAdmin'],
    delete: ['superAdmin'],
  },
  blog: {
    create: ['superAdmin'],
    update: ['superAdmin'],
    delete: ['superAdmin'],
  },
  contact: {
    create: ['superAdmin'],
    readAll: ['superAdmin'],
    update: ['superAdmin'],
    delete: ['superAdmin'],
  },
  faq: {
    create: ['superAdmin'],
    update: ['superAdmin'],
    delete: ['superAdmin'],
  },
  testimonial: {
    create: ['superAdmin'],
    readAll: ['superAdmin'],
    update: ['superAdmin'],
    delete: ['superAdmin'],
  },
  reservation: {
    readAll: ['superAdmin', 'admin'],
    update: ['superAdmin', 'admin'],
    updateAll: ['superAdmin'],
    delete: ['superAdmin'],
  },
  dashboard: {
    readAll: ['superAdmin'],
  },
  website: {
    update: ['superAdmin'],
  },
  newsletter: {
    readAll: ['superAdmin'],
  },
  aibot: {
    readAll: ['admin', 'superAdmin'],
    update: ['admin', 'superAdmin'],
    create: ['admin', 'superAdmin'],
    delete: ['admin', 'superAdmin'],
  },
};