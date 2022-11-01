import axios from "axios";
import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from '../layout/Input'
import styles from './styles/newcompany.module.css';
import Select from "../layout/Select";

function NewCompany () {
    
    axios.defaults.withCredentials = true;

    const [newCompany, setNewCompany] = useState([])
    const navigate = useNavigate()
    const [userLogged, setUserLogged] = useState()

    function createCompany (e) {
        e.preventDefault()

        if(!newCompany.segment){
            newCompany.segment = 'Publicity'
        }
       setNewCompany({...newCompany, data: []})
       console.log(newCompany)
        axios.post('http://localhost:80/company/new', newCompany)
        .then((response)=> {
            if(response.status === 200){
                navigate('/', {state: {message: 'New Company created with sucess!', type: 'success'}})
            }
        })
        .catch((error)=> {
            console.log(error)
        })



    }

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
    function handleChange (e) {
        setNewCompany({...newCompany, [e.target.name] : e.target.value})
    }

    return (<>
        
        <form className={styles.form} onSubmit={createCompany}>
            <h2>Enter your new company Stats</h2>
                    <Input type="text"
                     id="company_name" 
                     name="name" 
                     placeholder="I hope it's a good name 😀"
                     label="Your Company's name"
                     handleOnChange={handleChange}
                     />
                    <Input type="text" 
                    id="company_description" 
                    name="description" 
                    placeholder="It's activities, etc..."
                    label="A little description of it"
                    handleOnChange={handleChange}
                    />
                    <Input type="number" 
                    id="company_value" 
                    name="value" 
                    placeholder="Maybe too much 💰"
                    label="Your Company's Value"
                    handleOnChange={handleChange}
                    />    
                    <Select 
                    name="segment" 
                    text="Select a Segment"
                    handleonchange={handleChange}
                    />
                    <button>Submit</button>
            </form>
    </>)
}

export default NewCompany