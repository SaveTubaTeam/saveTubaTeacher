//all of the below functions return a new array (copy) so that we do not modify the original input array.
//these are pure functions to prevent object and array mutation side-effects
//in this file, the variable 'array' refers to the array of students.

function sortByLastName(array) {
  const newArray = [...array];

  const sortedArray = newArray.sort((a, b) => {
    if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) {
      return -1;
    }
    if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  console.log("STUDENT DATA GRID NOW SORTED BY LAST NAME:", sortedArray);
  return sortedArray;
}

function sortByFirstName(array) {
  const newArray = [...array];

  const sortedArray = newArray.sort((a, b) => {
    if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
      return -1;
    }
    if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  console.log("STUDENT DATA GRID NOW SORTED BY FIRST NAME:", sortedArray);
  return sortedArray;
}

function sortByLeastCompletions(array, assignmentID) {
  const newArray = [...array];

  const sortedArray = newArray.sort((a, b) => {
    const aCompletions = getStudentCompletionCount(a, assignmentID);
    const bCompletions = getStudentCompletionCount(b, assignmentID);

    return aCompletions - bCompletions; //ascending order
  });

  console.log("STUDENT DATA GRID NOW SORTED BY LEAST COMPLETIONS:", sortedArray);
  return sortedArray;
}

function sortByMostCompletions(array, assignmentID) {
  const newArray = [...array];

  const sortedArray = newArray.sort((a, b) => {
    const aCompletions = getStudentCompletionCount(a, assignmentID);
    const bCompletions = getStudentCompletionCount(b, assignmentID);

    return bCompletions - aCompletions; //descending order
  });

  console.log("STUDENT DATA GRID NOW SORTED BY MOST COMPLETIONS:", sortedArray);
  return sortedArray;
}

function getStudentCompletionCount(student, assignmentID) {
  const completionsArray = student.completionsArray;
  let studentCompletionCount = 0;

  console.log("student: ", student)
  console.log("assignmentID: ", assignmentID)

  completionsArray.forEach((completion) => {
    if(completion.completionID === undefined) { return; }

    if(completion.completionID.includes(assignmentID)) {
      console.log("task: ", completion)
      studentCompletionCount++;
    }
  })

  return studentCompletionCount;
}

export { sortByLastName, sortByFirstName, sortByLeastCompletions, sortByMostCompletions, getStudentCompletionCount }