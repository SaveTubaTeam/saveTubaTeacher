import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { auth, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import logoDarkText from '../../assets/logoDarkText.png'

//TODO: add toasts for success & prefer google signin - also catch auth error codes
export default function AlternativeRegistration() {
   const navigate = useNavigate();
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   //createUserWithEmailAndPassword: https://firebase.google.com/docs/auth/web/password-auth
   //auth error codes: https://firebase.google.com/docs/reference/js/auth#autherrorcodes
  //if we successfully register, we add the user (and initial user metadata) to Firestore
   async function createUser() {
      try {
         await auth.createUserWithEmailAndPassword(email, password) //creating user
         console.log("\n\tUser Registered: ", auth.currentUser.email)
         await postUser(); //see below

         console.log("new teacher creation successful. Pushing back to alt-login . . .");
         navigate("/alt-login");

      } catch(error) {
         console.error("ERROR in createUser | Error Code: ", error.code, "| Message: ", error.message);
      }
   }

   //posting user to "users" and "classrooms" collection
   async function postUser(){
      await db.collection("teachers").doc(email).set({
         classes: [],
         firstName: firstName,
         lastName: lastName,
         email: email,
         photoURL: "", //empty photoURL
      });

      //resetting registration form for sanity
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
   } 

   return (
      <div className='background'>
      <img src={logoDarkText} alt="Logo Dark" id="logoDark" />

      <div style={{ padding: '3.5rem' }}></div>

         <div className="loginContainer">
            <h1 style={{ color: 'var(--primary)', width: '120%', alignSelf: 'center' }}>Create Account</h1>
            
            <input 
               placeholder='Email' 
               type='email' 
               id="emailInput"
               onChange={(event) => setEmail(event.target.value)}
            />
            <input 
               placeholder='Password' 
               type='password' 
               onChange={(event) => setPassword(event.target.value)}
            />
            <input 
               placeholder='First Name' 
               type='text' 
               onChange={(event) => setFirstName(event.target.value)}
            />
            <input 
               placeholder='Last Name' 
               type='text' 
               onChange={(event) => setLastName(event.target.value)}
            />

            <button className="altSignIn" onClick={createUser}>
               Register
            </button>

            <button className="altSignIn" id="return" onClick={() => navigate("/alt-login")}>
               Return
            </button>
         </div>
      </div>
   );
}