function EmailValidation(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

export { EmailValidation };
