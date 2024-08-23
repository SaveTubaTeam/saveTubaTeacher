//this function calculates the number of students who have 
// 1) fully completed the given assignment (full completion)
// 2) completed only a few of the activities in the given assignment (in progress)
// 3) completed none of the activities in the given assignment (not started)

function calculateStudentCompletionStatistics(studentsArray, selectedAssignment) {
  const assignmentID = selectedAssignment.assignmentID;
  const numActivities = selectedAssignment.numActivities; //the number of activities in the given assignment
  console.log(`calculating student completion statistics for Pie Chart (${assignmentID}). . .`);
  
  let numStudentsFullCompletion = 0;
  let numStudentsInProgress = 0;
  let numStudentsNotStarted = 0;
  
  for(const student of studentsArray) {
    const studentCompletions = student.completionsArray;
    let individualStudentNumCompletions = 0;

    studentCompletions.forEach((completion) => {
      if(completion.completionID === undefined) { return; } //guard clause against undefined completion ID names

      if(completion.completionID.includes(assignmentID)) {
        individualStudentNumCompletions++;
      }
    });

    if(individualStudentNumCompletions === numActivities) { //the student fully completed this assignment
      numStudentsFullCompletion++;
    } else if(individualStudentNumCompletions > 0) { //the student has completed more than one activity (but not all in the assignment)
      numStudentsInProgress++;
    } else { //the student has not completed any activities in the given assignment.
      numStudentsNotStarted++;
    }
  }

  const result = { 
    percentStudentsFullCompletion: Math.round((numStudentsFullCompletion / studentsArray.length) * 100), 
    percentStudentsInProgress: Math.round((numStudentsInProgress / studentsArray.length) * 100),
    percentStudentsNotStarted: Math.round((numStudentsNotStarted / studentsArray.length) * 100),
  };
  return result;
}

export { calculateStudentCompletionStatistics };