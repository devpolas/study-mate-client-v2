export function passwordValidator(value) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
  const isCorrectPassword = passwordRegex.test(value);
  if (!isCorrectPassword) {
    return "Invalid Password!";
  }
  return true;
}
export function nameValidation(value) {
  if (!value) {
    return "Please Enter Your Full Name!";
  }
  if (value.trim().length < 3 || value.trim().length > 30) {
    return "Invalid Full Name!";
  }
  return true;
}

export function emailValidation(value) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmail = emailRegex.test(value);
  if (!isEmail) {
    return "Invalid Email Address!";
  }
  return true;
}
