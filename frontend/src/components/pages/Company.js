import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from './styles/company.module.css'
import CompanyDataEdit from "../layout/CompanyDataEdit";
import Message from "../layout/Message";
import CompanyGeneralEdit from "../layout/CompanyGeneralEdit";

function Company () {
    
    axios.defaults.withCredentials = true;

    const [userLogged, setUserLogged] = useState(null)
    const [message, setMessage] = useState()
    const [messageType, setMessageType] = useState()
    const [company, setCompany] = useState()
    const [news, setNews] = useState()
    const [toggleForm, setToggleForm] = useState(false)
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
    }, [navigate])

    useEffect(()=> {

        if(userLogged) {
            var thisCompany = userLogged.company.filter((company)=> 
                company.id === Number(id)
            )
            setCompany(thisCompany[0])
        }
        
    }, [userLogged, id])

    

    useEffect(()=> {
        
        /*axios.get(`https://finnhub.io/api/v1/news?category=general&token=cd4pfi2ad3i98jhu32i0cd4pfi2ad3i98jhu32ig`, 
        {withCredentials: false})
        .then((response)=> {
            setNews([response.data[Math.floor(Math.random() * 99)], response.data[Math.floor(Math.random() * 99)]])
            console.log(news)
        })
        .catch((error)=> {
            console.log(error)
        })*/

        setNews([
            {
              "headline": "Kroger has to win over Wall Street and Washington on its Albertsons deal – here's how it plans to do that",
              "image": "https://image.cnbcfm.com/api/v1/image/107104116-1660590301443-gettyimages-1415035613-l1002589_f7f2e8ae-9fe5-4a55-905b-145c7287285c.jpeg?v=1665770108&w=1920&h=1080",
              "summary": "Kroger and Albertsons must persuade federal regulators, investors and shoppers that the deal is beneficial.",
              "url": "https://www.cnbc.com/2022/10/14/albertsons-deal-how-kroger-plans-to-win-over-regulators-investors.html"
            },
            {
              "headline": "Morgan Stanley's decline on Q3 results is too severe and may lead to a buying opportunity",
              "image": "https://image.cnbcfm.com/api/v1/image/107121163-16636733462022-09-20t110046z_916998079_rc2ykw94dd2c_rtrmadp_0_usa-sec-morganstanley.jpeg?v=1665768404&w=1920&h=1080",
              "summary": "The stock was punished too harshly for the quarter, given this year's tough macroeconomic backdrop and terrible equity market.",
              "url": "https://www.cnbc.com/2022/10/14/morgan-stanleys-decline-on-q3-results-is-too-severe-and-may-lead-to-a-buying-opportunity.html"
            }])

    }, [])

    function remove (e) {
        e.preventDefault()
        axios.delete(`http://localhost:80/company/${id}/delete`)
        .then(()=> {
            navigate('/', {state: {message: 'Company Deleted With Success!', type: 'success'}})
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    function toggleEditForm () {
        setToggleForm(!toggleForm)
    }

    return(<>

    {company && (
        <>
            <div className={styles.main}>
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
                    <button onClick={remove}>Delete This Company</button>
                    <Link to={`/company/${company.id}/financial`} className={styles.view_financial_data}><button>View Financial Data</button></Link>
                    </div>
                    
                </div>

                <div className={styles.market}>
                    <h2>How Is the Market Today? 📊</h2>
                    {news ? news.map(news => (<>
                    <div className={styles.news_card} key={news.id}>
                        <h4>{news.headline}</h4>
                        <a href={news.url}><img src={news.image} alt="News" /></a>   
                        <p>{news.summary}</p>
                    </div>
                        
                    </>)) : 'No News here'}
                </div>
            </div>
            
            <button className={styles.toggleEditForm} onClick={toggleEditForm}>{toggleForm ? 'Close Edit Formular' : 'Edit This Company'}</button>

            {toggleForm && (<>

                <div className={styles.edit}>

                {message && <Message type={messageType} text={message}/>}
                <div className={styles.editForm}>

                <CompanyGeneralEdit companyData={company} 
                setCompanyData={setCompany} 
                setMessage={setMessage} 
                setMessageType={setMessageType}/>

                </div>
                </div>

            </>)}
        </>
        )}
    </>)

}

export default Company