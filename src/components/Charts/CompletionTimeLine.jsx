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
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#CCE882",
          padding: "5px",
          borderRadius: "5px",
          color: "black",
          opacity: "0.8",
          fontSize: "12px",
        }}
      >
        <p className="label">{`${label}`}</p>
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
      <h1 className="text-heading">Assignment Completion Rate Over Time</h1>
      <ResponsiveContainer width="125%" aspect={3}>
        <LineChart data={pdata} margin={{ right: 300 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={"preserveStartEnd"} tick={{ fontSize: '14px', fontFamily: 'Arial' }} />
          <YAxis tick={{ fontSize: '14px', fontFamily: 'Arial' }} />
          <Legend />
          <Tooltip content={<CustomTooltip />} />
          <Line dataKey="completionRate" stroke="green" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}


