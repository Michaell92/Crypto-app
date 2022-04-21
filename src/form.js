// Local storage
const user = localStorage.getItem('currentUser');

if (user) location.href = '/index.html';

import { nav } from './nav';
import { database, ref, set, get, auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// Form data
const signInForm = document.getElementById('signin-form');
const signUpForm = document.getElementById('signup-form');
const warning = document.getElementById('warning');
const email = document.getElementById('form-email');
const password = document.getElementById('password');
const passwordRepeat = document.getElementById('passwordRepeat');

// Nav data
const signup = document.getElementById('signup');
const signout = document.getElementById('signout');
const userName = document.getElementById('username');

const form = document.getElementById('form-container');

const globalLink = 'https://api.coingecko.com/api/v3/global';

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  nav.getMarketData(globalLink);
});

if (signUpForm) {
  signUpForm.addEventListener('submit', validate);
} else {
  signInForm.addEventListener('submit', signIn);
}

// Validate form
function validate(e) {
  e.preventDefault();

  if (password.value !== passwordRepeat.value) {
    createWarning('Passwords do not match!');

    return;
  }

  if (password.value.length < 6) {
    createWarning('Password needs to be at least 6 characters!');

    return;
  }

  signUp();
}

// Create firebase account
function signUp() {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const userId = userCredential.user.uid;
      // Set storage
      localStorage.setItem('currentUser', email.value);

      const coins = JSON.parse(localStorage.getItem('coins'));

      // Get user details
      const userData = ref(database, '/userList' + '/' + userId + '/coins');

      // Save current settings
      set(userData, coins);

      // Show user
      showUser(email.value);

      // Change location
      // location.href = '/index.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use') {
        createWarning('Email already registered!');
      }
      // ...
    });
}

// Warning message
function createWarning(message) {
  warning.innerHTML = message;

  setTimeout(() => {
    warning.innerHTML = '';
  }, 2000);
}

function signIn(e) {
  e.preventDefault();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      localStorage.setItem('currentUser', email.value);

      // Get user details
      const userData = ref(database, '/userList' + '/' + user.uid + '/coins');

      // Show user
      showUser(email.value);

      // Get user details
      get(userData)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log(userData);
            // Update local storage
            localStorage.setItem('coins', JSON.stringify(userData));
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });

      // Change location
      // location.href = '/index.html';
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      warning.innerText = 'Wrong username or password!';
      console.log(error);

      setTimeout(() => {
        warning.innerHTML = '';
      }, 2000);
    });
}

function showUser(user) {
  // Remove login form
  signup.classList.add('hide-form');
  signout.classList.add('show-signout');

  // Show user
  userName.innerText = user;
}
