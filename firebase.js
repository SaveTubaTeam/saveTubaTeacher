//NOTE: we are using compat instead of modular API
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCa8CJLDlxZav6LylYflDDQQbL_m8tTZGs", //This is the Google Cloud Console browser key inside of project savetuba-5e519
  authDomain: "savetuba-5e519.firebaseapp.com",
  projectId: "savetuba-5e519",
  storageBucket: "savetuba-5e519.appspot.com",
  messagingSenderId: "218900793188",
  appId: "1:218900793188:web:a1cc3aa38d180fc6815c71"
 };
 
 let app;
 //compat initialization
 if (firebase.apps.length === 0) {
   app = firebase.initializeApp(firebaseConfig);
 } else {
   app = firebase.app();
 }

//Please refer here for setup of new Firebase services: https://firebase.google.com/docs/web/setup
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage().ref(); //.ref() is a reference to the root of our bucket

export { db, auth, app, storage };