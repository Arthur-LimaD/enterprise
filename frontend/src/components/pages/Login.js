import React, {useState, useEffect} from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Input from "../layout/Input"
import styles from './styles/login.module.css'
import axios from 'axios'
import Message from "../layout/Message"

function Login () {

    axios.defaults.withCredentials = true;

    const [user, setUser] = useState([])
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const location = useLocation()

    useEffect(()=> {
        if(location.state){
            setMessage(location.state.message);
            setMessageType(location.state.type)
        }
    }, [location.state])

    function login(e) {
        e.preventDefault()

        axios.post('http://localhost:80/login', user)
        .then((response)=> {
            if(response.status === 200){
                navigate('/')
            }
        })
        .catch((error)=> {
            if(error.response.status === 401){
                setMessage(error.response.data)
                setMessageType('error')
            }else{
                setMessage('An Error Ocurred on Backend!')
                setMessageType('error')
            }
        })

    }
    
    function handleChange (e) {
        setUser({...user, [e.target.name] : e.target.value})
    }

    return(<>
        <div className={styles.main}>
            <h1>Login Here:</h1>
            {message && <Message type={messageType} text={message}/>}
            <form className={styles.form} onSubmit={login}>
                    <Input className={styles.input} 
                    label="Your Email:" type="email" 
                    placeholder="Email" 
                    name="email"
                    handleOnChange={handleChange}/>
                    <Input className={styles.input} 
                    label="Your Password:" 
                    type="password" 
                    name='password'
                    placeholder="Password"
                    handleOnChange={handleChange}/>
                    <p>Still Doesnt Has an Account?  <Link  to="/register">Register</Link></p>
                    <button className={styles.button} >
                        Login
                    </button>
                    
            </form>
        </div>
    </>)
}

export default Login