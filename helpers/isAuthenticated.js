export function isAuthenticated() {
  const user = authenticatedUser()
  if (typeof window !== 'undefined') {
    if (!user.is_email_verified) {
      return false
    }
    return Boolean(localStorage.token)
  }
}

export function authenticatedUser() {
  if (typeof window !== 'undefined' && localStorage.user && localStorage.log_pass) {
    return JSON.parse(localStorage.user)
  }

  return {}
}
