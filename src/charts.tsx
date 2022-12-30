// import "./styles.css";
import React from "react";
import { PieChart, Pie, Legend, Tooltip,Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042","#8FCF47","#b1faf2","tomato","orange","green"];

export default function Charts(props:any) {
  return (
    <div>
      <h4>{props.heading} {props.userH}</h4>
    <PieChart width={600} height={500}>

      <Pie
        dataKey="value"
        isAnimationActive={props.flag?false:true}
        data={props.data}
        cx={200}
        cy={200}
        outerRadius={150}
        innerRadius={props.flag?75:0}
        fill="#8884d8"
        label
      >

     
    {props.data.map((entry:any, index:any) => 
      (<Cell key={`cell-${index}`} fill={COLORS[index%COLORS.length]}
      /> ))}
      </Pie>
      
      <Tooltip />
    </PieChart>
    </div>
  );
}
