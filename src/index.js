/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
import css from './styles.css';

const form = document.querySelector('#formu');
const inputs = document.querySelectorAll('.fields');
const password = document.querySelector('#password');
const rPassword = document.querySelector('#r-password');

function showError(input, error) {
  if (input.validity.valueMissing) {
    error.textContent = 'Please, fill out this field';
  } else if (input.validity.typeMismatch) {
    error.textContent = `The entered value should be a ${input.name}`;
  } else if (input.validity.patternMismatch) {
    error.textContent = `${input.name} should match this pattern ${input.pattern}`;
  } else if (input.validity.tooShort) {
    error.textContent = `${input.name} should be at least ${input.minLength} characters you entered ${input.value.length}`;
  }
  input.classList.add('invalid-input');
  error.style.display = 'block';
}

inputs.forEach((input) => {
  const error = input.nextElementSibling;
  input.addEventListener('input', () => {
    if (input.validity.valid) {
      error.textContent = '';
      error.className = 'error';
      input.classList.remove('invalid-input');
      error.style.display = 'none';
    } else {
      showError(input, error);
    }
  });
});

form.addEventListener('submit', (e) => {
  let hasError = false;
  inputs.forEach((input) => {
    const error = input.nextElementSibling;
    if (!input.validity.valid) {
      showError(input, error);
      hasError = true;
    }
    if (input.name === 'r-password' && password.value !== rPassword.value) {
      error.textContent = 'Passwords dosent match';
      input.classList.add('invalid-input');
      error.style.display = 'block';
      hasError = true;
    }
  });
  if (hasError) {
    e.preventDefault();
  }
});
