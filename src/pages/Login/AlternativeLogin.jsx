import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { auth, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { populateTeacherSlice } from '../../../redux/teacherSlice';
import logoDarkText from '../../assets/logoDarkText.png'
import { toast } from 'react-toastify';

export default function AlternativeLogin() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   async function handleEmailPasswordSignin() {
      try {

        if(email.trim() === "") { throw new Error("Please enter a valid email"); }
        //console.log(`Email: ${email}, Password: ${password}`);
        //please see: https://firebase.google.com/docs/auth/web/password-auth#web_3
        const result = await auth.signInWithEmailAndPassword(email, password);
        const user = result.user;
        console.log(user);

        await getTeacher(email);

        console.log(`logged in with: ${email}`)
        navigate("/class-selection");

      } catch(error) {

         if(error.code) {
            console.error(`ERROR WITH EMAIL/PASSWORD SIGNIN | Error Code: ${error.code} | ${error.message}`);
            if(error.code === "auth/wrong-password") {
               toast.error(`Incorrect Password`);
            } else {
               toast.error(`Invalid Login`);
            }

         } else if(error.message == `Teacher doc does not exist`) {
            console.error(error);
            toast.error(`Please Create a Teacher Account to Continue`);

         } else if(error.message == `Please enter a valid email`) {
            console.error(error);
            toast.error(`Please enter a valid email`);

         }  else {
            console.error("ERROR in handleEmailPasswordSignin:", error);
            toast.error(`An error occured. Please try again or contact support.`);
         }

      }
   }

   async function getTeacher(email) {
      const teacherDoc = await db.collection('teachers').doc(email).get();

      if(!teacherDoc.exists) { 
         //edge case: user is authorized but teacher doc is non-existent. They most likely already have a 'users' account on the mobile app...
         throw new Error(`Teacher doc does not exist`);
      };

      const teacherData = teacherDoc.data();
      dispatch(populateTeacherSlice({ data: teacherData })); //dispatching to teacherSlice store
   }

   //see: https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email
   async function sendPasswordReset() {
      try {
         const notifyReset = toast.loading(`Sending Password Reset Email...`);
         if(await teacherExists() === false) { //guard clause
            console.error(`Teacher ${email} does not exist`);
            throw new Error(`Teacher DNE`);
         }

         await auth.sendPasswordResetEmail(email);
         toast.update(notifyReset, { render: `Reset password email sent to ${email}`, type: "success", isLoading: false, autoClose: 1500 });

      } catch(error) {
         console.error("ERROR in sendPasswordReset:", error);

         if(error.message === `Teacher DNE`) {
            toast.update(notifyReset, { render: `Teacher ${email} does not exist`, type: "error", isLoading: false, autoClose: 1500 });
         } else {
            toast.update(notifyReset, { render: `Invalid Email`, type: "error", isLoading: false, autoClose: 1500 });
         }

      }
   }

  //helper for sendPasswordReset
   async function teacherExists() {
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
            <h1>Teacher Login</h1>
            
            <input 
               placeholder='Email' 
               type='email' 
               style={{ marginTop: '2rem' }}
               onChange={(event) => setEmail(event.target.value)}
               />
            <input 
               placeholder='Password' 
               type='password' 
               onChange={(event) => setPassword(event.target.value)}
            />

            <button className="altSignIn" onClick={handleEmailPasswordSignin}>
               Sign in
            </button>

            <a className="smallText" id="forgotPassword" onClick={sendPasswordReset}>Forgot Password</a>

            <span className="smallText" id="or">Or</span>

            <button 
               className="altSignIn" 
               style={{ width: '65%', margin: 0 }} 
               onClick={() => navigate("/alt-registration")}
            >
               Create an Account
            </button>

            <button className="altSignIn" style={{ marginTop: '3rem' }} onClick={() => navigate("/")}>
               Return
            </button>
         </div>
      </div>
   );
}