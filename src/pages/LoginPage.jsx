import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { auth, provider } from './firebaseConfig';
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    signInWithPopup(auth, provider).then((result) => {
      const userEmail = result.user.email;
      setValue(userEmail);
      localStorage.setItem('user', JSON.stringify({ email: userEmail }));
      navigate('/dashboard'); // Navigate to dashboard after successful login
    })
    .catch((error) => {
      console.log(error.message);
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setValue(user.email);
      navigate('/dashboard'); // Navigate to dashboard if user session exists
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
            <button className="login-with-google-btn" onClick={handleClick}>
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;