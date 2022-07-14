const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const ConnectDb = ()=>{
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true}).then(()=>{
        console.log('DB connected SuccessFully');
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = ConnectDb;
