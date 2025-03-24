import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarGraph = ({data}) => {
    return(
        <ResponsiveContainer width="100%" height={300}>
            <BarChart 
            data={data}
            margin={{
                top: 5, 
                right: 30, 
                left: 20, 
                bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="category"/>
                <YAxis/>
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" label={{ position: 'top', fill: '#333' }}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarGraph;