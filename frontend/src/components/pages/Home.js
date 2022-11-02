import React, { useState, useEffect } from "react"
import axios from 'axios'
import {  useNavigate, Link, useLocation } from "react-router-dom"
import styles from './styles/home.module.css'
import Message from "../layout/Message"
import CompanyData from "../layout/CompanyData"

function Home () {

    axios.defaults.withCredentials = true;

    const [userLogged, setUserLogged] = useState(null)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const [isLogged, setIsLogged] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=> {

        axios.get('http://localhost:80/home')
        .then((response)=> {
            setUserLogged(response.data)
        })
        .catch((error)=> {
            console.log(error)
            if(error.response.status === 401){
                setIsLogged(false)
            }
           
        })

        if(location.state){
            setMessage(location.state.message)
            setMessageType(location.state.type)
        }
    }, [])

    function logout() {
        axios.post('http://localhost:80/logout')
        .then(()=> {
            setUserLogged(null)
            localStorage.removeItem('user')
            navigate('/login', {state: {message: 'Logged Out with sucess!', type: 'success'}})
            
        })
        .catch((error)=> {
            if(error.response.data){
                setMessage(error.response.data)
            }else{
                setMessage('Some error ocurred on backend!')
            }
            
            setMessageType('error')
        })
    }
    return(
        <>
    <div className={styles.main}>
        {userLogged && isLogged ? (<>
        <div className={styles.user_info}>
            <h1>Hello, {userLogged.name}! 👋</h1>
            <h4>
                Email: {userLogged.email}
            </h4>
            <button onClick={logout}>Log Out</button>
        </div>
        <div className={styles.company}>
        {message && <Message type={messageType} text={message} className={styles.message}/>}
            {userLogged.company && userLogged.company.length > 0 ? (
                <CompanyData />
            )
            : (<div className={styles.no_company}>
                No companies logged
                <Link to="/NewCompany"><button>Create One!</button></Link>
                </div>)}
            
        </div>
        </>) : (<div className={styles.login_first}>
                <h1>Login First Boy!</h1>
                <Link to="/login"><button>Login</button></Link>
            </div>
            )}
    </div>
    </>
    )
}

export default Home