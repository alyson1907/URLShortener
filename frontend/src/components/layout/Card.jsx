import React, { Component } from 'react'
import { useState } from 'react'


import './Card.css'
  



export default (props) => {
    
    const [grabInput, setNewgrabInput] = useState(null)
   
    function  handleChange (event) {
       setNewgrabInput(event.target.value);
       
    }   
    
    function handleClick(event){
        
        console.log(grabInput)
        
    }

    
    return (
    <div className="Card">
        <p className="Conteudo">
            Encurta Link !!!
        </p>
        <div className="Footer">
            {props.titulo}
        </div>
        
        <div className='input-button'>
           
            <label><input  className = "input" type='text' placeholder = "coloque o link aqui" onChange={handleChange}></input></label>
            <button type="button" className= "Button" onClick={handleClick}>
            Click me!
            </button>
            
            
        </div>

    </div>
    )
    
}

