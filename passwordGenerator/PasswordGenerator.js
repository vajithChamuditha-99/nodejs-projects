const crypto = require('crypto');
const inquirer = require('inquirer');

// Function to generate a random password
const generatePassword = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

// Prompt the user for password length
inquirer
  .prompt([
    {
      type: 'number',
      name: 'length',
      message: 'Enter the length of the password:',
      validate: (value) => {
        if (value < 1) {
          return 'Password length must be at least 1.';
        }
        return true;
      },
    },
  ])
  .then((answers) => {
    const { length } = answers;
    const password = generatePassword(length);
    console.log(`Generated Password: ${password}`);
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });
