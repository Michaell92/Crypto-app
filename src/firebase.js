// Firebase data
import { initializeApp } from 'firebase/app';

import { getDatabase, ref, get, set, update } from 'firebase/database';

import { getAuth } from 'firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyBPymjqIpqnePCPmKgkn0vc5QttVU5Q6pY',
  authDomain: 'coinscanner-eac15.firebaseapp.com',
  databaseURL:
    'https://coinscanner-eac15-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'coinscanner-eac15',
  storageBucket: 'coinscanner-eac15.appspot.com',
  messagingSenderId: '209086802578',
  appId: '1:209086802578:web:6247c594a3c2c402d4d44b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get database
const database = getDatabase(app);

// Auth config
const auth = getAuth(app);

export { database, ref, get, set, auth, update };
