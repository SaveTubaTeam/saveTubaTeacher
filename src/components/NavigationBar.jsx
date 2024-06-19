// Navbar.js
import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';
import iconic from '../assets/iconpic.png';
import ClassButton from './ClassButton';
import PlusButton from './PlusButton';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      <div><Link className="imgs" to="/"><img src={iconic} alt="picture of icon" /></Link></div>
      <div className="sss"><ClassButton title="Class 4 - A" /></div>
      <div className="sss"><ClassButton title="Class 4 - B" /></div>
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
