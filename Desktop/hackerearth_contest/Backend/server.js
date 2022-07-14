const express = require('express');
const dotenv = require('dotenv');
const ImageRouter = require('./routes/ImageRoute');
require('./dbConnect')();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use('/api/images',ImageRouter);
app.listen(PORT,()=>{
    console.log(`server running on Port ${PORT}`);
})