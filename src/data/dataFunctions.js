import { db } from '../../firebase'; // Adjust the path as necessary

async function getGradeData(grade) {
  console.log(`\n\tgetGradeData() called. Now in ${grade} Chapters`);

  if (!grade) throw new Error("Grade is required");

  const chapterList = [];

  try {
    const snapshot = await db.collection(grade).get();
    snapshot.forEach((doc) => {
      chapterList.push(doc.data());
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }

  console.log("chapterList array:", chapterList);
  return chapterList;
};


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

async function getMasteryAndMinigamesData(grade, chpt, lesson, languageCode) {
  console.log(`\n\tgetMasteryAndMinigames() called. Now in ${grade} ${chpt} ${lesson}\n\t\tLANGUAGE_CODE:`, languageCode);
  console.log(`Pulling ${lesson} mastery and minigames from DB`);

  let masteryAndMinigamesReference = db.collection(grade).doc(chpt).collection(lesson).doc(languageCode).collection("masteryAndMinigames");

  // now getting masteryAndMinigames array
  let masteryAndMinigamesList = []; 
  await masteryAndMinigamesReference.get().then((snapshot) => {
      snapshot.forEach((doc) => { // moving through the snapshot objects individually
          masteryAndMinigamesList.push(doc.data());
      });
  }).catch((error) => {
      console.log("Error in getLessonsData():", error);
  });

  console.log("masteryAndMinigames:", masteryAndMinigamesList);
  return masteryAndMinigamesList;
}


async function getAssignmentsData(email, classCode) {
  if (!email || !classCode) {
    console.error("Invalid arguments passed to getAssignmentsData():", email, classCode);
    return [];
  }

  console.log(`\n\tgetAssignmentsData() called. Now in ${email} Assignments\n\t\tEMAIL:`, email);
  let assignmentsList = [];
  try {
    
    const snapshot = await db
      .collection("teachers").doc(email).collection(`Assignments_${classCode}`).get();

    snapshot.forEach((doc) => {
      assignmentsList.push(doc.data());
      
    });
  } catch (error) {
    console.log("Error in getAssignmentsData():", error);
  }

  console.log("Assignments: ", assignmentsList);
  return assignmentsList;
}



async function getAssignmentData(grade, chpt, lesson, email, classCode) {
  console.log(
    `\n\tgetAssignmentData() called. Now in ${grade} ${chpt} ${lesson} Assignments\n\t\tGRADE:`,
    grade
  );

  let allAssignments = {
    assignmentID: [],
    assignmentData: [],
  };
  
  try {
    const snapshot = await db
      .collection("teachers")
      .doc(email)
      .collection("Assignments_" + classCode)
      .get();
      
    snapshot.forEach((doc) => {
      allAssignments.assignmentData.push(doc.data());
      allAssignments.assignmentID.push(doc.id);
    });
  } catch (error) {
    console.log("Error in Getting All Assignment Information", error);
  }

  const gradeNum = "G" + grade.substring(5); // Assuming grade is "GradeX"
  const chapterNum = "C" + chpt.substring(7); // Assuming chapter is "ChapterX"
  const lessonNum = "L" + lesson.substring(6); // Assuming lesson is "LessonX"
  const assignmentName = gradeNum + chapterNum + lessonNum;
  let finalAssignment = "";
  console.log("Assignment Name: ", assignmentName);

  try {
    for (let i = 0; i < allAssignments.assignmentID.length; i++) {
      if (assignmentName === allAssignments.assignmentID[i]) {
        console.log("Assignment Found", allAssignments.assignmentID[i]);
        finalAssignment = allAssignments.assignmentData[i];
        break; // Exit loop once the assignment is found
      }
    }
    console.log("Assignment: ", finalAssignment);
  } catch (error) {
    console.log("Error in getAssignmentData():", error);
  }
  return finalAssignment;
}

async function getCompletionsData(email) {
  // console.log(
  //   `\n\tgetCompletionsData() called. Now in ${email} Completions\n\t\tEMAIL:`,
  //   email
  // );
  let completionsList = [];
  try {
    await db
      .collection("users")
      .doc(email)
      .collection("Completions")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          completionsList.push(doc.data());
        });
      });
  } catch (error) {
    console.log("Error in getCompletionsData():", error);
  }

  //console.log("Completions: ", completionsList);
  return completionsList;
}
async function getCompletionData(grade, chpt, lesson, activity, email) {
  console.log(
    `\n\tgetCompletionData() called. Now in ${grade} ${chpt} ${lesson} ${activity} Completions\n\t\tEMAIL:`,
    email
  );
  const completion = {
    submissionTime: "",
  };
  let allCompletions = [];
  let allCompletionNames = [];
  try {
    await db
      .collection("users")
      .doc(email)
      .collection("Completions")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          allCompletions.push(doc.data());
          allCompletionNames.push(doc.id);
        });
      });
  } catch (error) {
    console.log("Error in Getting All Completion Information", error);
  }

  const gradeNum = "G" + grade.substring(5);
  const chapterNum = "C" + chpt.substring(7);
  const lessonNum = "L" + lesson.substring(6);
  const completionName = gradeNum + chapterNum + lessonNum + "_" + activity;
  console.log("Completion Name: ", completionName);

  try {
    for (let i = 0; i < allCompletionNames.length; i++) {
      if (completionName === allCompletionNames[i]) {
        completion.submissionTime = allCompletions[i].submissionTime;
        break;
      }
      // else{
      //   console.log("Completion not found");
      // }
    }
    //console.log("Completion: ", completion);
  } catch (error) {
    console.log("Error in getCompletionData():", error);
  }
  return completion;
}

