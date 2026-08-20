export function validateEmail(value: string): string | null {
  if (!value.trim()) return 'Bitte eine E-Mail-Adresse eingeben.';
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return emailPattern.test(value.trim()) ? null : 'Bitte eine gültige E-Mail-Adresse eingeben.';
}

export function validatePhone(value: string): string | null {
  if (!value.trim()) return 'Bitte eine Telefonnummer eingeben.';
  // Accepts common German formats such as +49 30 123456 and 030 / 123456.
  const phonePattern = /^(?:(?:\+49|0049)\s?\(?0?\d{2,5}\)?|0\d{2,5})[\s./-]?\d[\d\s./-]{5,14}\d$/;
  return phonePattern.test(value.trim()) ? null : 'Bitte eine gültige deutsche Telefonnummer eingeben.';
}
