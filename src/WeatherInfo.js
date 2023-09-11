import React, {useState, useEffect} from 'react';
import './App.css';
import moment from 'moment'
import axios from 'axios';
import Search from './Search';

function WeatherInfo({ data,timeUpdate1, setClasses, cloudsData, rainData, snowData, unixSunrise, unixSunset, convertedDateTime, valorCorrente, lat, lon}){

    //const xmlData = '<root><item>Value</item></root>';
    const [currentTime, setCurrentTime] = useState(new Date());
    const [formattedTime, setFormattedTime] = useState(moment(timeUpdate1, 'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss')); 
    const {main, name, sys, weather, wind, clouds, visibility, rain, snow, list} = data;

    const [forecastData, setForecastData] = useState([]);
    const apiKey = '7273310237e2d7aafdbb11f14ddd01f9'
    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then((response) => {
            // Filtrar os dados de previsão para até 5 dias
            const filteredData = response.data.list.filter((item, index) => index % 8 === 0);
            setForecastData(filteredData);
        })
        .catch((error) => {
            console.error('Erro ao buscar dados de previsão:', error);
        });
    }, [lat, lon]);



    useEffect(() => {
        setFormattedTime(moment(timeUpdate1, 'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'));
        // axios.get(`https://nominatim.openstreetmap.org/search?q=${valorCorrente}&format=xml`)
        // .then(response => {
        //     const xmlText = response.data;
        //   // Parse the XML string to an XML DOM object
        // const parser = new DOMParser();
        // const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        // // Find the element containing the temp_min value
        // const tempMinElement = xmlDoc.getElementsByTagName('temperature')[0].getAttribute('min');

        // console.log('Minimum Temperature:', tempMinElement);
        // });
    }, [timeUpdate1]);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());

            const newFormattedTime = moment(formattedTime, 'HH:mm:ss').add(1, 'seconds').format('HH:mm:ss');
            setFormattedTime(newFormattedTime);  
    }, 1000);
    return () => {
        clearInterval(interval);
    };
},[formattedTime])


const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
};
    const [Celsius, setIsCelsius] = useState(true);

    const myFunction = () => {
        setIsCelsius((prevCelsius) => !prevCelsius);
    }
    const convertTemperature = (celsius) => {
        if (Celsius) {
            return celsius;
        } else {
            return (celsius * 9/5) + 32;
        }
    };
    const convertorFahrenheit = (celsius) => {
        return (celsius * 9/5) + 32;
    } 

    const temperaturaDisplay = Celsius ? main.temp : convertorFahrenheit(main.temp);
    const feelsLikeDisplay = Celsius ? main.feels_like : convertorFahrenheit(main.feels_like);
    const temperaturaMax = Celsius ? main.temp_max : convertorFahrenheit(main.temp_max);
    const temperaturaMin = Celsius ? main.temp_min : convertorFahrenheit(main.temp_min);
    const convertToKmh = (ms) => {
        return ms * 3.6;
    }


        let windDirectionSymbol = null;
        if (wind.deg >= 0 && wind.deg <= 20 || wind.deg >= 340 && wind.deg <= 360) {
        windDirectionSymbol = <p>{"direção do vento: "+  '↓ Indo Sul'}</p>;
    } else if (wind.deg > 20 && wind.deg < 70) {
        windDirectionSymbol = <p>{"direção do vento: "+  ' ↙ Indo Sudoeste'}</p>;
    } else if (wind.deg >= 70 && wind.deg < 110) {
        windDirectionSymbol = <p>{"direção do vento: "+  ' ← Indo Oeste'}</p>;
    } else if (wind.deg >= 110 && wind.deg <= 160) {
        windDirectionSymbol = <p>{"direção do vento: "+ ' ↖ Indo Noroeste'}</p>;
    } else if (wind.deg > 160 && wind.deg <= 200) {
        windDirectionSymbol = <p>{"direção do vento: "+ ' ↑ Indo Norte'}</p>;
    } else if (wind.deg > 200 && wind.deg <= 250) {
        windDirectionSymbol = <p>{"direção do vento: "+ ' ↗ Indo Nordeste'}</p>;
    } else if (wind.deg > 250 && wind.deg <= 290) {
        windDirectionSymbol = <p>{"direção do vento: "+ ' → Indo Leste'}</p>;
    } else if (wind.deg > 290 && wind.deg < 340) {
        windDirectionSymbol = <p>{"direção do vento: "+ ' ↘ Indo Sudeste'}</p>;
    }
   // <button className='far_cel_button' onClick={myFunction}>{Celsius ? 'F' : 'C'}</button>
   <Search
  myFunction={myFunction} // Passa myFunction como prop
  Celsius={Celsius} // Passa Celsius como prop
