const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const from=document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelector('.city');
const locationBtn = document.querySelector('.devloc');

btn.addEventListener('click',(e)=>
{
    e.preventDefault();
    weather(search.value);
    search.value='';
});

function weather(search){
    let api =`https://api.weatherapi.com/v1/current.json?key=1063f3b1af984e8eaea103838232207 &q=${search}`;
    try{
        fetch(api).then(response => response.json()).then(data => {
            temp.innerHTML = data.current.temp_c + "&#176";
            conditionOutput.innerHTML = data.current.condition.text;//images
            dateOutput.innerHTML = data.location.localtime;//not working
            nameOutput.innerHTML = data.location.name;
            cloudOutput.innerHTML = data.current.cloud;
            humidityOutput.innerHTML = data.current.humidity+ '%';
            windOutput.innerHTML = data.current.wind_kph+ 'Km/h';
            //icon
            const icontype=data.current.condition.text;
            iconchange(icontype)
            //image
            let timeOfDay = data.current.is_day;
            if(timeOfDay==0){
            app.style.backgroundImage = `url(https://www.fxguide.com/wp-content/uploads/2019/05/3120_1540_59.1065.jpg)`; //night image
            iconnight(icontype)
            }
            const code = data.current.condition.code;
            if(code == 1000){//clean
                app.style.backgroundImage = `url(https://i.pinimg.com/originals/e6/91/cb/e691cb656b09a1b16ff0e4960b7093d9.jpg)`;
                if(timeOfDay==0){
                    app.style.backgroundImage = `url(https://www.fxguide.com/wp-content/uploads/2019/05/3120_1540_59.1065.jpg)`;
                }
            }
            else if(code>=1003 && code<=1282){//cloudy
                app.style.backgroundImage = `url(https://www.wallpaperbetter.com/wallpaper/883/372/1020/evening-sky-hd-1080P-wallpaper-middle-size.jpg)`;// evening
                if(timeOfDay==0){
                    app.style.backgroundImage = `url(https://www.pixel4k.com/wp-content/uploads/2018/10/clouds-sky-dark-overcast-skylight-4k_1540575150.jpg)`;
                }
            }
            else if(code>=1063 && code<=1252){//rainy
                app.style.backgroundImage = `url(https://getwallpapers.com/wallpaper/full/2/2/c/665780.jpg)`; // rain img
                if(timeOfDay==0){
                    app.style.backgroundImage = `url(http://getwallpapers.com/wallpaper/full/2/e/4/699280-free-download-rainy-wallpapers-2560x1600-high-resolution.jpg)`;
                }
            }
            else {//snow
                app.style.backgroundImage=`url(https://www.wallpaperbetter.com/wallpaper/163/590/389/soft-winter-country-1080P-wallpaper-middle-size.jpg)`; // snow img
                if(timeOfDay==0){
                    app.style.backgroundImage = `url(https://www.wallpaperflare.com/static/639/20/977/mountains-night-snowy-mountain-wallpaper.jpg)`;
                }
            }

        });
       
        
    }
    catch(error){
        alert("Unable to find city");
    }
}
//icon
function iconchange(icontype){
    if(icontype=="Sunny" || icontype=="Clear"){
        icon.src="//cdn.weatherapi.com/weather/64x64/day/113.png"
    }
    if(icontype=="Cloudy"){
        icon.src="//cdn.weatherapi.com/weather/64x64/day/122.png"
    }
    if(icontype=="Rainy"){
        icon.src="//cdn.weatherapi.com/weather/64x64/day/200.png"
    }
    if(icontype=="Partly cloudy"){
        icon.src="//cdn.weatherapi.com/weather/64x64/day/116.png"
    }
    if(icontype=="Mist"){
        icon.src="//cdn.weatherapi.com/weather/64x64/day/248.png"
    }
    if(icontype=="Overcast"){
        icon.src="//cdn.weatherapi.com/weather/64x64/day/368.png"
    }
    if(icontype=="Light rain shower"){
        icon.src="//cdn.weatherapi.com/weather/64x64/day/353.png"
    }
    if(icontype=="Patchy rain possible"){
        icon.src="//cdn.weatherapi.com/weather/64x64/day/281.png"
    }
}

function iconnight(icontype){
    if(icontype=="Clear"){}
    if(icontype=="Cloudy"){
        icon.src="//cdn.weatherapi.com/weather/64x64/night/122.png"
    }
    if(icontype=="Rainy"){
        icon.src="//cdn.weatherapi.com/weather/64x64/night/359.png"
    }
    if(icontype=="Partly cloudy"){
        icon.src="//cdn.weatherapi.com/weather/64x64/night/119.png"
    }
    if(icontype=="Mist"){
        icon.src="//cdn.weatherapi.com/weather/64x64/night/248.png"
    }
    if(icontype=="Overcast"){
        icon.src="//cdn.weatherapi.com/weather/64x64/night/368.png"
    }
    if(icontype=="Light rain shower"){
        icon.src="//cdn.weatherapi.com/weather/64x64/night/353.png"
    }
    if(icontype=="Patchy rain possible"){
        icon.src="//cdn.weatherapi.com/weather/64x64/night/281.png"
    }
}

//get location
const findlocation = () => {
    const success = (position) => {
        console.log(position)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        //console.log(longitude + ' '+ latitude);
        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        fetch(geoApiUrl)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            search.value = data.principalSubdivision
            weather(search.value);
        })
    }
    const error = () => {
        alert("Unable to get your location");
    }
    navigator.geolocation.getCurrentPosition(success, error);
}

//locationBtn.addEventListener('click',findlocation());
