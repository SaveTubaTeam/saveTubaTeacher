import React, { useState, useEffect } from "react";
import "./CompletionPieChart.css"
import { useSelector } from "react-redux";
import CompletionPieChart from "./CompletionPieChart.jsx";

//want: legend, tooltip, custom label
export default function PieChartContainer({ studentsArray }) {
  const selectedAssignment = useSelector(state => state.currentClass.selectedAssignment);
  //console.log("STUDENTSARRAY:", studentsArray);

  let content;
  if(studentsArray === null) {
    content = null;
  } else if(selectedAssignment === null) {
    content = (<h4 style={{ fontStyle: "italic" }}>No Assignment Selected</h4>);
  } else {
    content = <CompletionPieChart studentsArray={studentsArray} />;
  }

  return (
    <div className="pieChartContainer">

      <h2 style={{ paddingLeft: "1.5rem", paddingTop: "1rem", fontSize: "2.2rem" }} id="specialStickingPoint">
        Completion Rate
      </h2>

      <div className="innerContainer">
        {content}
      </div>

    </div>
  )
}