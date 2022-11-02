import React, {useState, useEffect} from "react";
import styles from './styles/companydata.module.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

function CompanyData () {

    
    const [userLogged, setUserLogged] = useState([])
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

    return(<main>
         <div className={styles.company}>
            {userLogged.company && userLogged.company.map(company => (<>
            <div className={styles.information} key={company.id}>
                <div className={styles.title}>
                    <h1>{company.name}</h1>
                    <span>{company.description}</span><br/>
                    <Link to={`company/${company.id}`}><button>View</button></Link>
                </div>

                <div className={styles.company_abstract}>
                    <h3>Value: <span>{company.value}</span></h3>
                    <h3>Segment: <span>{company.segment}</span></h3>
                </div>
            </div> 
            </>))}
         </div>
    </main>)
}

export default CompanyData