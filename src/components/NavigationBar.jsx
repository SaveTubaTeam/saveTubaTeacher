import * as React from 'react';
import iconic from '../assets/iconpic.png';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClassButton from './ClassButton';
import Stack from '@mui/material/Stack'

export default function Navbar() {
  return (
    <div className="navbar">
      <div><a className="imgs" href="#home"><img src={iconic} alt="picture of icon" /></a></div>
      <div class="sss"><ClassButton title = "Class 4 - A"/></div>
      <div class="sss"><ClassButton title = "Class 4 - B"/></div>
    </div>
  );
}
