// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUohBVTA9cWYGW1gN1NjBXiieCLZ9lWlg",
  authDomain: "shop-dad5c.firebaseapp.com",
  projectId: "shop-dad5c",
  storageBucket: "shop-dad5c.appspot.com",
  messagingSenderId: "105993787172",
  appId: "1:105993787172:web:d7e9d834ae67ef65ea85b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app