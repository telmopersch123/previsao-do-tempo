import React, {useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import WeahterInfo from './WeatherInfo';
import WeahterIcon from './WeatherIcon';

function Search({props}) {
const [weatherData, setWeatherData] = useState(null);
const [timeUpdate1, setTimeUpdate1] = useState(null);
const [backgroundClass, setBackGroundClass] = useState('');
const [classes, setClasses] = useState('');
const [cloudsData, setCloudsData] = useState(null);
const [rainData, setRainData] = useState(null);
const [snowData, setSnowData] = useState(null);
const [unixSunrise, setUnixSunrise] = useState(null);
const [unixSunset, setUnixSunset] = useState(null);
const [convertedDateTime, setConvertedDateTime] = useState(null);
const [currentTimeUpdate, setCurrentTimeUpdate] = useState(null);
const apiKey = 'X23G21TAIZTX';

const [valorCorrente, setValorCorrente] = useState();
const [lat, setLat] = useState();
const [lon, setLon] = useState();

  function searchInput(e) {
    const valorCorrente = document.querySelector('input[name=searchInp]').value;
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${valorCorrente}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;
    const coords = `https://nominatim.openstreetmap.org/search?q=${valorCorrente}&format=json`;
    setValorCorrente(valorCorrente);
    axios.all([axios.get(url), axios.get(coords)])
      .then(axios.spread((weatherResponse, coordsResponse) => {
        const {sys} = weatherResponse.data;
       
        if(sys.country != undefined){
          const { lat, lon } = coordsResponse.data[0];
          setLat(lat);
          setLon(lon);
          axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`)
          .then(response => {
            const weatherData = weatherResponse.data;
            const cloudsData = weatherData.clouds;
            const rainData = weatherData.rain;
            const snowData = weatherData.snow;
            const {formatted} = response.data;
            const unixSunriseValue = weatherData.sys.sunrise;
            const unixSunsetValue = weatherData.sys.sunset;
            const convertedDateTimeValue = new Date().getTime() / 1000;

            setTimeUpdate1(formatted);
            setCurrentTimeUpdate(formatted);

            setWeatherData(weatherData);
            setCloudsData(cloudsData);
            setRainData(rainData);
            setSnowData(snowData);

            setUnixSunrise(unixSunriseValue);
            setUnixSunset(unixSunsetValue);
            setConvertedDateTime(convertedDateTimeValue);
          })
        }else{
          alert("Valor inserido é um continente ou um nome inválido")
        }
   
      }))
      .catch((error) => {
        alert('Ops, Algo deu errado! Atualize a Página Por Favor!', error.message);
      });
  }
  return (
    <div className='searchWr'>
      <div className="Search">
        <h2 id="titulo-header">Escreva em baixo o nome da Cidade!</h2>
        <form onSubmit={(e) => searchInput(e)}>
          <input placeholder="Digite o nome da cidade" className="inputCidade" name="searchInp" type="text" />
          <input id="inputPesquisar" type="submit" value="Pesquisar por cidade!" />
        </form>
        <p className='alert_fuso'>Algumas regiões possuem fuso horarios diferentes! Assim como o nascer do sol e o por do sol!</p>
      </div>

      {weatherData ? (
        <div className={`objects ${backgroundClass}`}>
           <WeahterIcon weather={weatherData.weather[0]} timeUpdate1={timeUpdate1} setClasses={setBackGroundClass} cloudsData={cloudsData} rainData={rainData} snowData={snowData} unixSunrise={unixSunrise} unixSunset={unixSunset} convertedDateTime={convertedDateTime} currentTimeUpdate={currentTimeUpdate} />
          <WeahterInfo data={weatherData} timeUpdate1={timeUpdate1} setClasses={setClasses} cloudsData={cloudsData} rainData={rainData} snowData={snowData} unixSunrise={unixSunrise} unixSunset={unixSunset} convertedDateTime={convertedDateTime} currentTimeUpdate={currentTimeUpdate} valorCorrente={valorCorrente} lat={lat} lon={lon}/>
        </div>
      ) : (
        <div>Pesquise por algo acima...</div>
      )}
    </div>
  );
}

export default Search;