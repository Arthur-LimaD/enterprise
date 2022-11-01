import React, {useEffect, useState} from "react";
import styles from './styles/message.module.css'

function Message ({text, type}) {

    const [visible, setVisible] = useState(false);

    useEffect(()=> {
        if(!text){
            setVisible(false);
            return
        }else{
            setVisible(true)
        }
        
        const timer = setTimeout(()=> {
            setVisible(false)
            
        }, 3000)
        return () => clearTimeout(timer)
    }, [text])

    return(<>
        {visible && (<div className={`${styles.message} ${styles[type]}`}>
            {text}
        </div>)}
    </>)
        
}

export default Message