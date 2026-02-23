const express = require('express')
const path = require('path')
const app = express()
const dataConnection = require('./app/config/dbcon')
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require('./app/utils/limiter')
dataConnection();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'))
app.use(helmet())
app.use(rateLimit)

const productAppRoute = require('./app/router/productRouter')
app.use(productAppRoute)

const port = 4002
app.listen(port,(error)=>{
    if(error){
        console.log('Unable to run the server');
    }else{
        console.log(`Server is running on this port: ${port}`)
    }
})