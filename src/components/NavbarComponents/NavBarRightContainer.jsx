import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { useDispatch } from "react-redux";
import { signOutTeacher } from "../../../redux/teacherSlice";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import "./NavigationBar.css"
import { PiUserSquareFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from "react-router";

export default function NavBarRightContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //see: https://mui.com/material-ui/react-menu/#account-menu
  const [anchorElement, setAnchorElement] = useState(null); //for account menu dropdown
  const accountMenuOpen = Boolean(anchorElement);

  async function handleLogout() {
    try {
      console.log("LOGGING OUT USER");
      await auth.signOut();
      dispatch(signOutTeacher()); //clearing redux store teacherSlice
    } catch(error) {
      console.error("ERROR LOGGING OUT:", error);
    } finally {
      navigate('/login');
    }
  }

  return (
    <>
    <div className="navBarRightContainer" onClick={(event) => setAnchorElement(event.currentTarget)}>
      <PiUserSquareFill size="50px" color="var(--grey)" />
    </div>

    <Menu
      anchorEl={anchorElement}
      id="account-menu"
      open={accountMenuOpen}
      onClose={() => setAnchorElement(null)}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >

      <MenuItem 
        onClick={() => { 
          setAnchorElement(null);
          navigate("/class-selection");
        }} 
        sx={{ fontFamily: 'Montserrat' }}
      >
        <ListItemIcon>
          <ImBooks size="20px" color="var(--black-light)" />
        </ListItemIcon>
        Classrooms
      </MenuItem>
      <MenuItem 
        onClick={() => setAnchorElement(null)} 
        sx={{ fontFamily: 'Montserrat' }}
      >
        <ListItemIcon>
          <PiUserSquareFill size="20px" color="var(--black-light)" />
        </ListItemIcon>
        Account
      </MenuItem>

      <Divider />

      <MenuItem 
        onClick={() => setAnchorElement(null)} 
        sx={{ fontFamily: 'Montserrat' }}
      >
        <ListItemIcon>
          <IoMdSettings size="20px" color="var(--black-light)" />
        </ListItemIcon>
        Settings
      </MenuItem>

      <MenuItem 
        onClick={() => { 
          setAnchorElement(null);
          handleLogout();
        }} 
        sx={{ fontFamily: 'Montserrat' }}
      >
        <ListItemIcon>
          <MdLogout size="20px" color="var(--black-light)" />
        </ListItemIcon>
        Log Out
      </MenuItem>

    </Menu>
    </>
  );
}