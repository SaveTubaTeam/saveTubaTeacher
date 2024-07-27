import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import "./CreateClassPopup.css"
import { fetchClassCodes, generateRandomCode } from "./classCreationFunctions";
import { useSelector } from "react-redux";
import { selectTeacher } from "../../../redux/teacherSlice";
import { useDispatch } from "react-redux";
import { populateTeacherSlice } from "../../../redux/teacherSlice";
import { db } from "../../../firebase";
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

const CreateClassPopup = ({ open, onClose }) => {
  const { t } = useTranslation();
  const teacher = useSelector(selectTeacher);
  const dispatch = useDispatch();
  const [className, setClassName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');

  //I decided to have this rather large function sit inside of this file because of convenient variable scope access
  async function handleFormSubmission() {
    const popup = toast.loading(t("loading:creatingClass")); //initializing toast promise

    try {
      if(gradeLevel.trim() === "") {
        toast.update(popup, { render: `${t("error:enterValidGrade")}`, type: "error", isLoading: false, autoClose: 1500 });
        return;
      }

      if(className.trim() === "") {
        toast.update(popup, { render: `${t("error:enterClassName")}`, type: "error", isLoading: false, autoClose: 1500 });
        return;
      }
      //checking if teacher doc exists
      const teacherRef = db.collection("teachers").doc(teacher.email);
      const teacherSnapshot = await teacherRef.get();
      if(!teacherSnapshot.exists) {
        toast.update(popup, { render: `${t("error:errorCreatingClass")}`, type: "error", isLoading: false, autoClose: 1500 });
        return;
      }

      const existingCodes = await fetchClassCodes();
      const newRandomClassCode = generateRandomCode(existingCodes);
      const newClassData = {
        classCode: newRandomClassCode,
        className: className,
        gradeLevel: gradeLevel,
      }

      //updating the teacher's Firestore doc
      const teacherData = teacherSnapshot.data(); //this teacherData is identical to the redux slice teacher. doesn't really matter
      const classesArray = teacherData.classes;
      const newClassesArray = [ ...classesArray, newClassData ]; //provided that classesArray is not null or undefined, this destructuring should be fine
      //see here for .update: https://firebase.google.com/docs/firestore/manage-data/add-data#web_19
      await teacherRef.update({ classes: newClassesArray }); //updating only the classes property in our Firestore document.

      //quick hack to remove the classes array from this object reference only
      delete teacherData.classes; //see here for delete keyword: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete

      //now adding the new class to our classrooms collection
      await db.collection("classrooms").doc(newRandomClassCode).set({
        ...newClassData, 
        //with the delete keyword above, I am achieving the same thing as --> ```teachers: [{ every property (i.e. teacher.firstName) besides teacher.classes }]```
        teachers: [{ ...teacherData }],
      });

      //Final Step: a successful class creation must trigger an automatic re-fetch of the teacher data in our redux slice, as the data in our browser is now out of sync with the newly posted class. 
      //            To fix this, we run getTeacher once more right before closing the popup.
      await getTeacher(teacher.email); //referring to the email in our redux slice but it doesn't really matter - we could have also done teacherData.email

      //success toast
      toast.update(popup, { render: `${className} ${t("success:successfullyCreated")}!`, type: "success", isLoading: false, autoClose: 1500 });

      onClose(); //calling onClose from props
      setClassName(''); //resetting form for sanity
      setGradeLevel('');
    } catch(error) {
      console.log("ERROR in handleFormSubmission:", error);
      toast.update(popup, { render: `${t("error:errorCreatingClass")}`, type: "error", isLoading: false, autoClose: 1500 });
    }
  }

  async function getTeacher(email) {
    const teacherDoc = await db.collection('teachers').doc(email).get();
    const teacherData = teacherDoc.data();
    dispatch(populateTeacherSlice({ data: teacherData })); //dispatching to teacherSlice store
  }

  return (
    <Dialog 
      fullWidth={true} 
      /* see: https://mui.com/material-ui/react-dialog/#optional-sizes */
      maxWidth="xs"
      open={open}
      onClose={onClose}
    >
      <div className="createClassDialog">
        <div className="createClassTitle">
          <h1 style={{ color: 'var(--light)' }}>
            {t("common:createClass")}
          </h1>
        </div>

        <div className="createClassFormEntry">
          <h4 style={{ marginTop: '1.7rem', marginBottom: '0.7rem' }}>
            <i>{t("common:enterClassName")}</i>
          </h4>
          <input 
            style={{ margin: '0', padding: '1rem 1rem' }} 
            placeholder="(e.g. Class A)" 
            onChange={(event) => setClassName(event.target.value)}
          />
          <p>{t("common:classNameDisplayText")}</p>

          <h4 style={{ marginTop: '1.7rem', marginBottom: '0.7rem' }}>
            <i>{t("common:selectAGrade")}</i>
          </h4>
          {/* the Select MUI component must be wrapped with a FormControl and given an InputLabel to behave as expected */}
          <FormControl fullWidth sx={{ margin: '0', width: '216px' }}>
            <InputLabel id="select-grade" sx={{ fontFamily: 'Montserrat' }}>
              {t("common:grades")}
            </InputLabel>
            {/* see: https://stackoverflow.com/questions/51387085/change-color-of-select-components-border-and-arrow-icon-material-ui */}
            <Select
              sx={{ 
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--light)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--tertiary)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--tertiary)' }
              }}
              labelId="select-grade"
              id="select-grade-component"
              value={gradeLevel}
              label={t("common:grades")}
              onChange={(event) => setGradeLevel(event.target.value)}
            >
              <MenuItem value="Grade2">{`${t("common:grade")} 2`}</MenuItem>
              <MenuItem value="Grade3">{`${t("common:grade")} 3`}</MenuItem>
              <MenuItem value="Grade4">{`${t("common:grade")} 4`}</MenuItem>
              <MenuItem value="Grade5">{`${t("common:grade")} 5`}</MenuItem>
            </Select>
          </FormControl>
          <p>{t("common:gradeLevelDisplayText")}</p>
        </div>

        <div className="createClassFormSubmission">
          <button 
            style={{ padding: '0.7rem 1.5rem', color: 'var(--light)', background: 'var(--dark-grey)' }}
            onClick={() => {
              onClose(); //calling onClose from props
              setClassName(''); //resetting form for a clean next popup
              setGradeLevel('');
            }}
          >
            {t("common:cancel")}
          </button>
          <button 
            style={{ padding: '0.7rem 1.5rem', color: 'var(--light)', background: 'var(--success)' }}
            onClick={async() => await handleFormSubmission()}
          >
            {t("common:submit")}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateClassPopup;