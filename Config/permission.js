export default {
 users: {
  create: ["superAdmin"],
  readAll: ["superAdmin"],
  update: ["superAdmin"],
  delete: ["superAdmin"]
 },

 rooms: {
  create: ["admin", "superAdmin"],
  update: ["admin", "superAdmin"],
  delete: ["admin", "superAdmin"]
 },

 packages: {
  create: ["admin", "superAdmin"],
  update: ["admin", "superAdmin"],
  delete: ["admin", "superAdmin"]
 },

 menu: {
  create: ["admin", "superAdmin"],
  update: ["admin", "superAdmin"],
  delete: ["admin", "superAdmin"]
 },
 gallery: {
  create: ["superAdmin"],
  update: ["superAdmin"],
  delete: ["superAdmin"]
 },
 events: {
  create: ["superAdmin"],
  update: ["superAdmin"],
  delete: ["superAdmin"]
 },
 blog: {
  create: ["superAdmin"],
  update: ["superAdmin"],
  delete: ["superAdmin"]
 },
 contact: {
  create: ["superAdmin"],
  readAll: ["superAdmin"],
  update: ["superAdmin"],
  delete: ["superAdmin"]
 },
 faq: {
  create: ["superAdmin"],
  update: ["superAdmin"],
  delete: ["superAdmin"]
 },
 testimonial: {
  create: ["superAdmin"],
  readAll: ["superAdmin"],
  update: ["superAdmin"],
  delete: ["superAdmin"]
 }
};
