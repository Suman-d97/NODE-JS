
require("dotenv").config();
const Mongoose = require("mongoose");
const MongodbUrl = process.env.MONGODB_URL;

const dataConnect = async()=>{
    try {
        const connect = await Mongoose.connect(MongodbUrl);
        if(connect){
            console.log("Database Connected Successfully");
        }else{
            console.log("Database Connection Lost");
        }
    } catch (error) {
        console.log("Database Connection Error:", error);
    }
}

module.exports = dataConnect;