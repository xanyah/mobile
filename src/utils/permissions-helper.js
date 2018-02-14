export const roles = [
  'regular',
  'admin',
  'owner',
]

export const hasPermission = (role, minRole = 'regular') =>
  role && roles.indexOf(role) >= roles.indexOf(minRole)
