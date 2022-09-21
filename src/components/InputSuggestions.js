import React from 'react';

import { cities } from '../utils/cities';

const InputSuggestions = ({ setCityName }) => {


    //const setInputValue = (e) => {
    //    term = e.target.innerText
    //}

    return (
        <ul id='list_suggestions' style={{ position: 'absolute' }}>
            {cities.map((city, index) => (
                <li
                    key={index}
                    onClick={(e) => { setCityName = e.target.innerText }}
                >{city}</li>
            ))}
        </ul>
    )
}

export default InputSuggestions