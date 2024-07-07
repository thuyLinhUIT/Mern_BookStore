// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM9HoFTfEWeI045MnLTkyo-aOsOOUJUxs",
  authDomain: "mern-bookstore.firebaseapp.com",
  projectId: "mern-bookstore",
  storageBucket: "mern-bookstore.appspot.com",
  messagingSenderId: "983863300497",
  appId: "1:983863300497:web:08779bd2d42b02f96a4a30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
