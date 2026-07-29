
import PERMISSIONS from '../config/permissions.js'

/**
 * Whether `role` can perform `action` on `resource`.
 * If the resource/action pair isn't in the config at all (e.g. GET rooms,
 * which the backend never restricts with restrictTo), it's treated as open
 * to any authenticated admin-panel user — matching how the real routers
 * only gate the verbs they explicitly list.
 */
export function can(role, resource, action) {
  const allowed = PERMISSIONS[resource]?.[action];
  if (!allowed) return true; // not restricted server-side
  return allowed.includes(role);
}