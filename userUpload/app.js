
const express = require('express');
const path=require('path');
const app = express()

const dataConnect = require('./app/config/dbcon')
dataConnect()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('uploads',express.static(path.join(__dirname,'/uploads')))
app.use('/uploads',express.static('uploads')); 

const userJsRoute = require('./app/routes/userRoute');
app.use(userJsRoute)


const port = 4004;
app.listen(port,()=>{
    console.log('server is running',port);
    
})