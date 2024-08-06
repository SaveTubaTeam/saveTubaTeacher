import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { auth, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import logoDarkText from '../../assets/logoDarkText.png'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function AlternativeRegistration() {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   useEffect(() => {
      toast.info(`${t("common:havegoogle")} ${t("common:backtogooglelogin")}`, 
      { onClick: () => navigate("/") });
   }, []);

   //createUserWithEmailAndPassword: https://firebase.google.com/docs/auth/web/password-auth
   //auth error codes: https://firebase.google.com/docs/reference/js/auth#autherrorcodes
  //if we successfully register, we add the teacher (and initial teacher metadata) to Firestore
   async function createTeacher() {
      // see link for toast.loading & toast.update implementation: https://fkhadra.github.io/react-toastify/promise#toastloading

      // @jac927 07/18/24 | I decided against toast.promise because the implementation is kinda weird. 
      // The alternative, which is toast.update, is kinda jank imo but is easier to read within try-catch and async await.
      // Note: I found that the options object in toast.update(notify, options) can override the options in ToastContainer - I think this is a bug but idk. Workaround was to hardcode the autoClose property.
      const popup = toast.loading(t("loading:creatingAccount"));

      try {
         if(email.trim() === "") { throw new Error("Please enter a valid email"); }
         if(firstName.trim() === "") { throw new Error("Please enter a first name"); }
         if(lastName.trim() === "") { throw new Error("Please enter a last name"); }

         const checkEdgeCase = await db.collection('users').doc(email).get();
         if(checkEdgeCase.exists) { //edge case where the user already has a student account on mobile
            await auth.signInWithEmailAndPassword(email, password); //regular signin
         } else { //new account creation
            await auth.createUserWithEmailAndPassword(email, password);
         }
         console.log("\n\tTeacher:", auth.currentUser.email);

         await postTeacher();

         toast.update(popup, { render: `${t("success:accountCreated")}, ${firstName}!`, type: "success", isLoading: false, autoClose: 1500 });
         console.log("new teacher creation successful. Pushing back to /alt-login . . .");
         navigate("/alt-login");

      } catch(error) {

         if(error.code) {
            console.error(`ERROR: ${error.code} | ${error.message}`);
            if(error.code === "auth/email-already-in-use") { 
               toast.update(popup, { render: `${t("error:accountAlreadyExists")}`, type: "error", isLoading: false, autoClose: 1500 });
            } else if(error.code === "auth/invalid-email") {
               toast.update(popup, { render: `${t("error:enterValidEmail")}`, type: "error", isLoading: false, autoClose: 1500 });
            } else if(error.code === "auth/weak-password") {
               toast.update(popup, { render: `${t("error:weakPassword")}`, type: "warning", isLoading: false, autoClose: 1500 });
            } else {
               toast.update(popup, { render: `${t("error:errorOccured")}`, type: "error", isLoading: false, autoClose: 1500 });
            }

         } else if(error.message === "Please enter a valid email") {
            console.error(error);
            toast.update(popup, { render: `${t("error:enterValidEmail")}`, type: "error", isLoading: false, autoClose: 1500 });
         } else if(error.message === "Please enter a first name") {
            console.error(error);
            toast.update(popup, { render: `${t("error:enterFirstName")}`, type: "error", isLoading: false, autoClose: 1500 });
         } else if(error.message === "Please enter a last name") {
            console.error(error);
            toast.update(popup, { render: `${t("error:enterLastName")}`, type: "error", isLoading: false, autoClose: 1500 });
         }  else {
            console.error("ERROR in createTeacher:", error);
            toast.update(popup, { render: `${t("error:errorOccured")}`, type: "error", isLoading: false, autoClose: 1500 });
         }

      }
   }

   //posting teacher to "teachers" collection
   async function postTeacher(){
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
            <h1 style={{ color: 'var(--primary)', width: '120%', alignSelf: 'center' }}>
               {t("common:createAccount")}
            </h1>
            
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
            <input 
               placeholder={t("common:firstName")} 
               type='text' 
               onChange={(event) => setFirstName(event.target.value)}
            />
            <input 
               placeholder={t("common:lastName")} 
               type='text' 
               onChange={(event) => setLastName(event.target.value)}
            />

            <button className="altSignIn" onClick={createTeacher}>
               {t("common:register")}
            </button>

            <button className="altSignIn" style={{ marginTop: '2.5rem' }} onClick={() => navigate("/alt-login")}>
               {t("common:return")}
            </button>
         </div>
      </div>
   );
}