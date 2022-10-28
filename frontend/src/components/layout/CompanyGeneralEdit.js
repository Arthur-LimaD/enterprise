import React, {useState} from "react";
import styles from './styles/companygeneraledit.module.css'
import Select from "./Select";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export default function CompanyGeneralEdit ({companyData, setCompanyData, handleSubmit, setMessage, setMessageType}){

    const {id} = useParams()
    const [companyEdited, setCompanyEdited] = useState()
    const navigate = useNavigate()
    function handleChange (e) {
        setCompanyEdited({...companyEdited, [e.target.name] : e.target.value})
    }

    function editCompany (e) {
        e.preventDefault()

        if(!companyEdited.segment){
            setCompanyEdited({...companyEdited, segment: 'Publicity'})
        }
        
        axios.put(`http://localhost:80/company/${id}/edit/general`, companyEdited)
        .then((res)=> {
            setCompanyData(res.data[0])
            setMessage('Company Edited with Sucess!')
            setMessageType('success')
        })
        .catch((error)=> {
            if(error.response.data === 'Unauthorized'){
                navigate('/login')
            }
            setMessage(error.response.data)
            setMessageType('error')
        })
        
    }

    return (<>
    
    <div className={styles.general_information_edit_form}>
        <h2>Edit data of <span className={styles.companyName}>{companyData.name}</span></h2>
        <form className={styles.form} onSubmit={editCompany}>

                <div>
                <label>Comapny Name</label>
                <input type="text"
                required
                id="company_name" 
                name="name" 
                placeholder={companyData && companyData.name}
                label="Your Company's name"
                onChange={handleChange}
                 />
                 </div>

                <div>
                 <label>Description</label>
                <input type="text" 
                required
                id="company_description" 
                name="description" 
                placeholder={companyData && companyData.description}
                label="A little description of it"
                onChange={handleChange}
                /></div>
                <div>
                <label>Value</label>
                <input type="number" 
                required
                id="company_value" 
                name="value" 
                placeholder={companyData && companyData.value}
                label="Your Company's Value"
                onChange={handleChange}
                />
                </div>
            <Select 
                name="segment" 
                text="Select a Segment"
                handleonchange={handleChange}
                />
                <button onSubmit={handleSubmit}>Submit</button>
            </form>
        </div>
    </>)
}