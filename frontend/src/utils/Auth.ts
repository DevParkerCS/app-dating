export const isValidEmail = (email: string) => {
  // Email regex pattern to check basic email structure
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const isValidPassword = (password: string) => {
  // Password regex pattern to ensure:
  // - At least 7 characters long
  // - Contains at least one uppercase letter
  // - Contains at least one digit
  // - Contains at least one special character
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;
  return passwordPattern.test(password);
};
