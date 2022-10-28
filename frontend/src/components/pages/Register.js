import React, {useState/*, useEffect*/} from "react"
import styles from './styles/register.module.css'
import registerImg from '../images/registerImg.svg'
import Input from "../layout/Input"
import { Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import Message from "../layout/Message"

function Register () {

    axios.defaults.withCredentials = true;
    
    const [user, setUser] = useState([])
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    function register(e) {
        e.preventDefault()

        axios.post('http://localhost:80/register', user)
        .then((response)=> {
            navigate('/login', {state: {message: 'User Registered With Sucess! 🗿', type: 'success'}})
        })
        .catch((error)=> {
            if(error.response.status === 409) {
                setMessage('Email Already Registered!')
                setMessageType('error')
            }else{
                console.log(error)
            }
        })

    }

    function handleChange (e) {
        setUser({...user, [e.target.name] : e.target.value})
    }

    return(
        <>
        {message && <Message type={messageType} text={message}/>}
    <div className={styles.register}>
        <div className={styles.register_left}>
            <img src={registerImg} alt="registerImg"/>
        </div>
        <div className={styles.register_right}>
            <div className={styles.text}>

                <div>
                <h1>Register on our Platform!</h1>
                <h3>You won't back down 🗿</h3>
                </div>
                <form className={styles.form} onSubmit={register}>

                <Input className={styles.input} 
                label="Your Name:" 
                type="text" 
                placeholder="Name"
                name="name"
                handleOnChange={handleChange}
                />
                <Input className={styles.input} 
                label="Your Best Email:" 
                type="email" 
                placeholder="Email"
                name="email"
                handleOnChange={handleChange}
                />
                <Input className={styles.input} 
                label="A Strong Password:" 
                type="password" 
                placeholder="Password"
                name="password"
                handleOnChange={handleChange}
                />

                <p>Already has an Account? <Link  to="/login">Login</Link></p>
                <button className={styles.button} >
                    Register
                </button>

        </form>
            </div>
        </div>
        
    </div>
    </>
    )
}

export default Register