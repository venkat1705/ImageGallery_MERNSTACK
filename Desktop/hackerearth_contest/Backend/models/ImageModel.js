const mongoose = require('mongoose');


const ImageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    pic:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{timestamps:true})


const Images = mongoose.model('Images',ImageSchema);
module.exports = Images;