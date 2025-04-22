import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./CompletionTimeline.css"
import { getTimeRange, getStudentCompletionStatsOverTimeRange } from "./calculateCompletionTimelineStatistics";
import { ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useTranslation } from 'react-i18next'; //needed for translations

export default function CompletionTimeline({ studentsArray }) {
  const selectedAssignment = useSelector(state => state.currentClass.selectedAssignmentObject);
  const [timelineData, setTimelineData] = useState(null); //this is for the data in our timeline
  const { t } = useTranslation(); //needed for translations

  useEffect(() => {
    if(!selectedAssignment) { return; } //guard clause against no selected assignment

    const timeRangeArray = getTimeRange(selectedAssignment.dateDue);
    const studentCompletionStatsOverTimeRange = getStudentCompletionStatsOverTimeRange(studentsArray, timeRangeArray, selectedAssignment);
    setTimelineData(studentCompletionStatsOverTimeRange);

  }, [selectedAssignment]);

  if (!timelineData) {
    return (<h4 style={{ fontStyle: "italic" }}>Loading . . .</h4>); //rendering a loading message
  }

  //see here: https://recharts.org/en-US/examples/LineBarAreaComposedChart
  //we are only using the Area and Bar graphs from this composed chart example
  //see here for example axis labels: https://recharts.org/en-US/examples/ComposedChartWithAxisLabels
  //ReferenceLine: https://recharts.org/en-US/api/ReferenceLine
  //aligning bars to points on the x-axis can be done by changing the x-axis scale prop from "band" to "point"
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart width={500} height={400} data={timelineData} margin={{ top: 25, right: 20, bottom: 10, left: 10 }}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="day" scale="band" />
        <YAxis label={{ value: `${t("common:numCompletions")}`, angle: -90, position: 'outsideLeft', dx : -20 }}/> {/* Number of Completions */}
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="numAssignmentsInProgressOrComplete" fill="#c6d5ee" stroke="#88a7d7" name={`${t("common:overallAssignProg")}`} /> {/* Overall Assignment Progress */}
        <Bar dataKey="numActivityCompletions" barSize={12} fill="#5C9E59" name={`${t("common:activityCompletion")}`} /> {/*Activity Completions */}
        <ReferenceLine x={timelineData[timelineData.length - 1].day} label={{ value: "Due Date", angle: 60}} stroke="#D88679" strokeDasharray="3 3" strokeWidth={2} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}