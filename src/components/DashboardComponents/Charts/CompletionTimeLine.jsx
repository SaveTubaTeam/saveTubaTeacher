import "../../../App.css";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import moment from "moment";
import { useState, useEffect } from "react";
import { getAssignmentData } from "../../../data/dataFunctions";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <p className="label" style={{ fontWeight: "bold" }}>{`${label}`}</p>
        <p className="intro">{`Completion Rate: ${payload[0].value}%`}</p>
        <p className="desc">{`Number of Students: ${payload[0].payload.numStudents}`}</p>
      </div>
    );
  }
  return null;
};

export default function CompletionTimeLine({ email, classCode, assignmentID }) {
  const [assignment, setAssignment] = useState(null);
  const [dateAssigned, setDateAssigned] = useState(null);
  const [dateDue, setDateDue] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!email || !classCode || !assignmentID) return;

    const fetchData = async () => {
      try {
        let grade = "Grade" + assignmentID.substring(1, 2);
        let chapter = "Chapter" + assignmentID.substring(3, 4);
        let lesson = "Lesson" + assignmentID.substring(5);

        const assignmentData = await getAssignmentData(
          grade,
          chapter,
          lesson,
          email,
          classCode
        );

        setAssignment(assignmentData);
        setDateAssigned(moment(assignmentData.dateAssigned));
        setDateDue(moment(assignmentData.dateDue));

        const generateChartData = () => {
          const daysBetween = moment(assignmentData.dateDue).diff(moment(assignmentData.dateAssigned), 'days');
          const data = [];

          for (let i = 0; i <= daysBetween; i++) {
            const date = moment(assignmentData.dateAssigned).add(i, 'days');
            data.push({
              date: date.format('YYYY-MM-DD'),
              completionRate: Math.floor(Math.random() * 100), // Replace with actual data
              numStudents: `${Math.floor(Math.random() * 30)}/30` // Replace with actual data
            });
          }

          setChartData(data);
        };

        generateChartData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email, classCode, assignmentID]);

  return (
    <>
      <div className="chart-container">
        <h1 className="text-heading" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Assignment Completion Rate Over Time
        </h1>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: "14px", fontFamily: "Montserrat, sans-serif" }}
              interval={0}
              tickFormatter={(tick) => moment(tick).format('MM-DD')}
            />
            <YAxis
              tick={{ fontSize: "14px", fontFamily: "Montserrat, sans-serif" }}
            />
            <Legend
              payload={[
                {
                  value: "Completion Rate",
                  type: "line",
                  id: "ID01",
                  color: "green",
                  valueStyle: { fontFamily: "Montserrat, sans-serif" },
                },
              ]}
              wrapperStyle={{ fontFamily: "Montserrat, sans-serif" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line dataKey="completionRate" stroke="green" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
