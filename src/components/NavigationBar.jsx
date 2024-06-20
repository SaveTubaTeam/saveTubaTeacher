// Navbar.js
import * as React from 'react';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import iconic from '../assets/iconpic.png';
import ClassButton from './ClassButton';
import PlusButton from './PlusButton';

const Navbar = () => {
  const location = useLocation();
  const [highlightedButton, setHighlightedButton] = useState("");
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
      {location.pathname === '/' ? (
        <div className="sss"><Link to="/profile"><ClassButton title="Profile" /></Link></div>
      ) : (
        <div className="sss"><Link to="/"><ClassButton title="Home" /></Link></div>
      )}
      <div className="sss"><PlusButton title="+" /></div>
    </div>
  );
};

export default Navbar;
