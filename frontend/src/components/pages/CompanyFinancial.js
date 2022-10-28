import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './styles/companyfinancial.module.css'
import CompanyDataEdit from "../layout/CompanyDataEdit";
import Message from "../layout/Message";
import { Link } from "react-router-dom";
import BarChart from "../layout/BarChart";
import LineChart from "../layout/LineChart";


export default function CompanyFinancial () {
    
    axios.defaults.withCredentials = true;

    const [userLogged, setUserLogged] = useState()
    const [company, setCompany] = useState()
    const navigate = useNavigate()
    const {id} = useParams()
    const [message, setMessage] = useState()
    const [messageType, setMessageType] = useState()
    const [date, setDate] = useState([])
    const [dateSelected, setDateSelected] = useState([])
    const [barDate, setBarDate] = useState()
    const [validDates, setValidDates] = useState([])

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
    }, [navigate])

    
    useEffect(()=> {
    })

    useEffect(()=> {

        if(userLogged) {

            var thisCompany = userLogged.company.filter((company)=> 
                company.id === Number(id)
            )
            setCompany(thisCompany[0])
            
            if(company) {
                setDate(company.data);
            }

        }
        
    }, [userLogged, id])
    
    const [toggleForm, setToggleForm] = useState(false)

    function toggleEditForm () {
        setToggleForm(!toggleForm)
    }

    function setDateOne (e){

        const dates = dateSelected.filter((date)=> 
            date.id !== 1
        )

        dates.push({id: 1, value : e.target.value})

        setDateSelected(dates)
    }

    function setDateTwo (e){
        const dates = dateSelected.filter((date)=> 
            date.id !== 2
        )
        dates.push({id: 2, value : e.target.value})
        setDateSelected(dates)
    }

    function selectBarDate (e) {

        var thisDate = company.data.filter((date)=> {
            date = Object.keys(date)
            if(date == e.target.value){
                return date
            }else{
                return false
            }
        
        })

        setBarDate(thisDate)

    }
    
    function selectDates() {

        var dateOne = dateSelected.filter((date)=> 
            date.id === 1
        )
        dateOne = dateOne[0].value;
        
        var dateTwo = dateSelected.filter((date)=> 
            date.id === 2
        )
        dateTwo = dateTwo[0].value;

        var valid = company.data.filter((date)=> {
            date = Object.keys(date)
            if(date >= dateOne && date <= dateTwo){
                return date
            }else{
                return false
            }
        
        })

        setValidDates(valid)
    }

    return(<>
        {company && (<>

            <section className={styles.info}>
                <Link to={`/company/${id}`}><h1>{company.name}</h1></Link>
                <p>{company.description}</p>
                <h2>R${company.value}</h2>
            </section>


            <section className={styles.dashboard}>

                <div className={styles.select_date}>
                    
                    <div>
                        <label>Set a Date</label>
                        <input onChange={selectBarDate} type="date"/>
                    </div>

                    <div>
                        <label>Set Date Between:</label>
                        <input onChange={setDateOne} type="date"/>
                        <input onChange={setDateTwo} type="date"/>
                    </div>
                    <button onClick={selectDates}>See</button>
                </div>

                <div className={styles.charts}>

                    <BarChart className={styles.barChart} chartData={barDate} />
                    
                    <LineChart  chartData={validDates}/>
                    
                </div>

            </section>


            <button className={styles.toggleEditForm} onClick={toggleEditForm}>{toggleForm ? 'Close Data Adding' : 'Add Data'}</button>
           
           {toggleForm && <>

            <section className={styles.editForm}>

            {<Message type={messageType} text={message}/>}

            <CompanyDataEdit companyData={company} 
                setCompanyData={setCompany} 
                setMessage={setMessage} 
                setDates={setDate}
                setMessageType={setMessageType}
                selectBarDate={selectBarDate}
                />
            </section>
            </>}
            
        </>)}
    </>)
}