import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { auth, provider, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInTeacher } from '../../../redux/teacherSlice';
import googleLogoButton from '../../assets/googleLogoButton.png'

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin() {
    try {
      //please see: https://firebase.google.com/docs/auth/web/google-signin
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      console.log(user);

      const email = user.email;
      await getTeacher(email);

      navigate("/classselection");
    } catch(error) {
      console.error(`ERROR WITH SIGNIN: ${error.message}`);
    }
  }

  // we get only the teacher's document and NOT their assignments collection. 
  // retrieving assignments is done after entry.
  async function getTeacher(email) {
    try {
      //TODO: replace w/ real user doc name
      const teacherDoc = await db.collection('teachers').doc('testteacher1@gmail.com').get();

      if(teacherDoc.exists) {
        const teacherData = teacherDoc.data();
        dispatch(signInTeacher({ data: teacherData })); //dispatching to teacherSlice store

      } else { //teacherDoc does not exist
        const newTeacherData = await createNewTeacherAccount(); //this new account will NOT have any assignments
        dispatch(signInTeacher({ data: newTeacherData })); //dispatching to teacherSlice store
      }
    } catch(error) {
      console.error(`ERROR w/ getTeacher: ${error.message}`)
    }
  }

  async function createNewTeacherAccount() {
    try {
      //re: https://firebase.google.com/docs/reference/js/v8/firebase.User
      const user = auth.currentUser; // currentUser should be defined here - else the auth error was caught in handleLogin()

      const name = parseDisplayName(user.displayName); //an array is returned. [0] is firstName, [1] is lastName

      const newTeacherData = {
        classes: [], //initialized as empty
        email: user.email,
        photoURL: user.photoURL,
        firstName: name[0],
        lastName: name[1],
      }
      await db.collection("teachers").doc(user.email).set(newTeacherData);

      return newTeacherData;
    } catch(error) {
      console.error(`ERROR w/ createNewTeacherAccount: ${error.message}`)
    }
  }

  return (
    <div className='background'>

      <div style={{ padding: '3.5rem' }}></div>
      <div className="loginContainer">
        <h1 style={{ color: 'var(--primary)' }}>Teacher Login</h1>
        
        <button id="googleSignIn" onClick={handleLogin}>
          <img src={googleLogoButton} alt="Google Logo" />
          <span>Log in with Google</span>
        </button>

        <button>Other</button>
      </div>

    </div>
  );
}

//@returns {string[]} index 0 is first name, index 1 is last name or empty string if it doesnt exist
//NOTE edge cases: 
// - this function is error-prone to first names with more than one word
function parseDisplayName(displayName) {
  try {
    const result = [];
    const parts = displayName.trim().split(' ');
    
    result.push(parts[0]); //first name

    if(parts.length === 1) { //no space for split found
      result.push(" "); //empty string for last name
    } else { //last name exists
      result.push(parts[1]);
    }

    return result;
  } catch(error) {
    console.error('Error parsing display name:', error.message);
  }
}

export default LoginPage;