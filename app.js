const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")

    });

app.post("/", function(req,res){

   const query = req.body.city;
   const apiKey = "e3d8bdf38090b98ce198973d3ca5cb56";
   const unit = "metric";

   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

   https.get(url, function(response) {
     console.log(response.statusCode);

     response.on("data", function(data) {
       const weather = JSON.parse(data);
       const temp = weather.main.temp;
       const climate = weather.weather[0].description;
       const icon = weather.weather[0].icon;
       const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
       res.write("<h1>The temperature in "+ query+ " is " + temp + " degrees Celcius</h1>");
       res.write("<h3>The weather is currently " + climate + "</h3>");
       res.write("<img src = " + imgurl + ">");
       res.send();

     });
   });

});




app.listen(3000, function() {
  console.log("Sever started at port 3000");
});
