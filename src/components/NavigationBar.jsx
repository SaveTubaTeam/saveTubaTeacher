import * as React from 'react';
import iconic from '../assets/iconpic.png';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import classbutton from '/ClassButton';

export default function Navbar() {
  return (
    <div className="navbar">
      <a className="imgs" href="#home"><img src={iconic} alt="picture of icon" /></a>
      <a className="greeting">Hello(f)</a>
      <Stack direction="row" spacing={2}>
        <ClassButton title = "Class 4 - A"/>
        <ClassButton title = "Class 4 - B"/>
      </Stack>
    </div>
  );
}
