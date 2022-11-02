import React, {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import styles from './styles/navbar.module.css'
import axios from "axios";
import logo from '../images/logo.png'

function Navbar () {

    const [showResponsiveLinks, setShowResponsiveLinks] = useState(false)
    const [userLogged, setUserLogged] = useState(null)
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

    function toggleResponsiveNav(){
        setShowResponsiveLinks(!showResponsiveLinks)
    }

    return( <>
        <div className={styles.navbar}>
            <h1><Link to="/">Admin Your Business Here!</Link></h1>
            
            <ul className={styles.links}>

            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/AboutUs">About Us</Link>
            </li>
            
            </ul>

            {showResponsiveLinks === true && (
                <div className={styles.responsive_links}>
                    
                        <button onClick={toggleResponsiveNav}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>

                    
                        <ul>
                            <li>
                                <Link to="/" onClick={toggleResponsiveNav}>Home</Link>
                            </li>
                            <li>
                                <Link to="/login" onClick={toggleResponsiveNav}>Login</Link>
                            </li>
                            <li>
                                <Link to="/register" onClick={toggleResponsiveNav}>Register</Link>
                            </li>
                            <li>
                                <Link to="/AboutUs" onClick={toggleResponsiveNav}>About Us</Link>
                            </li>
                        </ul>

                </div>
            )}
            
            <div className={styles.toggle_menu}>
                <button onClick={toggleResponsiveNav}>
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>
                
        </div>
        
    </>)
}

export default Navbar