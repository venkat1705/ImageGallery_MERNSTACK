import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React, { useEffect, useState } from 'react'
import {FcAddImage} from 'react-icons/fc'
import {useNavigate} from 'react-router-dom'


const styles={
    wrapper:`flex justify-between bg-white-500 py-3 shadow-md w-full`,
    logo:`text-black mx-7 font-mono mt-2` ,
}

//Transition for the Modal
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Header = () => {
  const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const[name,setName] = useState('');
    const[body,setBody] = useState('');
    const[Image,setImage] = useState('');
    const[url,setUrl] = useState('');
    const [error,setError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleName = (e)=>{
    setName(e.target.value)
  }
  const handleBody = (e)=>{
    setBody(e.target.value)
  }

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(()=>{
    if(url){
    fetch('/api/images/createImage',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name,
        body,
        pic:url
      }),
    }).then(res=>res.json()).then(result=>{
      if(result.error){
        setError(result.error)
      }
      else{
        navigate('/')
      }
    }).catch(err=>{
      console.log( err);
    })
  }
  },[url])

  const Postdata = ()=>{
    const data = new FormData();
    data.append("file",Image);
    data.append("upload_preset","gallery");
    data.append("cloud_name","bunny1705");
    fetch("https://api.cloudinary.com/v1_1/bunny1705/image/upload",{
      method: "POST",
      body: data
    }).then(res=>res.json()).then(data=>{
      setUrl(data.url);
    }).catch(err=>{
      console.log(err)
    })
    
  }

  

  return (
    <nav className={styles.wrapper}>
        <div className={styles.logo}>
            <h3>Gallery</h3>
        </div>
        <div>
        <div>
      <Button onClick={handleClickOpen} disableRipple style={{backgroundColor:'transparent',marginRight:'160px'}}>
        <FcAddImage size={24}/>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
         <h3 style={{color:'red',marginLeft:'40px'}}>{error}</h3>
        <DialogTitle>{"Upload An Image"}</DialogTitle>
        <DialogContent>
        <TextField style={{marginTop:'20px',marginBottom:'20px',width:'550px'}}
          id="outlined-multiline-flexible"
          label="Image Name"
          multiline
          maxRows={4}
          value={name}
          onChange = {handleName}
          required = {true}

        />
        <TextField style={{marginTop:'20px',marginBottom:'20px',width:'550px'}}
          id="outlined-multiline-flexible"
          label="Image Details"
          multiline
          maxRows={4}
          value={body}
          onChange = {handleBody}
          required = {true}
        />
        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} required = {true}/>
        </DialogContent>
        <DialogActions>
          <Button disabled = {!name || ! body || !Image} onClick={()=>{handleClose();Postdata()}}>Upload</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
        </div>
    </nav>
  )
}

export default Header
