import React from "react"
import styles from './styles/footer.module.css'
import {FaFacebook, FaInstagram, FaLinkedin, FaGithub} from 'react-icons/fa'


function Footer () {
    return(
        <div className={styles.footer}>
            <div className={styles.footer_links}>
                    <ul>
                        <li><a href="facebook.com"><FaFacebook/></a></li>
                        <li><a href="instagram.com"><FaInstagram/></a></li>
                        <li><a href="linkedin.com"><FaLinkedin/></a></li>
                        <li><a href="github.com"><FaGithub/></a></li>

                    </ul>
            </div>

            <div className={styles.footer_title}>
                <h5><span>Company </span> &copy; 2022</h5>
            </div>

            </div>  
    )
}

export default Footer