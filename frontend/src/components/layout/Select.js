import React from "react"

function Select ({ text, name,  handleonchange, value, defaultValue }) {
    return(<div>
            <label htmlFor={name}>{text}</label>
            <div>
            <select 
            name={name} 
            id={name} 
            onChange={handleonchange} 
            value={value}
            defaultValue={defaultValue}
            >
                <option value='Publicity' key={1}>
                    Publicity
                </option>
                <option value='Marketing' key={2}>
                Marketing
                </option>
                <option value='Tecnology' key={3}>
                Tecnology
                </option>
                <option value='Comodities' key={4}>
                Comodities
                </option>

            </select>
            </div>
        </div>)
}

export default Select