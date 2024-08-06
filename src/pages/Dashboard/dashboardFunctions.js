import { db } from "../../../firebase";

async function getAssignmentsData(email, classCode) {
  if (!email || !classCode) {
    console.error("Invalid arguments passed to getAssignmentsData():", email, classCode);
    return [];
  }

  console.log(`\n\tgetAssignmentsData() called. Now in ${email} Assignments\n\t\tEMAIL:`, email);
  let assignmentsList = [];
  try {
    const snapshot = await db.collection("teachers").doc(email).collection(`Assignments_${classCode}`).get();

    snapshot.forEach((doc) => {
      assignmentsList.push(doc.data());
    });
  } catch (error) {
    console.log("Error in getAssignmentsData():", error);
  }

  console.log("Assignments: ", assignmentsList);
  return assignmentsList;
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

//studentDoc refers to the user's document/object returned from .data()
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

export { getAssignmentsData, getStudents, getStudentCompletions }