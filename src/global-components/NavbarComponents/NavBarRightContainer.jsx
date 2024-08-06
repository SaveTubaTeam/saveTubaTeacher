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
import { MdOutlineHelpOutline } from "react-icons/md";
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from "react-router";
import { Tooltip } from "@mui/material";
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

export default function NavBarRightContainer() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //see: https://mui.com/material-ui/react-menu/#account-menu
  const [anchorElement, setAnchorElement] = useState(null); //for account menu dropdown
  const accountMenuOpen = Boolean(anchorElement);

  async function handleLogout() {
    try {
      console.log("LOGGING OUT USER");
      dispatch(signOutTeacher()); //clearing redux store teacherSlice
      await auth.signOut();
    } catch(error) {
      console.error("ERROR LOGGING OUT:", error);
    } finally {
      toast.success(t("success:loggedOut"));
      navigate('/login');
    }
  }

  return (
    <>
    <div className="navBarRightContainer">

      <Tooltip title={t("common:backToClassrooms")} placement="bottom-end" arrow={true}>
        <div style={{ width: '100%', height: '100%' }} onClick={() => navigate("/class-selection")}>
        <ImBooks size="45px" color="var(--grey)" />
        </div>
      </Tooltip>

      <div onClick={(event) => setAnchorElement(event.currentTarget)}>
        <PiUserSquareFill size="50px" color="var(--grey)" />
      </div>
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
          filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.32))',
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

      {/* <MenuItem 
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
      </MenuItem> */}

      <MenuItem 
        onClick={() => {
          setAnchorElement(null);
          navigate("/account")
        }} 
        sx={{ fontFamily: 'Montserrat' }}
      >
        <ListItemIcon>
          <PiUserSquareFill size="20px" color="var(--black-light)" />
        </ListItemIcon>
        {t("common:account")}
      </MenuItem>

      <Divider />

      {/* <MenuItem 
        onClick={() => {
          setAnchorElement(null);
          navigate("/settings")
        }}
        sx={{ fontFamily: 'Montserrat' }}
      >
        <ListItemIcon>
          <IoMdSettings size="20px" color="var(--black-light)" />
        </ListItemIcon>
        Settings
      </MenuItem> */}

      <MenuItem 
        onClick={() => {
          setAnchorElement(null);
          navigate("/contact-support");
        }}
        sx={{ fontFamily: 'Montserrat' }}
      >
        <ListItemIcon>
          <MdOutlineHelpOutline size="20px" color="var(--black-light)" />
        </ListItemIcon>
        {t("common:help")}
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
        {t("common:logOut")}
      </MenuItem>

    </Menu>
    </>
  );
}