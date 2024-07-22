import React from "react";
import Button from "@mui/material/Button";
import { db, firebase } from "../../../firebase";
import { selectTeacher } from '../../../redux/teacherSlice';
import { useSelector } from 'react-redux';

async function submitClassData(email, classCode, className, gradeLevel) {
  try {
    const teacherInfo = await db.collection("teachers").doc(email).get();
    const teacherData = teacherInfo.data();
    const date = moment().format("DD/MM/YYYY h:mm:ss a");

    if (teacherData) {
      await db.collection("classrooms").doc(classCode).set({
        classCode: classCode,
        className: className,
        gradeLevel: gradeLevel,
        dateCreated: date,
        students: [],
        teacher: [
          {
            email: email,
            firstName: teacherData.firstName,
            lastName: teacherData.lastName,
          },
        ],
      });

      await db.collection("teachers").doc(email).update({
        classes: firebase.firestore.FieldValue.arrayUnion({
          classCode: classCode,
          className: className,
          gradeLevel: gradeLevel,
          dateCreated: date,
        }),
      });

      console.log("Class data submitted successfully");
    } else {
      console.error("Teacher data not found");
    }
  } catch (error) {
    console.error("Error submitting class data: ", error);
  }
}

const SubmitClassButton = ({ classCode, className, gradeLevel }) => {
  const teacher = useSelector(selectTeacher);
  const email = teacher.email;

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        style={{ fontFamily: "Montserrat, sans-serif" }}
        onClick={async () => await submitClassData(email, classCode, className, gradeLevel)}
      >
        Submit
      </Button>
    </div>
  );
};

export default SubmitClassButton;