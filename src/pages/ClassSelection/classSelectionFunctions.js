import { db } from "../../../firebase";

async function getAssignmentsCount(email, classCode) {
   try {
      const collectionRef = db.collection('teachers').doc(email).collection(`Assignments_${classCode}`);

      const snapshot = await collectionRef.get();
      let count;
      //see: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.QuerySnapshot#size
      snapshot.empty ? count = 0 : count = snapshot.size;
      console.log(`Assignments_${classCode} SIZE: ${count}`);

      return count;  

   } catch(error) {
      console.error("ERROR: getAssignmentCount failed:", error);
      return 0;
   }
}

export { getAssignmentsCount }