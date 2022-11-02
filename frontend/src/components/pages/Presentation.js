import React from "react"
import styles from './styles/presentation.module.css'
import business from '../images/business.svg'
import { Link } from "react-router-dom";

function Presentation () {
    return( 
        <>
    <div className={styles.main}>
        <div className={styles.main_left}>
            <div className={styles.main_text}>
            <h1>
                Presentation
            </h1>
            <p>Doesnt like your Business structure? Gerenciate <wbr/> your stats here!
                We offer too many structures for better management and profit increase 📈
            </p>
            <p>Has Already an Account?</p>
            <Link to="/login">
                <button className={styles.button} >
                    Login
                </button>
            </Link>
            
            
            </div>
            
        </div>
        <div className={styles.main_right}>
            <img src={business} alt="Business"/>
        </div>
    </div>
    <section className={styles.contact} id="contact">
            <div className={styles.contact_left}>
                <h1>Lets talk!</h1>
                <h2>Contact us By This Platforms</h2>
            </div>
        
            <div className={styles.contact_right}>
                <ul>
                <li>Email: aisfhaisnmdf@gmail.com</li><div><span className="material-symbols-outlined">mail</span></div>
                <li>Telefone: 55 3581216946</li> <div><span className="material-symbols-outlined">phone_in_talk</span></div>
                <li>Github: <a href="https://github.com/Arthur-LimaD?tab=repositories">github.com/Arthur-LimaD</a></li> <div class="icons"><span class="material-symbols-outlined">code</span></div>
                </ul>
            </div>
            
        </section>
    </>
    )
}

export default Presentation