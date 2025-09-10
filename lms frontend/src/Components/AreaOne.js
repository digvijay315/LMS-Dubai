import React from 'react'
import {
        AreaChart,
        Area, 
        ResponsiveContainer,
        XAxis,
        YAxis,
        CartesianGrid,
        Tooltip,
        Legend
    } from 'recharts'
// import './Area.css'

const product =[
    
        { "name": "Jan", "product1": 300, "product2": 200 },
        { "name": "Feb", "product1": 280, "product2": 240 },
        { "name": "Mar", "product1": 350, "product2": 290 },
        { "name": "Apr", "product1": 320, "product2": 270 },
        { "name": "May", "product1": 310, "product2": 300 },
        { "name": "Jun", "product1": 340, "product2": 320 },
        { "name": "Jul", "product1": 370, "product2": 330 },
        { "name": "Aug", "product1": 360, "product2": 310 },
        { "name": "Sep", "product1": 380, "product2": 340 },
        { "name": "Oct", "product1": 390, "product2": 350 },
        { "name": "Nov", "product1": 400, "product2": 360 },
        { "name": "Dec", "product1": 420, "product2": 380 }
      
]
const divStyle = {
  width: '100%',
  height: '300px',
  backgroundColor: 'rgba(46, 7, 63, 0.03)',
  margin: '0px auto',
  marginTop: '10px',
  padding: '10px'
};
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (

        <div style={{
          backgroundColor: 'white', // Light background color
          padding: '10px',
          border: '1px solid #ddd', 
          borderRadius: '5px',
          color: '#333',  // Dark text for contrast
        }}>
          <p>{label}</p>  {/* Display month (label) */}
          {payload.map((entry, index) => (
            <div key={`item-${index}`}>
              <p style={{ color: entry.color }}>{entry.name}: {entry.value}k</p>
            </div>
          ))}
        </div>
      );
    }
  
    return null;
  };


const AreaOne = () => {
    
  return (
    <div style={divStyle} > 
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={500} height={400} data={product} margin={{right: 50}}>
            <YAxis/>
            <XAxis dataKey="name"/>
            <CartesianGrid strokeDasharray="4 4"/>
            <Tooltip content={<CustomTooltip />}/>
            <Legend/>
            <Area
            type="monotone"
            dataKey="product1"
            stroke="#8f00b3"
            fill="#ffe6ff"
            stackId="1"
            />
             <Area
            type="monotone"
            dataKey="product2"
            stroke="#9999ff"
            fill="#e6f2ff"
            stackId="2"
            />
        </AreaChart>
    </ResponsiveContainer>
    </div>
  )
}

export default AreaOne