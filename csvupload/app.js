
const express = require('express');
const path=require('path');
const app = express()
const dataConnect = require('./app/config/dbcon')
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require('./app/utils/limiter')

dataConnect()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(morgan('dev'))
app.use(helmet())
app.use(rateLimit)

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('uploads',express.static(path.join(__dirname,'/uploads')))
app.use('/uploads',express.static('uploads')); 


const csvAppRoute = require('./app/routes/csvRoute')
app.use(csvAppRoute)

const port = 4006;
app.listen(port,()=>{
    console.log('server is running',port);
    
})