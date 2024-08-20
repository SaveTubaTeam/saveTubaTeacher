import React, { useEffect, useState } from "react";
import "./AssignmentCards.css";
import { sortAssignmentCards } from "./sortAssignmentCards";
import IndividualAssignmentCard from "./IndividualAssignmentCard";
import { useSelector } from "react-redux";

export default function AssignmentCards({ assignmentsArray }) {
  const [pastAssignments, setPastAssignments] = useState(null);
  const [upcomingAssignments, setUpcomingAssignments] = useState(null);
  const selectedAssignment = useSelector(state => state.currentClass.selectedAssignmentObject);

  useEffect(() => {
    if(assignmentsArray === null) { return; }

    const sortedAssignments = sortAssignmentCards(assignmentsArray);
    setPastAssignments(sortedAssignments[0]);
    setUpcomingAssignments(sortedAssignments[1]);
  }, [assignmentsArray]);

  return (
    <div className="assignmentCardsContainer">

      {selectedAssignment ? (
        <>
          <h2 id="assignmentCardsTop">{"Selected Assignment"}</h2>
          <IndividualAssignmentCard assignmentObject={selectedAssignment} key="helloPasserby!" doGlowAnimation={true}/>
        </>
      ) : null}

      <h2 style={{ marginTop: "20px" }}>Upcoming Assignments</h2>
      {upcomingAssignments && upcomingAssignments.map((assignmentObject) => (
        <IndividualAssignmentCard assignmentObject={assignmentObject} key={assignmentObject.assignmentID}/>
      ))}

      <h2 style={{ marginTop: "20px" }}>Past Assignments</h2>
      {pastAssignments && pastAssignments.map((assignmentObject) => (
        <IndividualAssignmentCard assignmentObject={assignmentObject} key={assignmentObject.assignmentID}/>
      ))}

      {/* the below element is a small spacer for y-axis overflow padding */}
      <div style={{ paddingBottom: "8px"}}></div>
    </div>
  );
}