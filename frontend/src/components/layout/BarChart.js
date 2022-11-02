import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function BarChart ({chartData}){

    let date = [0,0]
    let profit = 0;
    let label = 'No Data Logged this Day 🤨!'

    if(chartData && chartData.length > 0){
        label = Object.keys(chartData[0])[0]
        date = chartData[0][label]
        profit = Number(date.incomes) - Number(date.expenses);
    }

    return (<div>
        <Bar
            data={{
            labels: ['Incomes', 'Expenses', 'Profit'],
            datasets: [{
                label: label,
                data: [date.incomes, date.expenses, profit]/*data*/,
                backgroundColor: [
                    'rgb(108, 224, 108)',
                    'rgba(255, 99, 132, 1)',
                    'rgb(144, 144, 241)'
                ],
                borderColor: [
                    'rgb(45, 145, 45)',
                    'rgb(206, 73, 73)',
                    'rgb(53, 53, 146)'
                ],
                borderWidth: 1
            }]

        }}
        options={{
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }}
            height={600}
            width={400}
        />
    </div>)
}

export default BarChart