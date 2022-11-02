import React from "react"

function Input ({label, type, placeholder, handleOnChange, name, id}) {
    return (<>
    <div className="input">
            <label>{label}</label>
            <input type={type} 
            placeholder={placeholder} 
            onChange={handleOnChange}
            name={name}
            id={id}
            maxLength="30"
            required/>
    </div>
    </>)
}

export default Input

