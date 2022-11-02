import React, {useContext}from "react";
import styles from '../pages/styles/company.module.css'
import { useParams, useNavigate  } from "react-router-dom";
import axios from "axios";
import CompanyContext from "../contexts/CompanyContext";

export default function CompanyInformationCard ({companyData}) {

    const {id} = useParams()
    const navigate = useNavigate()
    const [company, setCompany] = useContext(CompanyContext)

    function deleteCompany (e) {
        e.preventDefault()
        axios.delete(`http://localhost:80/company/${id}/delete`)
        .then(()=> {
            navigate('/', {state: {message: 'Company Deleted With Success!', type: 'success'}})
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    return (<>
    <div className={styles.title}>
        <h1>{companyData.name}</h1>
        <div className={styles.info}>
        <div><b>Description: </b>
            <p>{companyData.description}</p>
        </div>
        <div><b>Segment: </b>
            <p>{companyData.segment}</p>
        </div>
                    
        <p className={styles.value}>${companyData.value}</p>
        <a href="#edit"><button className={styles.edit}>Edit Data</button></a>
        <button onClick={deleteCompany}>Delete This Company</button>
        </div>
                    
    </div>
    </>)
}