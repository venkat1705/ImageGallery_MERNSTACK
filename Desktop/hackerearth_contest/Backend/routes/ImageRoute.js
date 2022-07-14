const express = require('express');
const Images = require('../models/ImageModel');

const ImageRouter = express.Router();


//Route to create image 
ImageRouter.post('/createImage',(req,res)=>{
    const {name,pic,body} = req.body;
    if(!name || !pic || !body){
        return res.status(400).json({error:'All Feilds are required'});
    }

    const Image = new Images({name,pic,body});
    Image.save().then(()=>{
        res.json(Image);
    }).catch(()=>{
        res.status(400).json({error:'Please Check All the Fields'});
    })
});

//Route to list all the images

ImageRouter.get('/allImages',(req,res)=>{
    Images.find()
    .sort('-createdAt') 
    .then((result)=>{
        res.json({Images:result})
    }).catch((err)=>{
        console.log(err)
    });
});


//get single image

ImageRouter.get('/image/:id',(req,res)=>{
    Images.findOne({_id:req.params.id},(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    }).catch(err=>{
        console.log( err)
    })
})
//delete Image
ImageRouter.delete('/delete/:id',(req,res)=>{
   Images.remove({_id:req.params.id},(err,result)=>{
    res.send(result);
    console.log('deleted' + req.params.id)
   })
})

module.exports = ImageRouter;

