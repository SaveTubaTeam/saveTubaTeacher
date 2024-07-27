import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { auth, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { populateTeacherSlice } from '../../../redux/teacherSlice';
import logoDarkText from '../../assets/logoDarkText.png'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function AlternativeLogin() {
   const { t } = useTranslation();
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
               toast.error(t("error:incorrectPassword"));
            } else {
               toast.error(t("error:invalidLogin"));
            }

         } else if(error.message == `Teacher doc does not exist`) {
            console.error(error);
            toast.error(t("error:pleaseCreateTeacherAccount"));

         } else if(error.message == `Please enter a valid email`) {
            console.error(error);
            toast.error(t("error:enterValidEmail"));

         }  else {
            console.error("ERROR in handleEmailPasswordSignin:", error);
            toast.error(t("error:errorOccured"));
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
         const notifyReset = toast.loading(t("loading:sendingPasswordReset"));
         if(await teacherExists() === false) { //guard clause
            console.error(`Teacher ${email} does not exist`);
            throw new Error(`Teacher DNE`);
         }

         await auth.sendPasswordResetEmail(email);
         toast.update(notifyReset, { render: `${t("success:resetPasswordEmailSent")} ${email}`, type: "success", isLoading: false, autoClose: 1500 });

      } catch(error) {
         console.error("ERROR in sendPasswordReset:", error);

         if(error.message === `Teacher DNE`) {
            toast.update(notifyReset, { render: `${t("common:teacher")} ${email} ${t("error:doesNotExist")}`, type: "error", isLoading: false, autoClose: 1500 });
         } else {
            toast.update(notifyReset, { render: `${t("error:enterValidEmail")}`, type: "error", isLoading: false, autoClose: 1500 });
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
            <h1>{t("common:teacherLogin")}</h1>
            
            <input 
               placeholder={t("common:email")} 
               type='email' 
               style={{ marginTop: '2rem' }}
               onChange={(event) => setEmail(event.target.value)}
               />
            <input 
               placeholder={t("common:password")} 
               type='password' 
               onChange={(event) => setPassword(event.target.value)}
            />

            <button className="altSignIn" onClick={handleEmailPasswordSignin}>
               {t("common:signIn")}
            </button>

            <a className="smallText" id="forgotPassword" onClick={sendPasswordReset}>
               {t("common:forgotPassword")}
            </a>

            <span className="smallText" id="or">
               {t("common:or")}
            </span>

            <button 
               className="altSignIn" 
               style={{ width: '65%', margin: 0 }} 
               onClick={() => navigate("/alt-registration")}
            >
               {t("common:createAccount")}
            </button>

            <button className="altSignIn" style={{ marginTop: '3rem' }} onClick={() => navigate("/")}>
               {t("common:return")}
            </button>
         </div>
      </div>
   );
}