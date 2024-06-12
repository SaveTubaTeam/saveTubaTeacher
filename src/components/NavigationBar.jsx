import * as React from 'react';
import iconic from '../assets/iconpic.png';
import ClassButton from './ClassButton';

export default function Navbar() {
  return (
    <div className="navbar">
      <div><a className="imgs" href="#home"><img src={iconic} alt="picture of icon" /></a></div>
      <div className="sss"><ClassButton title = "Class 4 - A"/></div>
      <div className="sss"><ClassButton title = "Class 4 - B"/></div>
    </div>
  );
}
