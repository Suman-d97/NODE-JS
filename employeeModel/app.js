require('dotenv').config();
const express=require('express')
const path=require('path')
const ejs=require('ejs')
const DatabaseConnection=require('./app/config/dbcon')
const cors=require('cors')

const app=express();

DatabaseConnection()

app.use(cors());
app.set('view engine','ejs')
app.set('views','views')

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('uploads',express.static(path.join(__dirname,'/uploads')))
app.use('/uploads',express.static('uploads')); 

const empApiRoute=require('./app/routes/employeeRoute')
app.use('/',empApiRoute)

const port =4005

app.listen(port,()=>{
    console.log("server is running on port",port)
})