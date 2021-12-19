/**
 *
 *
 * @param {string} email
 */
export const handleEmailValidation = (email: string) => {
  const regex = /^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*\s*[,]?\b)*$/;
  const isValid = regex.test(email);
  return isValid;
};