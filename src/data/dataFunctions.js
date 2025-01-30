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

//we take an array of assignment IDs (e.g. [G2C1L5, etc.]) and iterate.
//we extract the numbers in order from the id and concat them to their respective words (e.g. 'Grade', 'Chapter')
//we are then able to get the title of the assignment via our firebase db .get()
//returns the title of the assignment
//currently hardcoded to english

//comments are outdated as this function was rewritten to perform one task.
function convertIDToGradeChapterLesson(assignmentID){
  const regex = /G(\d+)C(\d+)L(\d+)/; 
  const matches = assignmentID.match(regex);
  const grade = matches[1];
  const chapter = matches[2];
  const lesson = matches[3];
  // console.log("HELLLO WORLD", [grade, chapter, lesson]);

  return [grade, chapter, lesson];
}

export {
  getGradeData,
  getLessonsData,
  convertIDToGradeChapterLesson,
};