/>
return(
    <div className="complementos">

        <div className ='itens_prim'>
            <p>{formattedTime !== undefined ? formattedTime + '' : 'Indisponível nessa região'}</p>
            <p>{sys.country !== undefined ? sys.country + '' : 'Indisponível nessa região'}</p>
            <p>{name !== undefined ? name + '' : 'Indisponível nessa região'}</p>
            <p>{weather[0].description !== undefined ? weather[0].description + '' : 'Indisponível nessa região'}</p>
        </div>

        <div className="div_parag">
        {main.temp !== undefined ? (
            <p>{temperaturaDisplay.toFixed(0)} {Celsius ? '°C' : '°F'}</p>
        ): (
            <p><span className={main.temp !== undefined ? '' : 'dados_ind'}>{main.temp !== undefined ? main.temp : 'Indisponível nessa região'}</span> {Celsius ? '°C' : '°F'}</p>
        )}
    {main.feels_like !== undefined ? (
            <p>{'Sensação de ' + feelsLikeDisplay.toFixed(0) + ' '} {Celsius ? '°C' : '°F'}</p>
        ): (
            <p>Sensação de <span className={main.feels_like !== undefined ? '' : 'dados_ind'}>{main.feels_like !== undefined ? main.feels_like : 'Indisponível nessa região'}</span> {Celsius ? '°C' : '°F'}</p>
        )}
    {main.temp_max !== undefined || main.temp_min !== undefined ? (
            <p>{'Máx: '+ temperaturaMax.toFixed(0)}{Celsius ? '°C ' : '°F '} | {'Min: '+ temperaturaMin.toFixed(0)}{Celsius ? '°C ' : '°F '}</p>
        ): (
            <p>Máx: <span className={main.temp_max !== undefined ? '' : 'dados_ind'}>{main.temp_max !== undefined ? main.temp_max : 'Indisponível nessa região'}</span> | Min: <span className={main.temp_min !== undefined ? '' : 'dados_ind'}>{main.temp_min !== undefined ? main.temp_min : 'Indisponível nessa região'}</span> {Celsius ? '°C' : '°F'}</p>
        )}

    {wind.speed !== undefined ? (
            <p>velocidade do vento:&nbsp;{convertToKmh(wind.speed).toFixed(0)} km/h</p>
        ): (
            <p>velocidade do vento:<span className={wind.speed !== undefined ? '' : 'dados_ind'}>{wind.speed !== undefined ? wind.speed + 'km/h' : 'Indisponível nessa região'}</span></p>
        )}
        {wind.gust !== undefined ? (
        <p>Rajada de:&nbsp;{convertToKmh(wind.gust).toFixed(2)} km/h</p>
        ) : (
            <p>Rajada de: <span className={wind.gust !== undefined ? '' : 'dados_ind'}>{wind.gust !== undefined ? wind.gust + 'km/h' : 'Indisponível nessa região'}</span></p>
        )}

    {windDirectionSymbol}
    </div>
    <div className="div_parag">
    {visibility !== undefined ? (
        <p>{(visibility / 1000).toFixed(1)}Km de Visibilidade</p>
        ) : (
            <p>Humidade: <p className="dados_ind"><span className={visibility !== undefined ? '' : 'dados_ind'}>{visibility !== undefined ? visibility + 'Km de Visibilidade' : 'Indisponível nessa região'}</span></p></p>
        )}
    {main.humidity !== undefined ? (
        <p>{main.humidity}% de Humidade</p>
        ) : (
            <p>Humidade: <p className="dados_ind"><span className={main.humidity !== undefined ? '' : 'dados_ind'}>{main.humidity !== undefined ? main.humidity + '% de Humidade' : 'Indisponível nessa região'}</span></p></p>
        )}
        {main.pressure !== undefined ? (
        <p>Pressão atmosférica (Mar): {main.pressure}hPa</p>
        ) : (
            <p>Pressão atmosférica (Mar): <span className={main.pressure !== undefined ? '' : 'dados_ind'}>{main.pressure !== undefined ? main.pressure + 'hPa' : 'Indisponível nessa região'}</span></p>
        )}
        {main.grnd_level !== undefined ?  (
            <p>Pressão atmosférica (Solo): {main.grnd_level}hPa</p>
        ) : (
            <p>Pressão atmosférica (Solo): <span className={main.grnd_level !== undefined ? '' : 'dados_ind'}>{main.grnd_level !== undefined ? main.grnd_level + 'hPa' : 'Indisponível nessa região'}</span></p>
        )}
        </div>
        <div className="forecast">
        <h2>Previsão do tempo:</h2>
        {forecastData.map((forecast, index) => (
        <div key={index} className="forecast-day">
            <p>Data: {moment(forecast.dt_txt).format('DD/MM/YYYY')}</p>
            <p>Temperatura Máxima: {(convertTemperature(kelvinToCelsius(forecast.main.temp_max), Celsius)).toFixed(0)}
            {Celsius ? '°C' : '°F'}</p>
            <p>Temperatura Mínima: {(convertTemperature(kelvinToCelsius(forecast.main.temp_min), Celsius)).toFixed(0)} {Celsius ? '°C' : '°F'}</p>
            {/* Outras informações de previsão podem ser exibidas aqui */}
        </div>
        ))}
    </div>
    </div>
); 
}

export default WeatherInfo;