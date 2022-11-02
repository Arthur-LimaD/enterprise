import React, { useEffect, useState } from "react";
import styles from '../pages/styles/company.module.css'

export default function CompanyCharts ({companyData}) {

    const [data, setData] = useState([])

    
    useEffect(()=> {
        setData(companyData.data.map((date)=> {

            var key = Object.keys(date)[0]
            return date[key]
    
        }))
        console.log(data)
    }, [companyData])

    return (<>
    <div className={styles.CompanyCharts}>
        {/*companyData.name*/}
        {/*data && data.map((date)=> (<h2>{date.incomes}</h2>))*/}
    </div>
    </>)
}