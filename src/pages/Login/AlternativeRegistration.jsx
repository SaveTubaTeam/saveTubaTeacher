import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { auth, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import logoDarkText from '../../assets/logoDarkText.png'

//TODO: add toasts for success & prefer google signin
export default function AlternativeRegistration() {
   const navigate = useNavigate();
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

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

            <button className="altSignIn" onClick={() => console.log("hi")}>
               Register
            </button>

            <button className="altSignIn" id="return" onClick={() => navigate("/alt-login")}>
               Return
            </button>
         </div>
      </div>
   );
}