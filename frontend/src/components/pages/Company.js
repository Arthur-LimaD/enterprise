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
    })
    
    return(<>

    {company && (
        <>
            <section className={styles.main}>
                
                <CompanyInformationCard company={company}/>

                <MarketNews/>

            </section>

            <section >
                {/*className={styles.charts}*/}
                <CompanyCharts company={company}/>
            </section>

            <section>

                {message && <Message text={message} type={messageType}/> }
                
                    <CompanyGeneralEditForm companyData={company} 
                    setCompanyData={setCompany} 
                    setMessage={setMessage} 
                    setMessageType={setMessageType}/>
                    
                    <CompanyDataEditForm
                    companyData={company} 
                    setCompany={setCompany}
                    setMessage={setMessage} 
                    setMessageType={setMessageType}/>

            </section>
        </>
        )}
    </>)

}