<script>
    import { onMount } from 'svelte';
    import { weatherTranslations } from './WeatherSelector.js';
    
    // TODO: Get lat and lon based on request
    const lat = 59.927539;
    const lon = 10.761103;

    let weatherData;
    let imgSrc;

    const dateStyle = { weekday: 'long', month: 'short', day: 'numeric' };
    const dateFormat = new Intl.DateTimeFormat('no-NB', dateStyle);
    const currentDate = dateFormat.format(new Date());
    
    onMount(async () => {
        await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`)
            .then(r => r.json())
            .then(d => {
                const rawWeatherData = d.properties.timeseries[0].data
                const { air_temperature, wind_speed, relative_humidity, ultraviolet_index_clear_sky } = rawWeatherData.instant.details;
                weatherData = { air_temperature, wind_speed, relative_humidity, ultraviolet_index_clear_sky }
                weatherData.weather_type = rawWeatherData.next_1_hours.summary.symbol_code;
                imgSrc = `weathericons/svg/${rawWeatherData.next_1_hours.summary.symbol_code}.svg`

                const weatherTranslated = rawWeatherData.next_1_hours.summary.symbol_code.split("_");
                weatherData.weather_type_translated = weatherTranslations[`${weatherTranslated[0]}`].desc_nb

                // Attempt to set appropriate background
                if (weatherTranslated[0].includes("rain") || weatherTranslated[0].includes("sleet")){
                    weatherData.background = "rain";
                }
                else if (weatherTranslated[0] === "cloudy") {
                    weatherData.background = "cloudy";
                }
                else if (weatherTranslated[0] === "clearsky" && weatherTranslated[1] === "night") {
                    // set night
                    weatherData.background = "night";
                } 
                else if (weatherTranslated[0] === "clearsky" && weatherTranslated[1] === "day") {
                    // set night
                    weatherData.background = "sunny";
                }
                else if (weatherTranslated[0].includes("snow")) {
                    weatherData.background = "snow";
                }
                else if (weatherTranslated[0].includes("partly") || weatherTranslated[0].includes("fair")) {
                    if (weatherTranslated[1].includes("night")) {
                        weatherData.background = "night";
                    } 
                    else {
                        weatherData.background = "partial";
                    }
                }
                else if (weatherTranslated[0].includes("snow")){
                    weatherData.background = "snow";
                }
                else {
                    weatherData.background = "cloudy";
                }
                console.log(weatherData.background);
            })
    })


</script>

<div>
    {#if weatherData}
        <div class="weather-card {weatherData.background}">
            <p class="temp-text">{weatherData.air_temperature}&deg;</p>
            <div class="temp-meta">
                <p class="temp-meta-text">{currentDate}</p>
                <p class="temp-meta-text">Birkelunden</p>
            </div>
            <div class="icon-container">
                <img src={imgSrc} alt={weatherData.weather_type} width="100" height="100"/>
                <p class="temp-meta-text">{weatherData.weather_type_translated}</p>
            </div>  
        </div>      
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<style>

    .weather-card {
        max-width: 764px;
        color: #FFF;
        height: 262px;
        display: flex;
        flex-direction: row;   
    }

    .temp-text {
        font-size: 96px;
        line-height: 120px;
        margin: auto 24px 0 0;
    }

    .temp-meta {
        margin: auto 0 16px 0;
    }

    .temp-meta-text {
        font-size: 24px;
        line-height: 30px;
        margin: 0;
    }

    .icon-container {
        text-align: center;
        margin: auto 24px 16px auto;
    }

</style>