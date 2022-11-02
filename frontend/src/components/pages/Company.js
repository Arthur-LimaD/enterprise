import React, { useEffect, useState} from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom";
import styles from './styles/company.module.css'
import Message from "../layout/Message";
import CompanyGeneralEditForm from "../layout/CompanyGeneralEditForm";
import CompanyDataEditForm from "../layout/CompanyDataEditForm";
import CompanyInformationCard from "../layout/CompanyInformationCard";
import MarketNews from "../layout/MarketNews";
import BarChart from "../layout/charts/BarChart";
import LineChart from "../layout/charts/LineChart";

export default function Company () {
    
    axios.defaults.withCredentials = true;
    const [userLogged, setUserLogged] = useState(null)
    const [message, setMessage] = useState()
    const [messageType, setMessageType] = useState()
    const [company, setCompany] = useState()
    const {id} = useParams()
    const [toggleEditForm, setToggleEditForm] = useState(false)
    const navigate = useNavigate()


    useEffect(()=> {
        axios.get('http://localhost:80/home')
        .then((response)=> {
            setUserLogged(response.data)
        })
        .catch((error)=> {
            console.log(error)
            if(error.response.status === 401){
                navigate('/login')
            }
        })
    }, [])

    useEffect(()=> {
        if(userLogged) {
            var thisCompany = userLogged.company.filter(company=> company.id === Number(id))
            setCompany(thisCompany[0])
        }
    }, [userLogged])
    
    function updateGeneral (newData) {
        axios.put(`http://localhost:80/company/${id}/edit/general`, newData)
        .then((res)=> {
            setCompany(res.data[0])
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

    function updateData (newData) {

        axios.put(`http://localhost:80/company/${id}/edit/data`, newData)
        .then((res)=> {

            setCompany(res.data[0])
            setMessage('Data Added to Log With sucess!')
            setMessageType('success')
            
        })
        .catch((error)=> {
            if(error && error.response.data === 'Unauthorized'){
                navigate('/login')
            }else{
                setMessage(error.response.data)
                setMessageType('error')
            }
        })

    }

    return(<>

    {company && (
        <>

                <section className={styles.main}>
                    
                    <CompanyInformationCard companyData={company}/>

                    <MarketNews/>

                </section>
                
                <section className={styles.dashboard}>

                    <h2>View Financial Information</h2>
                    <div className={styles.charts}>
                        <BarChart companyData={company}/>
                        <LineChart companyData={company}/>

                    </div>
                </section>

                <br/>
                <section>
                <button className={styles.toggleEditButton} onClick={()=> setToggleEditForm(!toggleEditForm)}>{toggleEditForm ? 'Close Edit Formular' : 'Edit This company Data!'}</button>
                    {toggleEditForm && (<>

                        {message && <Message text={message} type={messageType}/> }
                    
                        <CompanyGeneralEditForm 
                        updateGeneral={updateGeneral}
                        companyData={company}
                        />
                        
                        <CompanyDataEditForm
                        updateData={updateData}
                        companyData={company}
                        />

                    </>)}
                    

                </section>
        </>
        )}
    </>)

}