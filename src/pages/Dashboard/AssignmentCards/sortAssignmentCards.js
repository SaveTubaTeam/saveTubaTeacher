import moment from "moment";

function sortAssignmentCards(assignmentsArray) {
  const currentTime = moment(); //no need to format the currentTime as we are using it only for date comparison in this function
  const assignmentsCopy = [ ...assignmentsArray ];
  //console.log(assignmentsArray);
  //console.log('CURRENTTIME:', currentTime);

  const sortedAssignments = assignmentsCopy.sort((a, b) => {
    return moment(a.dateDue, 'DD/MM/YYYY, HH:mm:ss').diff(moment(b.dateDue, 'DD/MM/YYYY, HH:mm:ss'));
  });

  const pastAssignments = sortedAssignments.filter((assignment) => {
    //see: https://momentjs.com/docs/#/query/is-before/
    return moment(assignment.dateDue, 'DD/MM/YYYY, HH:mm:ss').isBefore(currentTime);
  }).reverse(); //reversing so that the latest past assignment is at the top.

  const upcomingAssignments = sortedAssignments.filter((assignment) => {
    //see: https://momentjs.com/docs/#/query/is-same-or-after/
    return moment(assignment.dateDue, 'DD/MM/YYYY, HH:mm:ss').isSameOrAfter(currentTime)
  });

  console.log('PASTASSIGNMENTS:', pastAssignments);
  console.log('UPCOMINGASSIGNMENTS:', upcomingAssignments);

  const result = [pastAssignments, upcomingAssignments];
  return result;
}

export { sortAssignmentCards }