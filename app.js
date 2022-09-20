const express = require('express');
const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'),)
    })
    
app.post('/',(req, res) => {
    const query = req.body.cityName;
    const appid= "ee219d7c96d0fe12ae849a7f827692ee";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid;+""

    https.get(url,(response)=>{
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write(`<p>Weather is currently ${desc}</p>`);
            res.write(`<h1>the temperature  in ${query} is ${temp} degree celsius</h1>`);
            res.write("<img src="+imgUrl+" />")
            res.send();
        })
    })
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000..")
})