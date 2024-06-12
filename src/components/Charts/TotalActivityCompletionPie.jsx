import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const TotalActivityCompletionPie = () => {
  const data = [
    { name: "Completed", value: 80 },
    { name: "Not Completed", value: 20 },
  ];

  const colors = ["#8BC34A", "#4CAF50"];

  

  // Calculate the total value for percentage calculation
  const total = data.reduce((acc, entry) => acc + entry.value, 0);

  // Custom label to display percentage
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
  
  const CustomTooltip = ({ active, payload, label }) => {
    //console.log("CustomTooltip called", { active, payload, label });
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
          <p className="label" style = {{fontWeight: "bold"}}>{`${payload[0].name}`}</p>
          {/*  <p className="intro">{`Completion Rate: ${payload[0].value}%`}</p> */}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h1
        className="text-heading"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Total Activity Completion
      </h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <PieChart width={400} height={400}>
            <Tooltip content={<CustomTooltip />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={10}
            outerRadius={150}
            fill="#8884d8"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default TotalActivityCompletionPie;
