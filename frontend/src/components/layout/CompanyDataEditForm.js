import React, { useState} from "react";
import styles from './styles/companydataedit.module.css'

export default function CompanyDataEditForm ({companyData, updateData}) {

    const [date, setDate] = useState()
    const [info, setInfo] = useState()
    const [handleDate, setHandleDate] = useState()

    function changeDate(e) {

        let dateReq = e.target.value;

        setHandleDate(dateReq)

        let thisData = companyData.data.filter((data)=> {
            if(Object.keys(data)[0] === dateReq){
                return data
            }else{
                return false
            }
        })

        thisData.length > 0 ? setDate(Object.values(thisData[0])[0]) : setDate(null)
    }

    function editCompany (e) {
        e.preventDefault()
        var object = {[handleDate] : info}
        updateData(object)
    }

    function handleOnChange (e) {
        setInfo({...info, [e.target.name] : e.target.value})
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
    mm = '0' + mm;
    } 
        
    today = yyyy + '-' + mm + '-' + dd;
    
    return(<>
        {companyData && 

        (<div className={styles.CompanyEdit}>

                {date ? (<h2>Edit Your Company's Information This Day!</h2>) 
                : (<h2>Insert First Enterprise's info at this Day!</h2>)}
            <form onSubmit={editCompany}> 

                <div className={styles.date}>
                    <label >Enter The Date's data: </label>
                    <input required onChange={changeDate} type="date" max={today}/>
                </div>

                <div>
                    <label>Incomes</label>
                    <input required name='incomes' 
                    type="number" 
                    placeholder={date && date.incomes ? date.incomes : 'No data Logged This Day!'}
                    onChange={handleOnChange}/>
                </div>

                <div>
                    <label>Expenses</label>
                    <input required name='expenses' 
                    type="number" 
                    placeholder={date && date.expenses ? date.expenses : 'No data Logged This Day!'}
                    onChange={handleOnChange}/>
                </div>

                <div>
                    <label>Notes</label>
                    <input required name='notes' 
                    placeholder={date && date.notes ? date.notes : 'No data Logged This Day!'}
                    type="text" 
                    onChange={handleOnChange}/>
                </div>
                

                <button >Submit</button>

            </form>

        </div>)}
    </>)
}