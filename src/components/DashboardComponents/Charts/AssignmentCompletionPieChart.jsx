import { React, useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getAssignmentsData, getCompletionsData, getStudents } from "../../../data/dataFunctions";

const COLORS = ["#8BC34A", "#4CAF50"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label" style={{ fontWeight: "bold" }}>{`${payload[0].name}`}</p>
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      fontSize="16px"
      fontFamily="Montserrat, sans-serif"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AssignmentCompletionPieChart = ({ email, classCode }) => {
  const [assignments, setAssignments] = useState([]);
  const [totalStudents, setTotalStudents] = useState([]);
  const [totalCompleted, setTotalCompleted] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const assignmentsData = await getAssignmentsData(email, classCode);
      const studentsData = await getStudents(classCode);
      let totalCompleted = 0;
      for (const student of studentsData) {
        const completionData = await getCompletionsData(student.email);
        totalCompleted += completionData.length;
        // console.log("Total Completed:", totalCompleted);
        setTotalCompleted(totalCompleted);
      }
    
      setAssignments(assignmentsData);
      setTotalStudents(studentsData);
    };
    fetchData();
  }, [email, classCode]);


  let totalAssignments = 0;
  assignments.forEach(assignment => {
    totalAssignments += assignment.numActivities;
  });
  totalAssignments *= totalStudents.length;
  //console.log("Total Assignments:", totalAssignments);

  const defaultData = [
    { name: "Completed", value: totalCompleted },
    { name: "Not Completed", value: totalAssignments - totalCompleted}
  ];

  return (
    <div className="chart-container">
      <h1 className="text-heading">Total Activity Completion</h1>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={defaultData}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {defaultData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AssignmentCompletionPieChart;
