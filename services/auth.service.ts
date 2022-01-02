const isValidEmail = (email: string): boolean =>
  /.+@.+\.[A-Za-z]+$/.test(email);

export default isValidEmail;
