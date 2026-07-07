let x = fetch("https://api.openweathermap.org/data/2.5/weather?units=metric&appid=94c04dbcda6e9b5932de599b94160803&q=koz");


async function getWeather() {
    let response = await x;
    let data = await response.json();
    console.log(data);
}

getWeather();