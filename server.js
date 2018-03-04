const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app=express();

//api to interact with mongo
var api = require('./server/api');

//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Angular dist output folder
app.use(express.static(path.join(__dirname,'dist')));

//api location
app.use('/',api);

//Send all the other requests to angular app
app.get('*'), (get, res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));
}

//set port
var port= process.env.PORT || '3000';
app.set('port',port);

var server = http.createServer(app);
server.listen(port, ()=> console.log(`server is running on ${port}`));