const express = require('express'),
cors = require('cors'),
app = express(),
citiesData = require('./public/store/cities.json'),
citizenData = require('./public/store/citizens.json');

app.use(cors());
app.get('/', (req,res) => {
    res.send("Okey")
})
app.get('/cities', (req,res) => {
    res.send(JSON.stringify(citiesData))
})
app.get('/people', (req,res)  => {
    res.send(JSON.stringify(citizenData));
})
app.listen(8080, function ()  {
    console.log('Server started on port 8080');
})