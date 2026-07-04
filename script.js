fetch("https://api.openweathermap.org/data/2.5/weather?q=kannur&appid=94c04dbcda6e9b5932de599b94160803&units=metric")
.then((response)=>response.json())
.then((data)=>console.log(data));    
