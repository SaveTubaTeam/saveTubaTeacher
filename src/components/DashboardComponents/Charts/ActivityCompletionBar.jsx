import { React, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  getAssignmentsData,
  getStudents,
  getMasteryAndMinigamesData,
} from "../../../data/dataFunctions";

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

function breakString(input) {
  const parts = input.match(/G(\d+)C(\d+)L(\d+)/);
  if (parts) {
    const grade = `Grade${parts[1]}`;
    const chapter = `Chapter${parts[2]}`;
    const lesson = `Lesson${parts[3]}`;
    // You can now use grade, chapter, and lesson constants as needed
    return [grade, chapter, lesson];
  }
}

const ActivityCompletionBar = ({ email, classCode }) => {
  const [assignments, setAssignments] = useState([]);
  const [totalStudents, setTotalStudents] = useState([]);
  const [activityNames, setActivityNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assignmentsData = await getAssignmentsData(email, classCode);
        const studentsData = await getStudents(classCode);
        setAssignments(assignmentsData);
        setTotalStudents(studentsData);

        if (assignmentsData.length === 0) {
          console.error("No assignments data found.");
          return;
        }

        if (!assignmentsData[0].numActivities) {
          console.error("numActivities not found in the first assignment.");
          return;
        }

        const allActivities = [];

        for (const assignment of assignmentsData) {
          let lessonNum = assignment.assignmentID;
          lessonNum = breakString(lessonNum);
          const lessonActivities = await getMasteryAndMinigamesData(
            lessonNum[0],
            lessonNum[1],
            lessonNum[2],
            "en"
          );

          for (const activity of lessonActivities) {
            if (!allActivities.includes(activity.navigation)) {
              allActivities.push(activity.navigation);
              console.log("Activity ID: ", activity.navigation);
            } else {
              console.log("Activity ID already exists");
            }
          }
          console.log("All Activities: ", allActivities);
        }
        setActivityNames(allActivities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [email, classCode]);

  
  const data = activityNames.map(activity => ({
    name: activity,
    students: 0
  }));


  return (
    <>
      <div className="chart-container">
        <h1 className="text-heading">Completion Rate By Activity</h1>
        <ResponsiveContainer>
          <BarChart data={data}>
            <Bar dataKey="students" fill="#74B72E" />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid
              stroke="#ccc"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              interval={"preserveStartEnd"}
              tick={{ fontSize: "14px", fontFamily: "Arial" }}
            />
            <YAxis
              tick={{ fontSize: "14px", fontFamily: "Arial" }}
              label={{
                value: "Completion Rate (%)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fill: "#666",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ActivityCompletionBar;
