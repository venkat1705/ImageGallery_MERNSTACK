import React from 'react'
import { Link } from 'react-router-dom';
import './Pagination.css'

const Pagination = ({imagesPerPage, totalImages,paginate,currentPage}) => {
    const pageNumbers = [];
    for(let i=1;i<=Math.ceil(totalImages/imagesPerPage);i++){
        pageNumbers.push(i);
    }
  return (
   <nav>
        <ul className="pagination" >
            {pageNumbers.map(number=>(
                <li key={number} className="page-item">
                    <Link to="">&laquo;</Link>
                    <Link to = "" onClick = {()=>paginate(number)}  className={`page-link ${currentPage === number ? "active":""}`}>{number}</Link>
                    <Link to="">&raquo;</Link>
                </li>
            ))}
        </ul>
   </nav>
  )
}

export default Pagination
