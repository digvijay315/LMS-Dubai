import React from 'react'
import {
        BarChart,
        Bar, 
        ResponsiveContainer,
        XAxis,
        YAxis,
        CartesianGrid,
        Tooltip,
        Legend
    } from 'recharts'
// import './Area.css'

const product =[
    
        { "name": "Design", "Free Course": 300, "Paid Course": 200 },
        { "name": "Web Dev", "Free Course": 280, "Paid Course": 240 },
        { "name": "Business", "Free Course": 350, "Paid Course": 290 },
        { "name": "Productivity", "Free Course": 320, "Paid Course": 270 },
        { "name": "Marketing", "Free Course": 310, "Paid Course": 300 },
        // { "name": "Jun", "product1": 340, "product2": 320 },
        // { "name": "Jul", "product1": 370, "product2": 330 },
        // { "name": "Aug", "product1": 360, "product2": 310 },
        // { "name": "Sep", "product1": 380, "product2": 340 },
        // { "name": "Oct", "product1": 390, "product2": 350 },
        // { "name": "Nov", "product1": 400, "product2": 360 },
        // { "name": "Dec", "product1": 420, "product2": 380 }
      
]

const divStyle = {
    width: '100%',
    height: '300px',
    backgroundColor: 'rgb(243, 240, 252)',
    margin: '0px auto',
    // marginTop: '50px',
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

const Barchartone = () => {
    
  return (
    <div style={divStyle}>
    <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={400} data={product} margin={{right: 50}}>
            <YAxis/>
            <XAxis dataKey="name" style={{fontSize: "10px"}}/>
            <CartesianGrid strokeDasharray="4 4"/>
            <Tooltip content={<CustomTooltip />}/>
            <Legend/>
            <Bar
            dataKey="Free Course"
            fill="#730099" 
            />
             <Bar
            dataKey="Paid Course"
            fill="#262673"
            />
        </BarChart>
    </ResponsiveContainer>
    </div>
  )
}

export default Barchartone;