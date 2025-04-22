import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./CompletionTimeline.css"
import CompletionTimeline from "./CompletionTimeline";
import { useTranslation } from 'react-i18next'; //needed for translations


export default function TimelineContainer({ studentsArray }) {
  const selectedAssignment = useSelector(state => state.currentClass.selectedAssignmentObject);
  const { t } = useTranslation(); //needed for translations
  

  let content;
  if(studentsArray === null) {
    content = null;
  } else if(selectedAssignment === null) {
    content = (<h4 style={{ fontStyle: "italic" }}>No Assignment Selected</h4>);
  } else {
    content = <CompletionTimeline studentsArray={studentsArray} />;
  }

  return (
    <div className="timelineContainer">

      <h2 style={{ paddingLeft: "1.5rem", paddingTop: "1rem", fontSize: "2.2rem" }}>
        {/* Assignment Completion Timeline */}
        {`${t("common:assignCompletionTimeline")}`}
      </h2>

      <div className="innerTimelineContainer">
        {content}
      </div>

    </div>
  )
}