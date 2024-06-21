import { React, useState, useEffect } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <p className="label">{`${label}`}</p>
        <p className="intro">{`Completion Rate: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};



const ActivityCompletionBar = ({ email, classCode }) => {
  const [assignments, setAssignments] = useState([]);
  const [totalStudents, setTotalStudents] = useState([]);
  const [totalCompleted, setTotalCompleted] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const assignmentsData = await getAssignmentsData(email, classCode);
      const studentsData = await getStudents(classCode); 
      const activityNum = assignmentsData.length / assignmentsData[0].numActivities;
      
      setAssignments(assignmentsData);
      setTotalStudents(studentsData);
    };
    fetchData();
  }, [email, classCode]);




  const data = [
    { name: "Mastery", students: 70 },
    { name: "Image Boom", students: 10 },
    { name: "Snapshot", students: 100 },
    { name: "Sorting", students: 100 },
    { name: "Reorder", students: 30 },
    { name: "Quiz", students: 90 },
    { name: "Memory", students: 60 },
  ];
  return (
    <>
      <div className="chart-container">
        <h1 className="text-heading">Completion Rate By Activity</h1>
        <ResponsiveContainer>
          <BarChart data={data}>
            <Bar dataKey="students" fill="#74B72E" />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" interval={"preserveStartEnd"} tick={{ fontSize: "14px", fontFamily: "Arial" }} />
            <YAxis tick={{ fontSize: "14px", fontFamily: "Arial" }} label={{ value: 'Completion Rate (%)', angle: -90, position: 'insideLeft', offset: 10, fill: '#666' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ActivityCompletionBar;
