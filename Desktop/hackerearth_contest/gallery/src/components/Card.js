
import React, { useState } from 'react'
import './Card.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Cards = ({data,setData}) => {
  const [updatedData,setUpdatedData] = useState([]);
  const [open, setOpen] = useState(false);
  

  const deleteImage = (id)=>{
    fetch(`/api/images/delete/${id}`,{
      method:'delete',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res=>res.json()).then(result=>{
      const newData = data.filter(item=>{
        return item._id !== result._id;
      })
      setData(newData)
    })

  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const getImage = (id)=>{
  fetch(`/api/images/image/${id}`,{
    method:'GET',
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res=>res.json()).then(result=>{
    setUpdatedData(result)
    console.log(result)
  })
}
  



  

  return (
    <div className="main-card">
      {data.map((image)=>{
        return (
          <div className="card" key={image._id}>
            <div className="img-top">
              <img src={image.pic} alt={image.name}/>
            </div>
            <div className="footer">
              <h3>{image.name}</h3>
              <p>{image.body}</p>

              <div class="px-6 pt-4 pb-2 ml-7">
              <span class="inline-block bg-gray-200 rounded-full px-6 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
              <span class="inline-block bg-gray-200 rounded-full px-6 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
              <span class="inline-block bg-gray-200 rounded-full px-6 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div>
              <div className="buttons">
              <Button variant="outlined" onClick = {()=>{handleClickOpen();getImage(image._id)}} style={{marginLeft:'20px',marginTop:'20px',marginBottom:'10px'}}>View Details</Button>
              <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Image Details"}</DialogTitle>
        <DialogContent>
            <img src = {updatedData.pic} alt={updatedData.name} style={{width:'900px'}}/>
            <h3 style={{fontWeight:'bold',marginTop:'20px'}}>{updatedData.name}</h3>
            <p style={{color:'Gray',marginLeft:'20px'}}>{updatedData.body}</p>
            <div class="px-6 pt-4 pb-2 -ml-5 mt-5">
              <span class="inline-block bg-gray-200 rounded-full px-6 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
              <span class="inline-block bg-gray-200 rounded-full px-6 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
              <span class="inline-block bg-gray-200 rounded-full px-6 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose();deleteImage(image._id)}} style={{color:'red'}}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
              <Button variant="outlined" onClick = {()=>{deleteImage(image._id)}} color="error" style={{marginRight:'20px',marginTop:'20px',marginBottom:'10px'}}>Delete</Button>
              </div>
            </div>
          </div>
          )
      })}
    </div>    
  )
}

export default Cards
