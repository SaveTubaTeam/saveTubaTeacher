// firebaseConfig.js
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
const provider = new firebase.auth.GoogleAuthProvider();

//manually setting the authUser in localStorage for later use in ProtectedRoutes.jsx
async function setAuthPersistence() {
  try {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); //this line doesn't seem to work...
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('authUser', JSON.stringify(user)); //User is signed in, saving user data to local storage
      } else {
        localStorage.removeItem('authUser');
      }
    });
  } catch (error) {
    console.error("Error setting persistence:", error);
  }
}
setAuthPersistence();

//defining a function to retrieve the persisted user data from local storage if it exists
function getPersistedAuthUser() {
  const authUser = localStorage.getItem('authUser');
  return authUser ? JSON.parse(authUser) : null;
}

export { db, auth, storage, provider, firebase, getPersistedAuthUser };