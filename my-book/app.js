
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Import the functions you need from the SDKs you need



import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVw7uM6oJUTX76XINUGdWcKtftZxrYY88",
  authDomain: "my-book-ce2a2.firebaseapp.com",
  projectId: "my-book-ce2a2",
  storageBucket: "my-book-ce2a2.firebasestorage.app",
  messagingSenderId: "373685498615",
  appId: "1:373685498615:web:f0f7aa905aec1d5137d9f2",
  measurementId: "G-DZJY3W92R8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

