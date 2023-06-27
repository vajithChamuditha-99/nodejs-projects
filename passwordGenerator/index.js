const crypto = require('crypto');
const inquirer = require('inquirer');

// Function to generate a random password
const generatePassword = (length, includeNumbers, includeSymbols) => {
  // Define the characters that can be used in the password
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  if (includeNumbers) characters += '0123456789';
  if (includeSymbols) characters += '!@#$%^&*()';

  let password = '';

  // Generate a random character from the defined set of characters
  const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  };

  // Build the password by appending random characters
  while (password.length < length) {
    password += getRandomCharacter();
  }

  return password;
};

// Prompt the user for password generation options
const promptPasswordOptions = () => {
  return inquirer.prompt([
    {
      type: 'number',
      name: 'length',
      message: 'Enter the desired length of the password:',
      validate: (value) => {
        if (value < 1 || !Number.isInteger(value)) {
          return 'Please enter a positive integer for the length.';
        }
        return true;
      }
    },
    {
      type: 'confirm',
      name: 'includeNumbers',
      message: 'Include numbers in the password?'
    },
    {
      type: 'confirm',
      name: 'includeSymbols',
      message: 'Include symbols in the password?'
    }
  ]);
};

// Generate and display the password
const generateAndDisplayPassword = async () => {
  const options = await promptPasswordOptions();
  const password = generatePassword(options.length, options.includeNumbers, options.includeSymbols);
  console.log(`Generated Password: ${password}`);
};

// Start the password generation process
generateAndDisplayPassword();
