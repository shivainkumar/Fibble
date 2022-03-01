// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvsjSBkAoDrecatwvCS_mcIG4vwkhkEcc",
  authDomain: "the-foodie-e20fd.firebaseapp.com",
  projectId: "the-foodie-e20fd",
  storageBucket: "the-foodie-e20fd.appspot.com",
  messagingSenderId: "745030661070",
  appId: "1:745030661070:web:1d6442636883570bbcb19f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export {app, db, storage}