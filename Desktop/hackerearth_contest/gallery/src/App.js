import './App.css';
import Header from './components/Header';
import {BrowserRouter} from 'react-router-dom'
import Card from './components/Card';
import Pagination from './components/Pagination';
import { useEffect, useState } from 'react';

function App() {
  const [data,setData] = useState([]);
  const [loading,setIsLoading] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(9);
  

  useEffect(()=>{
    fetch('/api/images/allImages', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res=>res.json()).then(result=>{
      setData(result.Images)
      setIsLoading(false)
    })
  },[data]);

  const indexOfLastPost = currentPage * imagesPerPage;
  const indexOFirstPost = indexOfLastPost - imagesPerPage;
  const currentimages = data.slice(indexOFirstPost,indexOfLastPost)

  //pagination to change the page
const paginate = (pageNumber)=>setCurrentPage(pageNumber);
  return (
    <div>
      <BrowserRouter>
      <Header/>

      <Card data={currentimages} loading={loading}/>
      <Pagination imagesPerPage={imagesPerPage} totalImages = {data.length} paginate={paginate} currentPage = {currentPage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
