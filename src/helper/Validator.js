export function userNameValidator(userName) {
  if (!userName) {
    return "User Name can't be empty.";
  }
  return '';
}

export function passwordValidator(password) {
  if (!password) {
    return "Password can't be empty.";
  }
  if (password.length < 5) {
    return 'Password must be at least 5 characters long.';
  }
  return '';
}
