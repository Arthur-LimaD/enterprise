import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({chartData}){

    let incomesData = []
    let expensesData = []
    let labels = []

    if(chartData){
        incomesData = chartData.map((date)=> 
            date[Object.keys(date)[0]].incomes
        )
        expensesData = chartData.map((date)=> 
            date[Object.keys(date)[0]].expenses
        )
        labels = chartData.map((date)=> 
            Object.keys(date)[0]
        )
    }


    return (
        <Line
            data = {{
                labels: labels,
                datasets: [
                    {
                      label: 'Incomes',
                      data: incomesData,
                      borderColor: 'rgb(8, 158, 33)',
                      backgroundColor: 'rgb(46, 182, 69)',
                    },
                    {
                        label: 'Expenses',
                        data: expensesData,
                        borderColor: 'rgb(131, 41, 41)',
                        backgroundColor: 'rgb(206, 54, 54)',
                    }
                  ]
            }}
            options= {{
                responsive: false,
                maintainAspectRatio: false
              }}
            width={800}
            height={600}
        />
    )
}