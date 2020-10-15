import React from 'react'
import { useState } from 'react'
import axios from 'axios'


import './Card.css'





export default (props) => {
    
   
    //event tracka
    const [grabInput, setNewgrabInput] = useState(null)
    const [uwu , setNewUwu] = useState(null)
    const [errors, setNewErrors] = useState(null)
    
   
   
    function  handleChange (event) {
        
        setNewgrabInput(event.target.value);
       
    }   
    
    


   async function handleClick(event){
        
    
    event.preventDefault() 
         console.log(grabInput)
      
      const uwus = await axios.post('https://ppshort.herokuapp.com/shorten', {"url": grabInput})
      
      .then ( response => {
        console.log(response.request)
        if(response.request.status === 201){
            setNewUwu(response.data.short)
        }
        
        
           
            
      } )
        .catch(error => {
            console.log(error.request)
           setNewErrors("Error: " + error.request.status + " URL INVÁLIDA")
           setTimeout(() => {  
               setNewErrors(""); }, 2000);
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
           
            <label><input  className = "input" type='text' placeholder = "coloque o link aqui       " onChange={handleChange}></input></label>
            <button type="button" className= "Button" onClick={handleClick}>
            Click me!
            
            </button>
            <card className="uwu" type = "text">https://ppshort.herokuapp.com/{uwu}</card>
            <p className = "error" type = "text">{errors}</p>
            
        </div>

    </div>
    )
    
}

