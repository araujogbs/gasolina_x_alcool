import { useState, FormEvent } from 'react'
import calclogo from './assets/logo.png'
import './App.css'

interface InfoProps{
  compensa: string,
  gasolina: number,
  alcool: number,
}

function App() {

  const [gasolinaInput, setGasolinaInput] = useState(1)
  const [alcoolInput, setAlcoolInput] = useState(1)
  const [infoInput, setInfoInput] = useState<InfoProps>()


  function formatarMoeda(valor: number){

    let valorformatado = valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })

    return valorformatado
    
  }


  function calcpreco(event: FormEvent) {
    event.preventDefault();
    let calculo = (alcoolInput / gasolinaInput)

    if (calculo <= 0.7) {
      setInfoInput({
        compensa: 'alcool',
        gasolina: gasolinaInput,
        alcool: alcoolInput
      })
    }
    else {
      setInfoInput({
        compensa: 'gasolina',
        gasolina: gasolinaInput,
        alcool: gasolinaInput,
      })
      }

  }
  return (
    <div>
      <main className='container'>
        <img className='logo' src={calclogo} alt="logo da app" />
        <h1 className='title' >Qual a melhor opção?</h1>

        <form className='form' onSubmit={calcpreco} >

          <label >Alcool (preço por litro):</label>
          <input
           type="number"
            placeholder='4,90'
            value={alcoolInput}
            onChange={ (e) => setAlcoolInput(Number(e.target.value))}
             />

          <label >Gasolina (preço por litro):</label>
          <input 
          type="number" 
          placeholder='6,90'
          value={gasolinaInput} 
          onChange={ (e) => setGasolinaInput(Number(e.target.value))}
          />
          

          <input className='button' type="submit" value='calcular' />

        </form>

{infoInput && Object.keys(infoInput).length > 0 && (
        <div className='resultado'>
          <span className='infotitle'>Compensa usar {infoInput?.compensa}</span>

          <span>O valor da gasolina é {formatarMoeda(infoInput?.gasolina)}</span>

          <span>O valor do alcool é {formatarMoeda(infoInput?.alcool)}</span>

        </div>)}

      </main>
    </div>
  )
}
export default App
