import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import iconic from '../assets/iconpic.png';
import ClassButton from './ClassButton';
import PlusButton from './PlusButton';
import { signOut } from "firebase/auth";
import { auth } from '../pages/firebaseConfig';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [highlightedButton, setHighlightedButton] = useState("");


  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('email');
      navigate('/login');
    }).catch((error) => {
      console.log(error.message);
    });
  };

  return (
    <div className="navbar">
      <div><Link className="imgs" to="/"><img src={iconic} alt="picture of icon" /></Link></div>
      <div className="sss"><ClassButton
          title="Grade 1"
          isHighlighted={highlightedButton === "Grade 1"}
          onClick={() => setHighlightedButton("Grade 1")}
        /></div>
      <div className="sss"><ClassButton
          title="Grade 2"
          isHighlighted={highlightedButton === "Grade 2"}
          onClick={() => setHighlightedButton("Grade 2")}
        /></div>
      {location.pathname === '/profile' ? (
        <div className="sss"><Link to="/"><ClassButton title="Home" /></Link></div>
      ) : (
        <div className="sss"><Link to="/profile"><ClassButton title="Profile" /></Link></div>
      )}
      <div className="sss"><PlusButton title="+" /></div>
      <div className="sss"><ClassButton title="Logout" onClick={handleLogout} /></div>
    </div>
  );
};

export default Navbar;
