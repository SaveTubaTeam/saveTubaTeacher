import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { auth, provider } from './firebaseConfig';
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import ClassButton from '../components/ClassButton';

function LoginPage() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    signInWithPopup(auth, provider).then((result) => {
      setValue(result.user.email);
      localStorage.setItem('email', result.user.email);
    })
    .catch((error) => {
      console.log(error.message);
    });
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setValue(email);
      navigate('/dashboard'); // Navigate to dashboard after successful login
    }
  }, [navigate]);

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Login</div>
        <div>
          {value ? (
            navigate('/dashboard')
          ) : (
          <button className="login-with-google-btn"  onClick={handleClick}>
          Sign in with Google
          </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
