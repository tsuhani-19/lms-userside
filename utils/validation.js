/**
 * Validation utility functions
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {string} 
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return '';
};

/**
 * Validate phone number (10 digits)
 * @param {string} phone - Phone number to validate
 * @returns {string} Error message or empty string if valid
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  
  if (!phone || phone.trim() === '') {
    return 'Phone number is required';
  }
  
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return 'Phone number must be 10 digits';
  }
  
  return '';
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {string} Error message or empty string if valid
 */
export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return 'Password is required';
  }
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  
  return '';
};

/**
 * Validate name
 * @param {string} name - Name to validate
 * @returns {string} Error message or empty string if valid
 */
export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return 'Name is required';
  }
  
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  
  return '';
};

/**
 * Validate confirm password matches password
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirm password
 * @returns {string} Error message or empty string if valid
 */
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return 'Please confirm your password';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return '';
};
