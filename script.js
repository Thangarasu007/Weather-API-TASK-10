const apiKey = `3178fe2b73d658b753330ff00a76359f`;
let weatherInfo = document.getElementById('results');

async function getWeatherInfo(cityName){
    // make the request to API
    // get the data from API
    // Parse the data to html
    try{
        let respose = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        let data =  await respose.json()

        let iconId =  data.weather[0].icon;
        let iconResponse = await fetch(`https://openweathermap.org/img/wn/${iconId}@2x.png`);
        let iconResponseBlob = await iconResponse.blob()
        let iconUrl = URL.createObjectURL(iconResponseBlob);
        let descriptionId = data.weather[0].description;
        let countryName = data.sys.country;
        let maxTemp = data.main.temp;
        let lattitude =data.coord.lat;
        let longitude =data.coord.lon;
        let card = `<div class="card" >
                        <div class="card-body">
                            <h5 class="card-title" > Entered City :${cityName}</h5> 
                        </div>
                        <img src=${iconUrl}  alt="..." class="card-img-top" >
                        <p >Cloud : ${descriptionId}</p>
                        
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"> Max Temp : ${maxTemp} F</li>
                            <li class="list-group-item">Lattitude : ${lattitude}</li>
                            <li class="list-group-item">Longitude : ${longitude}</li>
                        </ul>
                    </div>`
 
            weatherInfo.innerHTML = card;
    }catch(error){
        console.error('error :',error);
    }
}
let button = document.getElementById('button');

button.addEventListener('click',(e)=>{
    e.preventDefault();

    let cityName = document.getElementById('cityName').value;

    getWeatherInfo(cityName);
})