async function getStudents(classCode) {
  try {
    //see: https://firebase.google.com/docs/firestore/query-data/queries#web_3
    const usersRef = db.collection('users');
    const classQuery = usersRef.where("classCode", "==", classCode);

    const studentSnapshot = await classQuery.get();
    const students = []
    studentSnapshot.forEach((student) => students.push(student.data()));

    console.log("Students: ", students);
    return students;

  } catch(error) {
    console.error("ERROR in getStudents:", error);
    return null;
  }
}

async function getCompletedPerAssignment(assignment, classCode) {
  let completed = 0;
  const students = await getStudents(classCode);
  const studentCompletions = [];
  console.log("Assignment: ", assignment);

  for (const student of students) {
    const userCompletionsSnapshot = await db
      .collection("users")
      .doc(student.email)
      .collection("Completions")
      .get();

    userCompletionsSnapshot.forEach((doc) => {
      let id = doc.id;
      if (id === assignment) {
        studentCompletions.push({ id, ...doc.data(), firstName: student.firstName, lastName: student.lastName});
      }
    });
  }

  console.log("Student Completions: ", studentCompletions);
  return studentCompletions;
}

async function getClassroomStudents(classCode) {
  let students = [];
  try{
    await db.collection("classrooms").get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if(doc.id === classCode){
          students = doc.data().students;
        }
      });
    });
  
  } catch (error) {
    console.log("Error in getting classroom students", error);
  }
  return students;
}

async function convertIDToName(idArray){
  const regex = /G(\d+)C(\d+)L(\d+)/; 
  let titleArray = []; 
  let lessonTitle = "";
  for(let i = 0; i < idArray.length; i++){
      const matches = idArray[i].assignmentID.match(regex);
      const grade = `Grade${matches[1]}`;
      const chapter = `Chapter${matches[2]}`;
      const lesson = `Lesson${matches[3]}`;
      const lessonInfo = await db.collection(grade).doc(chapter).collection(lesson).doc("en").get();
      lessonTitle = lessonInfo.data().title;
      titleArray.push(lessonTitle);
      lessonTitle = "";
    }
    return titleArray;
  }
  


export {
  getGradeData,
  getLessonsData,
  getAssignmentsData,
  getAssignmentData,
  getCompletionData,
  getCompletionsData,
  getStudents,
  getCompletedPerAssignment,
  getClassroomStudents,
  getMasteryAndMinigamesData,
  convertIDToName,
};
