const express = require('express');
const app = express();
const port = 4005;
const ejs = require('ejs');

app.set('view engine','ejs');
app.set('views','views');

const homeRoute = require('./app/routes/homeroute');
app.use(homeRoute);

app.listen(port,()=>{
    console.log('server is running', port);
})