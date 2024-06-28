import React from "react";
import Button from "@mui/material/Button";
import { db } from "../../firebase";

async function submitClassData(email, classCode, className, gradeLevel) {
  try {
    const teacherInfo = await db.collection("teachers").doc(email).get();
    const teacherData = teacherInfo.data();

    if (teacherData) {
      await db.collection("classrooms").doc(classCode).set({
        classCode: classCode,
        className: className,
        gradeLevel: gradeLevel,
        students: [],
        teacher: [
          {
            email: email,
            firstName: teacherData.firstName,
            lastName: teacherData.lastName,
          },
        ],
      });
    } else {
      console.error("Teacher data not found");
    }
  } catch (error) {
    console.error("Error submitting class data: ", error);
  }
  console.log(classCode);
console.log(className);
console.log(gradeLevel);
console.log(email);
}



const SubmitClassButton = ({ email, classCode, className, gradeLevel }) => {
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
