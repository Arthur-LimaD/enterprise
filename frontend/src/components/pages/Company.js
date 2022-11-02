import React, { useEffect, useState} from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom";
import styles from './styles/company.module.css'
import Message from "../layout/Message";
import CompanyGeneralEditForm from "../layout/CompanyGeneralEditForm";
import CompanyDataEditForm from "../layout/CompanyDataEditForm";
import CompanyInformationCard from "../layout/CompanyInformationCard";
import MarketNews from "../layout/MarketNews";
import CompanyCharts from "../layout/CompanyCharts";
import CompanyContext from '../contexts/CompanyContext';

export default function Company () {
    
    axios.defaults.withCredentials = true;
    const [userLogged, setUserLogged] = useState(null)
    const [message, setMessage] = useState()
    const [messageType, setMessageType] = useState()
    const [company, setCompany] = useState()
    const {id} = useParams()
    const navigate = useNavigate()


    useEffect(()=> {
        axios.get('http://localhost:80/home')
        .then((response)=> {
            setUserLogged(response.data)
            console.log(userLogged)
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
            console.log(company)
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
            if(error && error.response.data == 'Unauthorized'){
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
            <CompanyContext.Provider value={[company, setCompany]}>

                <section className={styles.main}>
                    
                    <CompanyInformationCard companyData={company}/>

                    <MarketNews/>

                </section>

                <section >
                    {/*className={styles.charts}*/}
                    <CompanyCharts companyData={company}/>
                </section>

                <section>

                    {message && <Message text={message} type={messageType}/> }
                    
                        <CompanyGeneralEditForm 
                        updateGeneral={updateGeneral}
                        companyData={company}
                        />
                        
                        <CompanyDataEditForm
                        updateData={updateData}
                        companyData={company}
                        />

                </section>

            </CompanyContext.Provider>
        </>
        )}
    </>)

}