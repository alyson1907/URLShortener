import React from 'react'
import uwuBotton from './uwuButton'
import './Card.css'
  



export default props =>
    

    <div className="Card">
        <p className="Conteudo">
            Encurta Link !!!
        </p>
        <div className="Footer">
            {props.titulo}
        </div>
        <div className='input-button'>
            <label><input className = "input" type='text' placeholder = "coloque o link aqui"></input></label>
             {uwuBotton()}
        </div>

    </div>



{/* <div className='Card'>
    <p className='Conteudo'>Encurta Link</p>
    <div className='input-botao'>
      <label>URL<input type='text'></input></label>
      <button>OK!!</button>
    </div>
  </div> */}