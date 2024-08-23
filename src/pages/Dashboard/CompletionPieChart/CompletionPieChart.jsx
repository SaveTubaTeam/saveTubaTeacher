import React, { useState, useEffect } from "react";
import "./CompletionPieChart.css"
import { calculateStudentCompletionStatistics } from "./calculateStudentCompletionStatistics";
import { useSelector } from "react-redux";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

export default function CompletionPieChart({ studentsArray }) {
  const selectedAssignment = useSelector(state => state.currentClass.selectedAssignmentObject);

  let studentCompletionStatistics = calculateStudentCompletionStatistics(studentsArray, selectedAssignment);
  const data = [
    { name: 'Completed', value: studentCompletionStatistics.percentStudentsFullCompletion },
    { name: 'In Progress', value: studentCompletionStatistics.percentStudentsInProgress },
    { name: 'Not Started', value: studentCompletionStatistics.percentStudentsNotStarted },
  ];
  const COLORS = ['#5C9E59', '#D7B879', '#D88679']; //success, warning, error colors taken from index.css

  // @jac926 08/22/24 | below there are two special functions named "renderActiveShape"  and "renderCustomizedLabel"
  // which were originally boilerplate from the example docs. 
  // !!! these functions and their position variables have been heavily modified to fit the design of the pie chart !!!
  // Also note that the class components in the example docs were rewritten to functional components.
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
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

        <text x={ex + (cos >= 0 ? 1 : -1) * 6} y={ey} textAnchor={textAnchor} fill="#1A1A1A"style={{ fontWeight: "600" }}>
          {`${value}%`}
        </text>

        <text x={ex + (cos >= 0 ? -1 : 1) * 22} y={ey} dy={16} textAnchor={textAnchor} fill="#4E4E4E" style={{ fontSize: "0.8rem" }}>
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
            labelLine={false}
            label={renderCustomizedLabel}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="75%"
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