import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import iconic from '../../assets/iconpic.png';
import ClassButton from './ClassButton';
import CreateClassButton from '../CreateClassComponent/CreateClassButton';
import { signOut } from "firebase/auth";
import { auth } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../../redux/teacherSlice';

const Navbar = ( {email} ) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [highlightedButton, setHighlightedButton] = useState("");


  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('user'); // Remove 'user' instead of 'email'
      navigate('/login');
      dispatch(signOutUser()); //clearing redux store teacherSlice
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
      <div className="sss"><CreateClassButton title="+" /></div>
      {location.pathname === '/profile' ? (
        <div className="sss"><Link to="/"><ClassButton title="Home" /></Link></div>
      ) : (
        <div className="sss"><Link to="/profile"><ClassButton title="Profile" /></Link></div>
      )}
      <div className="sss"><ClassButton title="Logout" onClick={handleLogout} /></div>
      {location.pathname=='/createassignment' ?(
        <div className="sss"><Link to="/"><ClassButton title="Home" /></Link></div>
        ):(<div className="sss"><Link to="/createassignment"><ClassButton title="Create Assignment"/></Link></div>)}
      {location.pathname=='/classselection' ?(
        <div className="sss"><Link to="/"><ClassButton title="Home" /></Link></div>
        ):(<div className="sss"><Link to="/classselection"><ClassButton title="Class Selection" /></Link></div>)}
    </div>
  );
};

export default Navbar;
