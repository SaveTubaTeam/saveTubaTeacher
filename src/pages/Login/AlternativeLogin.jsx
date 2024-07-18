import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { auth, provider, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInTeacher } from '../../../redux/teacherSlice';
import logoDarkText from '../../assets/logoDarkText.png'

export default function AlternativeLogin() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   //TODO: handle error codes
   async function handleEmailPasswordSignin() {
      try {
        console.log(email, password);
        //please see: https://firebase.google.com/docs/auth/web/password-auth#web_3
        const result = await auth.signInWithEmailAndPassword(email, password);
        const user = result.user;
        console.log(user);

        await getTeacher(email);
  
        navigate("/classselection");
      } catch(error) {
        console.error(`ERROR WITH SIGNIN: ${error.message}`);
      }
   }

   //pasted from LoginPage.jsx
   async function getTeacher(email) {
      try {
      //TODO: replace w/ real user doc name
      const teacherDoc = await db.collection('teachers').doc(email).get();

         if(!teacherDoc.exists) { throw new Error(`ERROR --> handleEmailPassword failed to throw error for non-existent account`)}
         
         const teacherData = teacherDoc.data();
         dispatch(signInTeacher({ data: teacherData })); //dispatching to teacherSlice store

      } catch(error) {
      console.error(`ERROR w/ getTeacher: ${error.message}`)
      }
   }

   //TODO: add status toasts
   //see: https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email
   async function sendPasswordReset() {
      if(await userExists()) { //see below
        await auth.sendPasswordResetEmail(email);
      }
   }

  //helper for sendPasswordReset
   async function userExists() {
      const snapshot = await db.collection('teachers').doc(email).get();
      if(snapshot.exists) {
         console.log("teacher exists. sending password reset email to:", email);
         return true;
      } else {
         console.error(email, "not found within 'teachers' collection");
         return false;
      }
  }

  return (
      <div className='background'>
      <img src={logoDarkText} alt="Logo Dark" id="logoDark" />

      <div style={{ padding: '3.5rem' }}></div>

         <div className="loginContainer">
            <h1 style={{ color: 'var(--primary)' }}>Teacher Login</h1>
            
            <input 
               placeholder='Email' 
               type='email' 
               id="emailInput"
               onChange={(event) => setEmail(event.target.value)}
               />
            <input 
               placeholder='Password' 
               type='password' 
               id="passwordInput"
               onChange={(event) => setPassword(event.target.value)}
            />

            <button className="altSignIn" onClick={handleEmailPasswordSignin}>
               Sign in
            </button>

            <a id="forgotPassword" onClick={sendPasswordReset}>Forgot Password</a>

            <button className="altSignIn" id="return" onClick={() => navigate("/")}>
               Return
            </button>
         </div>
      </div>
   );
}