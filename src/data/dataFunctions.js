import { db } from "../../firebase";

async function getGradeData(grade) {
  console.log(`\n\tgetGradeData() called. Now in ${grade} Chapters`);

  let chapterList = [];

  await db
    .collection(grade)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        chapterList.push(doc.data());
      });
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

  console.log("chapterList array:", chapterList);
  return chapterList;
}

async function getLessonsData(grade, chpt, languageCode) {
  console.log(
    `\n\tgetLessonsData() called. Now in ${grade} ${chpt} Lessons\n\t\tLANGUAGE_CODE:`,
    languageCode
  );

  console.log("Pulling lessons from DB");
  let lessonsList = [];
  let i = 1;

  while (i < 50) {
    try {
      let lessonReference = db
        .collection(grade)
        .doc(chpt)
        .collection(`Lesson${i}`)
        .doc(languageCode);
      let lessonSnapshot = await lessonReference.get();
      if (!lessonSnapshot.exists) {
        break;
      }

      let lessonObject = {
        id: lessonSnapshot.id,
        backgroundColor: "",
        navigation: "",
        thumbnail: "",
        title: "",
        masteryAndMinigames: [],
      };

      await lessonReference
        .get()
        .then((doc) => {
          const data = doc.data();
          lessonObject.backgroundColor = data.backgroundColor;
          lessonObject.navigation = data.navigation;
          lessonObject.thumbnail = data.thumbnail;
          lessonObject.title = data.title;
        })
        .catch((error) => {
          console.log("Error in getLessonsData():", error);
        });

      let masteryAndMinigamesList = [];
      await lessonReference
        .collection("masteryAndMinigames")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            masteryAndMinigamesList.push(doc.data());
          });
          lessonObject.masteryAndMinigames = masteryAndMinigamesList;
        })
        .catch((error) => {
          console.log("Error in getLessonsData():", error);
        });

      lessonsList.push(lessonObject);
      i++;
    } catch (error) {
      console.log("ERROR:", error);
      break;
    }
  }

  console.log("Lessons: ", lessonsList);
  return lessonsList;
}

async function getAssignmentsData(email) {
  console.log(
    `\n\tgetAssignmentsData() called. Now in ${email} Assignments\n\t\tEMAIL:`,
    email
  );
  let assignmentsList = [];
  try {
    await db
      .collection("teachers")
      .doc(email)
      .collection("Assignments")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          assignmentsList.push(doc.data());
        });
      });
  } catch (error) {
    console.log("Error in getAssignmentsData():", error);
  }

  console.log("Assignments: ", assignmentsList);
  return assignmentsList;
}

async function getAssignmentData(grade, chpt, lesson, email) {
  console.log(
    `\n\tgetAssignmentData() called. Now in ${grade} ${chpt} ${lesson} Assignments\n\t\tGRADE:`,
    grade
  );
  const assignment = {
    dateAssigned: "",
    dateDue: "",
    numActivities: "",
  };
  let allAssignments = [];
  let allAssignmentNames = [];
  try {
    await db
      .collection("teachers")
      .doc(email)
      .collection("Assignments")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          allAssignments.push(doc.data());
          allAssignmentNames.push(doc.id);
        });
      });
  } catch (error) {
    console.log("Error in Getting All Assignement Information", error);
  }

  const gradeNum = "G" + grade.substring(5);
  const chapterNum = "C" + chpt.substring(7);
  const lessonNum = "L" + lesson.substring(6);
  const assignmentName = gradeNum + chapterNum + lessonNum;
  console.log("Assignment Name: ", assignmentName);

  try {
    for(let i = 0; i < allAssignmentNames.length; i++) {
      if(assignmentName === allAssignmentNames[i]) {
        assignment.dateAssigned = allAssignments[i].dateAssigned;
        assignment.dateDue = allAssignments[i].dateDue;
        assignment.numActivities = allAssignments[i].numActivities;
        break;
      }
      else{
        console.log("Assignment not found");
      }
    }
    console.log("Assignment: ", assignment);
  } catch (error) {
    console.log("Error in getAssignmentData():", error);
  }

  return assignment;
  
}


export { getGradeData, getLessonsData, getAssignmentsData, getAssignmentData };
