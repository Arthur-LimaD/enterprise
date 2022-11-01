import React from "react";
import styles from '../pages/styles/company.module.css'
import { useParams, useNavigate  } from "react-router-dom";
import axios from "axios";

export default function CompanyInformationCard ({company}) {

    const {id} = useParams()
    const navigate = useNavigate()

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

        <h1>{company.name}</h1>
        <div className={styles.info}>
        <div><b>Description: </b>
            <p>{company.description}</p>
        </div>
        <div><b>Segment: </b>
            <p>{company.segment}</p>
        </div>
                    
        <p className={styles.value}>${company.value}</p>
        <a href="#edit"><button className={styles.edit}>Edit Data</button></a>
        <button onClick={deleteCompany}>Delete This Company</button>
        </div>
                    
    </div>
    </>)
}