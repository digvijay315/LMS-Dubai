import React from 'react'
import {
        LineChart,
        Line, 
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
    height: '240px',
    backgroundColor: '#ffffff',
    margin: '0px auto',
    marginTop: '10px',
    padding: '10px'
  };

const LineOne = () => {
    
  return (
    <div style={divStyle}>
    <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={400} data={product} margin={{right: 50}}>
            <YAxis/>
            <XAxis dataKey="name"/>
            <CartesianGrid strokeDasharray="4 4"/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="product1" stroke="#8884d8" activeDot={{ r: 8 }}  />
            <Line type="monotone" dataKey="product2" stroke="#82ca9d"  />
            
        </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default LineOne;