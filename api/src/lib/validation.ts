export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_REQUIREMENTS = {
  minLength: PASSWORD_MIN_LENGTH,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true,
}

export function validateEmail(email: string): {
  valid: boolean
  error?: string
} {
  if (!email) {
    return { valid: false, error: 'Email is required' }
  }
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' }
  }
  return { valid: true }
}

export function validatePassword(password: string): {
  valid: boolean
  error?: string
} {
  if (!password) {
    return { valid: false, error: 'Password is required' }
  }
  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    return {
      valid: false,
      error: `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters`,
    }
  }
  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one uppercase letter',
    }
  }
  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one lowercase letter',
    }
  }
  if (PASSWORD_REQUIREMENTS.requireNumber && !/\d/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number' }
  }
  if (
    PASSWORD_REQUIREMENTS.requireSpecial &&
    !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  ) {
    return {
      valid: false,
      error: 'Password must contain at least one special character',
    }
  }
  return { valid: true }
}

export function getPasswordStrengthMessage(): string {
  return `Password must be at least ${PASSWORD_MIN_LENGTH} characters and include uppercase, lowercase, number, and special character.`
}
