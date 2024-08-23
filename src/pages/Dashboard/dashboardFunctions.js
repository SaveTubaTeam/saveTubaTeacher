import { db } from "../../../firebase";

//returns an array of objects, each one containing the assignment id under the attribute 'id'
async function getAssignments(email, classCode) {
  if (!email || !classCode) {
    console.error("Invalid arguments passed to getAssignments():", email, classCode);
    return [];
  }

  //console.log(`\n\tgetAssignments() called. Now in ${email} Assignments\n\t\tEMAIL:`, email);
  let assignmentsList = [];
  try {
    const snapshot = await db.collection("teachers").doc(email).collection(`Assignments_${classCode}`).get();

    snapshot.forEach((doc) => {
      assignmentsList.push(doc.data());
    });
  } catch (error) {
    console.log("Error in getAssignments():", error);
  }

  //console.log("Assignments: ", assignmentsList);
  return assignmentsList;
}

//returns a copied assignment object with a new attribute 'lessonData' which is the JSON
//lesson doc corresponding to this assignment.
//note the singular in the function var name. We get only one doc but iterate thru all assignments in our dashboard fetch.
async function getAssignmentLessonData(assignmentDoc, languageCode) {
  const newAssignmentObject = { ...assignmentDoc };
  let lessonData = {}
  const assignmentID = newAssignmentObject.assignmentID;
  //console.log(assignmentID);
  const regex = /G(\d+)C(\d+)L(\d+)/;

  try{
    const matches = assignmentID.match(regex);
    const grade = `Grade${matches[1]}`;
    const chapter = `Chapter${matches[2]}`;
    const lesson = `Lesson${matches[3]}`;

    const lessonSnapshot = await db.collection(grade).doc(chapter).collection(lesson).doc(languageCode).get();
    if (lessonSnapshot.exists) { lessonData = lessonSnapshot.data(); }

    return { ...newAssignmentObject, lessonData: lessonData };

  } catch(error) {
    console.log("ERROR in getAssignmentLessonData:", error);
    return { ...newAssignmentObject, lessonData: {} };
  }
}

async function getStudents(classCode) {
  try {
    //see: https://firebase.google.com/docs/firestore/query-data/queries#web_3
    const usersRef = db.collection('users');
    const classQuery = usersRef.where("classCode", "==", classCode);

    const studentSnapshot = await classQuery.get();
    const students = []
    studentSnapshot.forEach((student) => students.push(student.data()));

    //console.log("STUDENTS: ", students);
    return students;

  } catch(error) {
    console.error("ERROR in getStudents:", error);
    return null;
  }
}

//studentDoc refers to the student's document/object returned from .data()
async function getStudentCompletions(studentDoc) {
  const newStudentObject = { ...studentDoc } //destructuring for safe mutation
  const studentCompletionsArray = [];
  try {
    const studentCompletionsRef = db.collection("users").doc(studentDoc.email).collection("Completions");
    const studentCompletionsSnapshot = await studentCompletionsRef.get();

    if(studentCompletionsSnapshot.empty) { //guard clause for no completions
      return { ...newStudentObject, completionsArray: [] }; //empty completionsArray
    }

    studentCompletionsSnapshot.forEach((completion) => {
      studentCompletionsArray.push(completion.data());
    })

    //creating a new property on the copied student object w/ our completions array
    newStudentObject.completionsArray = studentCompletionsArray;
    return newStudentObject;

  } catch(error) {
    console.log("ERROR in getStudentCompletions:", error);
    return { ...newStudentObject, completionsArray: [] };
  }
}

export { getAssignments, getAssignmentLessonData, getStudents, getStudentCompletions };