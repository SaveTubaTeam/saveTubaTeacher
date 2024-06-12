import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
      </div>
    );
  }
  return null;
};

const ActivityCompletionBar = ({
  data = [
    { name: "Mastery", students: 70 },
    { name: "Image Boom", students: 10 },
    { name: "Snapshot", students: 100 },
    { name: "Sorting", students: 100 },
    { name: "Reorder", students: 30 },
    { name: "Quiz", students: 90 },
    { name: "Memory", students: 60 },
  ]
}) => (
  <>
    <h1 className="text-heading">Completion Rate By Activity</h1>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <Bar dataKey="students" fill="#74B72E" barSize={70} radius={[10, 10, 0, 0]} />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" interval={"preserveStartEnd"} tick={{ fontSize: "14px", fontFamily: "Arial" }} />
        <YAxis tick={{ fontSize: "14px", fontFamily: "Arial" }} label={{ value: 'Completion Rate (%)', angle: -90, position: 'insideLeft', offset: 10, fill: '#666' }} />
      </BarChart>
    </ResponsiveContainer>
  </>
);

export default ActivityCompletionBar;
