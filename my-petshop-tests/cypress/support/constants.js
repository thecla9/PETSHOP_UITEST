// cypress/support/constants.js

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  function generateRandomPhoneNumber() {
    const countryCode = '+1'; // Replace with your desired country code
    const digits = Math.floor(Math.random() * 10000000000); // Generate random 10-digit number
    return `${countryCode}${digits}`;
  }
  
  export const userData = {
    firstName: generateRandomString(6), // Generate random first name with maximum length of 6 characters
    lastName: generateRandomString(6), // Generate random last name with maximum length of 6 characters
    email: `testuser_${Math.random().toString(36).substring(7)}@example.com`, // Generate random email
    phoneNumber: generateRandomPhoneNumber(), // Generate random phone number with country code
    address: `${generateRandomString(10)}, ${generateRandomString(5)}, Country`, // Generate random address
    password: generateRandomString(10), // Generate random password
    confirmPassword: generateRandomString(10) // Generate random confirm password
  };
  