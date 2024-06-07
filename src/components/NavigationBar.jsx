import * as React from 'react';
import iconic from '../assets/iconpic.png';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
  return (
    <div className="navbar">
      <a className="imgs" href="#home"><img src={iconic} alt="picture of icon" /></a>
      <a className="greeting">Hello(f)</a>
      <a className="sss" href="#class">Class</a>
      <span id="rightt">
        <a href="#" className="profile-icon"><AccountCircleIcon /></a>
      </span>
      <span id="ring">
        <a href="#"><CircleNotificationsIcon /></a>
      </span>
    </div>
  );
}
