import moment from "moment";
//@jac927 08/23/24 | in this file, performance does NOT matter because our list of students in this particular class is (and should probably always be) very small!


// in the below function, we get a time range of ~1.5 weeks before the due date, with each day leading up to the due date in an array
// each day is stored in this resultant array as a Moment.js object.
// Please note: 
// 1) a hardcoded time range of ~1.5 weeks may be a problem and discussion with teachers is needed to maximally avoid cutting off data!!!
// 2) the recharts graph's max y-value is dynamically set based on inputs! So we do not need to calculate it.
function getTimeRange(dateDue) {
  const dateDueNoHoursMinutesSeconds = dateDue.split(",")[0];
  const dateDueMoment = moment(dateDueNoHoursMinutesSeconds, "DD/MM/YYYY");
  const timeRangeArray = [];

  for(let i=0; i<9; i++) {
    //see here for .clone: https://momentjs.com/docs/#/parsing/moment-clone/
    //we clone to avoid modifying the original dateDueMoment
    //see here for .subtract: https://momentjs.com/docs/#/durations/subtract/
    const day = dateDueMoment.clone().subtract(i, "days");
    // const formattedDay = day.format('DD/MM/YYYY'); //see: https://momentjs.com/docs/#/displaying/
    timeRangeArray.push(day)
  }

  console.log("Time Range Array:", timeRangeArray);
  return timeRangeArray;
}

//iterate thru days then thru each student per day then thru each completion per student (so yes, O(n^3) time complexity -_-)
function getStudentCompletionStatsOverTimeRange(studentsArray, timeRangeArray, selectedAssignment) {
  const resultArray = [];

  for(const dayMoment of timeRangeArray) {
    const formattedDay = dayMoment.format('DD/MM/YYYY');

    let individualDayStatsObject = {
      numActivityCompletions: 0, //how many students completed an activity in the given assignment today?
      numAssignmentsInProgressOrComplete: 0, //how many students are in progress or complete for the given assignment today?
      day: formattedDay.slice(0, -5), //removing the year from x-axis labels
    }

    for(const student of studentsArray) {
      const studentCompletionsArray = student.completionsArray.filter(
        (completion) => {
          if (completion.completionID === undefined) { return false; } //skipping if completionID is undefined
          
          return completion.completionID.includes(selectedAssignment.assignmentID);
        }
      );

      let individualDayCompletionCount = 0;
      studentCompletionsArray.forEach((completion) => {
        const formattedSubmissionTime = completion.submissionTime.split(",")[0];
        if(formattedSubmissionTime.includes(formattedDay)) {
          individualDayStatsObject.numActivityCompletions++;
        }
        
        const completionMoment = moment(formattedSubmissionTime, 'DD/MM/YYYY');
        if(completionMoment.isSameOrBefore(dayMoment)) { //see: https://momentjs.com/docs/#/query/is-same-or-before/
          individualDayCompletionCount++;
        }
      })

      //now checking for a full completion or an in progress for this student on this day
      if(individualDayCompletionCount > 0) {
        individualDayStatsObject.numAssignmentsInProgressOrComplete++;
      }

    } //end of studentsArray iterator

    resultArray.push(individualDayStatsObject);

  } //end of timeRangeArray iterator

  const reversedResultArray = [ ...resultArray ].reverse(); //reversing for correct order
  console.log("finished calculating student completion statistics for Timeline:", selectedAssignment.assignmentID, reversedResultArray);
  return reversedResultArray;
}

export { getTimeRange, getStudentCompletionStatsOverTimeRange }