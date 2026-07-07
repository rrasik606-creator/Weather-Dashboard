const api="https://api.openweathermap.org/data/2.5/weather?units=metric&appid=94c04dbcda6e9b5932de599b94160803&q=";
const searchbox=document.querySelector(".search input");
const searchbutton=document.querySelector(".search-button"); 
const weatherimage=document.querySelector(".weather-icon");
const togglebutton=document.querySelector(".toggle");
const favbutton=document.querySelector(".favbutton");
const toggleimage=document.querySelector(".toggleimg");
const favimg=document.querySelector(".favimg");

async function weathercheck(city){
    const response=await fetch(api+city);
    const data =await response.json();
    if(data.cod==404){
        document.querySelector(".error").style.display="block"
        document.querySelector(".weather").style.display="none"
    }
    else{
        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";    
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
        document.querySelector(".windspeed").innerHTML=data.wind.speed+"km/h";
        if(data.weather[0].main=="Clouds"){
          weatherimage.src="clouds.png"
        }
        else if(data.weather[0].main=="Clear"){
          weatherimage.src="clear.png"   
        }
        else if(data.weather[0].main=="Drizzle"){
          weatherimage.src="drizzle.png"   
        }
        else if(data.weather[0].main=="Mist"){
          weatherimage.src="mist.png"   
        }
        else if(data.weather[0].main=="Rain"){
          weatherimage.src="rain.png"   
        }
        else {
          weatherimage.src="Snow.png"   
        }

        updateFavIcon();
    }
}

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

displayFavorites();

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function isFavorite(city) {
    return favorites.includes(city);
}

function displayFavorites() {

    const favList = document.querySelector(".favlist");

    favList.innerHTML = "";

    favorites.forEach(city => {

        const cityDiv = document.createElement("div");
        cityDiv.classList.add("favcity");
        cityDiv.innerText = city;

        favList.appendChild(cityDiv);

    });

}

function updateFavIcon() {
    const currentCity = document.querySelector(".city").innerHTML;
    if (isFavorite(currentCity)) {
        favimg.src = "favoriteimg1.png";
    } else {
        favimg.src = "favoriteimg.png";
    }

}

function displayFavorites() {
    const favList = document.querySelector(".favlist");
    favList.innerHTML = "";
    favorites.forEach(city => {
        const cityDiv = document.createElement("div");
        cityDiv.classList.add("favcity");
        cityDiv.innerText = city;
        cityDiv.style.cursor = "pointer";
        cityDiv.addEventListener("click", () => {
          searchbox.value="";
        weathercheck(city);
        });
        favList.appendChild(cityDiv);
    });
}

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const debouncedWeatherCheck = debounce((city) => {
    if (city.trim() !== "") {
        weathercheck(city);
    }
}, 600);

searchbox.addEventListener("input", () => {
    debouncedWeatherCheck(searchbox.value);
});


searchbutton.addEventListener("click", debounce(() => {
    weathercheck(searchbox.value);
}, 600));

togglebutton.addEventListener("click",()=>{
  if(toggleimage.src.includes("lightmode.png")){
    toggleimage.src="darkmode.png";
    document.querySelector("body").style.backgroundImage='url("background.jpeg")'
  }
  else{
     toggleimage.src="lightmode.png";
      document.querySelector("body").style.backgroundImage='url("background1.jpeg")'

  }
});

favbutton.addEventListener("click", () => {

    const cityName = document.querySelector(".city").innerHTML;

    if (isFavorite(cityName)) {
        favorites = favorites.filter(city => city !== cityName);
    } 
    else {
        favorites.push(cityName);
    }

    saveFavorites();
    displayFavorites();
    updateFavIcon();

});








