export function isValidEmail(value: string): boolean {
  if (!value || value.length === 0) {
    return false
  }
  const emailRegex = RegExp('^.+@.+\\..{2,}$')
  return emailRegex.test(value)
}
