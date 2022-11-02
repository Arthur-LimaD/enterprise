import React, { useEffect, useState } from "react";
import styles from '../../pages/styles/company.module.css'
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

export default function BarChart ({companyData}) {
    
    const [dateSelected, setDateSelected] = useState();
    const [graphicData, setGraphicData] = useState()

    useEffect(()=> {

        var dataOnArray = companyData.data.filter((date)=> 
            Object.keys(date) == dateSelected
        )
        setGraphicData(dataOnArray)
        console.log(graphicData)

    }, [dateSelected, companyData])

    let data = []
    let profit = 0

    if(dateSelected && graphicData.length > 0){
        
        data = graphicData[0][dateSelected]
        if(data){
            profit = Number(data.incomes) - Number(data.expenses)
        }else{
            data = []
        }
    }

    return (<>
    <div className={styles.BarChart}>

        <div className={styles.BarChart_selector}>
            <label>Select</label><br/>
            <input type="date" onChange={(e)=> {setDateSelected(e.target.value)}}/>
        </div>

    <Bar
        data={{
            labels: ['Incomes', 'Expenses', 'Profit'],
            datasets: [{
                label: dateSelected && graphicData.length > 0 ? dateSelected : 'No data Logged this Day!',
                data: data ? [data.incomes, data.expenses, profit] : [],
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
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }}
            height={880}
            width={660}
        />
    </div>
    </>)
}