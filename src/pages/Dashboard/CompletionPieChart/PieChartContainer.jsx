import React, { useState, useEffect } from "react";
import "./CompletionPieChart.css"
import { useSelector } from "react-redux";
import CompletionPieChart from "./CompletionPieChart.jsx";
import { useTranslation } from 'react-i18next'; //needed for translations


export default function PieChartContainer({ studentsArray }) {
  const selectedAssignment = useSelector(state => state.currentClass.selectedAssignmentObject);
  const { t } = useTranslation(); //needed for translations

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
        {/* Completion Rate */}
        {`${t("common:completionRate")}`}
      </h2>

      <div className="innerPieChartContainer">
        {content}
      </div>

    </div>
  )
}