import "../../App.css";
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

// Sample chart data
const pdata = [
  {
    name: "Week 1",
    completionRate: 100,
    numStudents: "30/30",
  },
  {
    name: "Week 2",
    completionRate: 70,
    numStudents: "25/30",
  },
  {
    name: "Week 3",
    completionRate: 100,
    numStudents: "30/30",
  },
  {
    name: "Week 4",
    completionRate: 80,
    numStudents: "24/30",
  },
  {
    name: "Week 5",
    completionRate: 90,
    numStudents: "27/30",
  },
  {
    name: "Week 6",
    completionRate: 40,
    numStudents: "12/30",
  },
  {
    name: "Week 7",
    completionRate: 50,
    numStudents: "15/30",
  },
  {
    name: "Week 8",
    completionRate: 80,
    numStudents: "24/30",
  },
  {
    name: "Week 9",
    completionRate: 100,
    numStudents: "30/30",
  },
  {
    name: "Week 10",
    completionRate: 100,
    numStudents: "30/30",
  },
  {
    name: "Week 11",
    completionRate: 80,
    numStudents: "24/30",
  },
  {
    name: "Week 12",
    completionRate: 20,
    numStudents: "10/30",
  },
  {
    name: "Week 13",
    completionRate: 40,
    numStudents: "12/30",
  },
  {
    name: "Week 14",
    completionRate: 40,
    numStudents: "12/30",
  },
  {
    name: "Week 15",
    completionRate: 25,
    numStudents: "7/30",
  },
];

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

export default function CompletionTimeLine() {
  return (
    <>
    <div className="chart-container">
      <h1
        className="text-heading"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Assignment Completion Rate Over Time
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={pdata}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={"preserveStartEnd"}
            tick={{ fontSize: "14px", fontFamily: "Montserrat, sans-serif" }}
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