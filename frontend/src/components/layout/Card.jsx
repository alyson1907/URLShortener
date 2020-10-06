import React from 'react'
import { useState } from 'react'
import axios from 'axios'


import './Card.css'





export default (props) => {
    
   
    //event tracka
    const [grabInput, setNewgrabInput] = useState(null)
    const [uwu , setNewUwu] = useState(null)
    
   
   
    function  handleChange (event) {
        
        setNewgrabInput(event.target.value);
       
    }   
    
    


   async function handleClick(event){
        	event.preventDefault() 
      console.log(grabInput)
      
      const uwus = await axios.post('https://ppshort.herokuapp.com/shorten', {"url": grabInput})
      .then ( response => {
        console.log(response.data.short)
        setNewUwu(response.data.short)
        
           
            
      } )
        .catch(error => {
            console.log(error)
        })
        
        
        
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
            <h1 className="uwu" type = "text">https://ppshort.herokuapp.com/{uwu}</h1>
            
        </div>

    </div>
    )
    
}

