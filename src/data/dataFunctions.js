import { db } from '../../firebase'; 

async function getGradeData(grade) {
  console.log(`\n\tgetGradeData() called. Now in ${grade} Chapters`);

  let chapterList = [];

  await db.collection(grade).get()
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
  console.log(`\n\tgetLessonsData() called. Now in ${grade} ${chpt} Lessons\n\t\tLANGUAGE_CODE:`, languageCode);

  console.log("Pulling lessons from DB");
  let lessonsList = [];
  let i = 1;
  
  while (i < 50) {
    try {
      let lessonReference = db.collection(grade).doc(chpt).collection(`Lesson${i}`).doc(languageCode);
      let lessonSnapshot = await lessonReference.get();
      if (!lessonSnapshot.exists) { break; }
      
      let lessonObject = {
        id: lessonSnapshot.id, // Use Firestore document ID as a unique identifier
        backgroundColor: "",
        navigation: "",
        thumbnail: "",
        title: "",
        masteryAndMinigames: []
      };

      await lessonReference.get().then((doc) => {
        const data = doc.data();
        lessonObject.backgroundColor = data.backgroundColor;
        lessonObject.navigation = data.navigation;
        lessonObject.thumbnail = data.thumbnail;
        lessonObject.title = data.title;
      }).catch((error) => {
        console.log("Error in getLessonsData():", error);
      });

      let masteryAndMinigamesList = []; 
      await lessonReference.collection("masteryAndMinigames").get().then((snapshot) => {
        snapshot.forEach((doc) => {
          masteryAndMinigamesList.push(doc.data());
        });
        lessonObject.masteryAndMinigames = masteryAndMinigamesList;
      }).catch((error) => {
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

export { getGradeData, getLessonsData };
