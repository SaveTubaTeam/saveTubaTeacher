import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import './ClassSelection.css';
import { getAssignmentsCount } from './classSelectionFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { signOutTeacher } from '../../../redux/teacherSlice';
import { clearClassSlice } from '../../../redux/currentClassSlice';
import { selectTeacher } from '../../../redux/teacherSlice';
import { ClassCard } from './ClassCards';
import { ImPlus } from "react-icons/im";
import { MdLogout } from "react-icons/md";
import { Tooltip } from '@mui/material';
import CreateClassPopup from './CreateClassComponent/CreateClassPopup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function ClassSelection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teacher = useSelector(selectTeacher);
  const [assignmentsCounts, setAssignmentsCounts] = useState({});
  const [createClassModalVisible, setCreateClassModalVisible] = useState(false);

  useEffect(() => {
    async function fetchAssignmentsCounts() {
      if(!teacher.classes) { return null; }

      // Fetch assignments count for each class
      const assignmentsCounts = {};
      for (const classObject of teacher.classes) {
        console.log(`\tClass ${classObject.classCode}: ${JSON.stringify(classObject, null, 2)}`);
        const count = await getAssignmentsCount(teacher.email, classObject.classCode);
        assignmentsCounts[classObject.classCode] = count;
      }

      setAssignmentsCounts(assignmentsCounts);
    };

    fetchAssignmentsCounts();
  }, [teacher]);
/* 
  useEffect(() => {
    console.log("AUTH:", auth);
    if(!auth.currentUser) { navigate("/"); }
  }, []) */

  function handleCreateClassClick() {
    console.log("Create Class popup is visible!");
    setCreateClassModalVisible(true);
  }

  function handleCreateClassClose() {
    console.log("Closed Create Class popup...");
    setCreateClassModalVisible(false);
  }

  function CreateAClass() {
    return (
      /* this div takes the .classCard css from ClassCards.css */
      <div className="classCard" id="cardCreateClass" onClick={handleCreateClassClick}>
        <ImPlus title="Create Class" size="0.8rem" style={{ color: 'var(--dark-grey)', paddingRight: '0.6rem' }}/>
        <span style={{ fontWeight: 600, color: 'var(--dark-grey)' }}>
          {t("common:createAClass")}
        </span>
      </div>
    )
  }

  async function handleLogout() {
    try {
      console.log("LOGGING OUT USER");
      dispatch(signOutTeacher()); //clearing redux store teacherSlice
      dispatch(clearClassSlice()); //clearing currentClassSlice
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
      <div id="classSelectionContainer">
        {/* <h1>Welcome, {teacher.firstName} {teacher.lastName}</h1> */}
        <h2>{t("common:yourClassrooms")}</h2>
        <h4 style={{ paddingTop: '0.7rem' }}>
          2024-2025
        </h4>
        <div className="classesGrid">
          {/* see: https://stackoverflow.com/questions/49268267/dealing-with-an-empty-array-when-using-map-in-react */}
          {teacher.classes && teacher.classes.length && teacher.classes.map((classObject, index) => (
            <ClassCard 
              key={index} 
              classObject={classObject}
              assignmentsCount={assignmentsCounts[classObject.classCode] || null}
            />
          ))}
          <CreateAClass />
        </div>
      </div>

      <div className="classSelectionFooter">
        <Tooltip title={t("common:logOut")} placement="top-start" arrow={true}>
        <button id="classSelectionFooterLogOut" onClick={handleLogout}>
          <MdLogout size="25px" />
        </button>
        </Tooltip>

        <button id="createClassButton" onClick={handleCreateClassClick}>
          <ImPlus title="Create Class" size="0.8rem" style={{ color: 'var(--light)', paddingRight: '0.6rem' }}/>
          <span>{t("common:createAClass")}</span>
        </button>
      </div>

      <CreateClassPopup open={createClassModalVisible} onClose={handleCreateClassClose} />
    </>
  );
};