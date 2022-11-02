import React, { useEffect, useState } from "react";
import styles from '../../pages/styles/company.module.css'

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


export default function LineChart ({companyData}){
    
    const [dateOne, setDateOne] = useState()
    const [dateTwo, setDateTwo] = useState()
    const [graphicData, setGraphicData] = useState([])

    useEffect(()=> {

      let validDates = companyData.data.filter(date=> {

        var key = Object.keys(date)

        if(key[0] >= dateOne && key[0] <= dateTwo){
          return date
        }else{
          return false
        }
      })

      setGraphicData(validDates)
      console.log(companyData)

    }, [dateOne, dateTwo, companyData])

    let incomesData = []
    let expensesData = []
    let labels = []

    if(graphicData){

      incomesData = graphicData.map((date) => date[Object.keys(date)[0]].incomes)
      expensesData = graphicData.map((date) => date[Object.keys(date)[0]].expenses)
      labels = graphicData.map((date) => Object.keys(date)[0])

    }

    return (<>
    <div className={styles.LineChart}>

        <div className={styles.LineChart_selector}>   
            <label>Select a date Between</label><br/>
            <input onChange={(e)=>{setDateOne(e.target.value)}} type="date"/><br/>
            <input onChange={(e)=>{setDateTwo(e.target.value)}} type="date"/>
        </div>

        <Line
        data={{
            labels: labels,
            datasets: [
                {
                  label: 'Incomes',
                  data: incomesData,
                  borderColor: 'rgb(53, 162, 235)',
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                  label: 'Expenses',
                  data: expensesData,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],

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