import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { FaWindowClose, FaTemperatureHigh, FaRegFlag, FaHome, FaCloud } from 'react-icons/fa'
import { GiWindsock } from 'react-icons/gi'
import Map from './Map'

const url = `http://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_WEATHER}&units=imperial&q=`

export default function App() {
  const [city, setCity] = React.useState('')
  const [info, setInfo] = React.useState(null)
  const [error, setError] = React.useState({show: false, msg: ''})

  const getWeather = async() =>{
    setError({show: false, msg: ''})
    const response = await axios(`${url}${city}`).catch((err) => console.log(err))
    // console.log(response.data);

    if(response){
      setInfo(response.data)
    }
    else{
      setInfo(null)
      setError({show: true, msg: `Not found weather for city "${city}"`})
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(city){
      getWeather(city)
    }
  }

  return (
      <main className='back'>
        <Wrapper>
          {info && <Map coordinates={{lat: info.coord.lat, lng: info.coord.lon}} />}
          <form onSubmit={handleSubmit} className='switch-from'>
            <h3>Check weather</h3>
            <input type="text" name="search" className="input" placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)} />
            {error.show && <p className="alert">{error.msg}</p>}
            <button type="submit" className="submit-btn">search</button>
          </form>

          <div className="result">
            {info && 
              <WeatInfo>
                <FaWindowClose className='close' onClick={() => setInfo(null)}/>
                <h4><FaRegFlag /> {info.sys.country}</h4>
                <h4><FaTemperatureHigh /> {parseFloat(info.main.temp / 3.7315).toFixed(0)} C</h4>
                <h4><FaTemperatureHigh /> felt {parseFloat(info.main.feels_like / 3.7315).toFixed(0)} C</h4>
                <h4><FaHome /> {info.weather[0].description}</h4>
                <h4><GiWindsock /> {info.wind.speed} m/s</h4>
                <h4><FaCloud /> {info.clouds.all} %</h4>
              </WeatInfo>
            }
          </div>
        </Wrapper>
      </main>
  )
}
const WeatInfo = styled.div`
  width: 100vw;
  height: 37vh;
  z-index: 100;
  background: var(--primary9);
  position: relative;
  padding-top: 1rem;
  margin-top: -19.2rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  flex-wrap: wrap;
  h4{
    margin: 0 0.5rem;
  }
  .close{
    position: absolute;
    right: 0.5%;
    top: 1.5%;
    font-size: 1.5rem;
    transition: var(--transition);
    cursor: pointer;
    &:hover{
      color: var(--primary6)
    }
  }
`
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  /* padding-top: 20vh; */
  h3{
    text-transform: uppercase;
  }
  form{
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  input[type='text'] {
    width: 33vw;
    background: var(--primary10);
    color: var(--primary2);
    border-color: transparent;
    padding: 0.35rem 0.75rem;
    margin: 1rem 0;
    border-radius: var(--radius);
    font-size: 1.5rem;
    box-shadow: var(--dark-shadow);
  }
  input[type='text']::placeholder{
    color: #fff;
    font-weight: bold;
  }
  .submit-btn {
    width: 15vw;
    background: var(--primary8);
    margin-top: 1.5rem;
    text-transform: uppercase;
    letter-spacing: var(--spacing);
    border-radius: var(--radius);
    border-color: transparent;
    font-size: 1rem;
    color: var(--primary17);
    padding: 0.35rem 1rem;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 10px 25px var(--primary8);
  }
  .submit-btn:hover {
    background: var(--primary12);
  }
  .alert {
    color: red;
    text-transform: uppercase;
    margin-top: 1rem;
  }
  @media (max-width: 800px){
    input[type='text']{
      width: 55vw;
    }
    .submit-btn{
      width: 30vw;
    }
  }
  @media (max-width: 400px){
    input[type='text']{
      width: 95vw;
    }
    .submit-btn{
      width: 70vw;
    }
  }
`
