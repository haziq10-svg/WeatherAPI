import { useState} from 'react'
import './weather.css'
import dayjs from 'dayjs'
import { connectApi } from '../api'


export function Weather() {
    let [inputSearch, setinputSearch] = useState("")
    let [weather, setweather] = useState(null)

   

    function keepInput(event) {
        setinputSearch(event.target.value)
    }

    async function searchButton() {
        if (inputSearch === "") {
            alert("Please Enter City")
            return
        }
        else {
            let result = await connectApi(inputSearch)
            if(result != null){
                setweather(result)
            }
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            searchButton()
        }
    }

    function clearInput(){
        setinputSearch("")
    }


    return (
        <div className="container">
            <div className='top'>
                <p className='p1'>Search City</p>
            </div>

            <div className='bottom'>
                <div className='menuSearch'>
                    <input onChange={keepInput} value={inputSearch} onKeyDown={handleKeyDown} className='search' type='text' placeholder='Search City'></input>
                    <button onClick={searchButton} className='searchbutton'>
                        <img className='searchimage' src="/image/search.png"></img>
                    </button>
                    <button onClick={clearInput} className='clearButton'>Clear</button>
                </div>

                {weather === null &&
                    <div className='weatherDisplay'>
                        <div className='temperatureDisplay'>
                            <img className='weatherImage' src="/image/weather/Clouds.png"></img>
                            <p className='p3'>-</p>
                            <p className='p2'>-</p>
                            <p className='p3'>-</p>
                            <p className='p3'>Description : -</p>
                        </div>
                        <div className='bottomDisplay'>
                            <div className='humidity'>
                                <p className='p3'>Wind</p>
                                <div className='imagehumidity'>
                                    <img className='imagePic' src="/image/1506761.png"></img>
                                    <p className='p4'>-</p>

                                </div>

                            </div>
                            <div className='wind'>
                                <p className='p3'>Humidity</p>
                                <div className='imagehumidity'>
                                    <img className='imagePic' src="/image/3105807.png"></img>
                                    <p className='p4'>-</p>
                                </div>
                            </div>

                        </div>
                        <p className='day'>{dayjs().format('dddd, MMMM D')}</p>
                    </div>}

                {weather !== null &&
                    <div className='weatherDisplay'>
                        <div className='temperatureDisplay'>
                            <img className='weatherImage' src={`/image/weather/${weather.weather[0].main}.png`}></img>
                            <p className='p3'>{weather.name}</p>
                            <p className='p2'>{weather.main.temp} °C</p>
                            <p className='p3'>{weather.weather[0].main}</p>
                            <p className='p3'>Description : {weather.weather[0].description}</p>
                        </div>
                        <div className='bottomDisplay'>
                            <div className='humidity'>
                                <p className='p3'>Wind</p>
                                <div className='imagehumidity'>
                                    <img className='imagePic' src="/image/1506761.png"></img>
                                    <p className='p4'>{weather.wind.speed} m/s</p>

                                </div>

                            </div>
                            <div className='wind'>
                                <p className='p3'>Humidity</p>
                                <div className='imagehumidity'>
                                    <img className='imagePic' src="/image/3105807.png"></img>
                                    <p className='p4'>{weather.main.humidity} %</p>
                                </div>
                            </div>

                        </div>
                        <p className='day'>{dayjs().format('dddd, MMMM D')}</p>
                    </div>}
            </div>




        </div>
    )
}