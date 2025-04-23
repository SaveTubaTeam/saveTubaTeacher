import React, { useState, useEffect } from "react";
import "./CompletionPieChart.css"
import { calculatePieChartStatistics } from "./calculatePieChartStatistics";
import { useSelector } from "react-redux";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import { useTranslation } from 'react-i18next'; //needed for translations


export default function CompletionPieChart({ studentsArray }) {
  const selectedAssignment = useSelector(state => state.currentClass.selectedAssignmentObject);
  let studentCompletionStatistics = calculatePieChartStatistics(studentsArray, selectedAssignment);
  const { t } = useTranslation(); //needed for translations

  const data = [
    { name: `${t("common:completed")}`, value: studentCompletionStatistics.percentStudentsFullCompletion }, //Completed
    { name: `${t("common:inProgress")}`, value: studentCompletionStatistics.percentStudentsInProgress }, //In progress
    { name: `${t("common:notStarted")}`, value: studentCompletionStatistics.percentStudentsNotStarted }, //Not started
  ];
  const COLORS = ['#5C9E59', '#D7B879', '#D88679']; //success, warning, error colors taken from index.css

  // @jac926 08/22/24 | below there are two special functions named "renderActiveShape"  and "renderCustomizedLabel"
  // which were originally boilerplate from the example docs. 
  // !!! these functions and their position variables have been heavily modified to fit the design of our pie chart !!!
  // Also note that the class components in the example docs have been rewritten to functional components.
  // see: https://recharts.org/en-US/examples/CustomActiveShapePieChart
  // see also: https://recharts.org/en-US/examples/PieChartWithCustomizedLabel
  // see also: https://recharts.org/en-US/examples/PieChartWithPaddingAngle

  const [activeIndex, setActiveIndex] = useState(0);
  //the underscore below indicates a purposefully unused parameter
  const onPieEnter = (_, index) => { setActiveIndex(index); };

  const renderActiveShape = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, value, name }) => {
    return (
      <g>
        <text x={cx} y={cy - 7} dy={8} textAnchor="middle" fill="#1A1A1A" style={{ fontSize: "2.2rem", fontWeight: "600" }}>
          {`${value}%`}
        </text>
        <text x={cx} y={cy + 20} dy={8} textAnchor="middle" fill={fill} style={{ fontSize: "1.2rem" }}>
          {name}
        </text>
        <Sector 
          cx={cx} cy={cy}
          innerRadius={innerRadius}
          outerRadius={(outerRadius + 1)}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, fill, value, name }) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 5) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10 + 3; //controls the data along the x-axis (higher == more to the right, lower == more to the left) 
    const ey = my + 5; //controls the data along the y-axis, higher value == move downwards, lower value == move higher
    const textAnchor = cos >= 0 ? 'start' : 'end';
    let textPosY = 16;
  

    // Adjust the position for 'In Progress'
    let adjustedY = ey;
    if (name === `${t("common:inProgress")}`) {
      adjustedY -= 20; // Move 'In Progress' text, line, and %data collectively higher
      textPosY = -17; //move just the "In Progress" text above the % data
    }

    // Adjust the position for 'Completed'
    // let adjustedYC = ey;
    if (name === `${t("common:completed")}`) {
      adjustedY += 10; // Move 'Completed' lower
    }

    //Rendering the pie chart data (percentages, lines, and text (in progress, completed, no started))
    return (
      <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${adjustedY}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={adjustedY} r={2} fill={fill} stroke="none" />

        {/* Renders & positions the % data */}
        <text x={ex + (cos >= 0 ? 1 : -1) * 6} y={adjustedY} textAnchor={textAnchor} fill="#1A1A1A"style={{ fontWeight: "600" }}>
          {`${value}%`}
        </text>

        {/* Renders & positions the text (In progress, Completed, or Not Startes) */}
        <text x={ex + (cos >= 0 ? -1 : 1) * 22} y={adjustedY} dy={textPosY} textAnchor={textAnchor} fill="#4E4E4E" style={{ fontSize: "0.8rem" }}>
          {name}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={600} height={600}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          labelLine={true}
          label={renderCustomizedLabel}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="65%"
          fill="#8884d8"
          dataKey="value"
          paddingAngle={4}
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}