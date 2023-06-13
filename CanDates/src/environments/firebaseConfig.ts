// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS0EFf-My4-10zAq4qVNGHawRmJodHqoI",
  authDomain: "canidates.firebaseapp.com",
  databaseURL: "https://canidates-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "canidates",
  storageBucket: "canidates.appspot.com",
  messagingSenderId: "864453769156",
  appId: "1:864453769156:web:341b8e40ff46966a5e9691",
  measurementId: "G-23TBHPZDJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);