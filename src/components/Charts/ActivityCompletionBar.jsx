import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ActivityCompletionBar = () => {
  const data = [
    { name: "Mastery", students: 70 },
    { name: "Image Boom", students: 10 },
    { name: "Snapshot", students: 100 },
    { name: "Sorting", students: 100 },
    { name: "Reorder", students: 30 },
    { name: "Quiz", students: 90 },
    { name: "Memory", students: 60 },
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
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          <p className="label" style = {{fontWeight: "bold"}}>{`${label}`}</p>
          <p className="intro">{`Completion Rate: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h1 className="text-heading" style={{fontFamily: 'Montserrat, sans-serif'}}>Completion Rate By Activity</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart width={600} height={600} data={data}>
          <Bar dataKey="students" fill="#74B72E" barSize = {70} radius={[10, 10, 0, 0]}/>
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" vertical={false}/>
          <XAxis
            dataKey= "name"
            interval={"preserveStartEnd"}
            tick={{ fontSize: "14px", fontFamily: "Montserrat, sans-serif" }}
          />
          <YAxis tick={{ fontSize: '14px', fontFamily: 'Montserrat, sans-serif' }} label={{ value: 'Completion Rate (%)', angle: -90, position: 'insideLeft', offset: 10, fill: '#666', fontFamily: "Montserrat, sans-serif" }} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ActivityCompletionBar;
