import "semantic-ui-css/semantic.min.css";
import { useEffect, useState } from 'react';
import axios from "axios";

const Review = () => {
  const [reviews,setReviews] = useState([]) ; 
  useEffect(()=>{
    async function fetchUsers(){
      try{
        const res = await fetch("http://localhost:3000/api/review",{cache : "no-store"})
        setReviews(await res.json()) ; 
      }catch(error){console.log(error.response.data) ; }
    }
    fetchUsers() ; 
  },[]); 

  return (
    <div style={{overflowWrap:"break-word" , width:"fit-content" , blockSize:"fit-content"}}>
    { reviews && reviews?.review?.map((review) => (
      <div style={{overflowWrap:"break-word", width:"fit-content", blockSize:"fit-content"}}>
            <div style={{border:"solid 2px grey",padding:"3px", marginBottom: "6px", width:"fit-content", blockSize:"fit-content"}}>
             
               <div style={{overflowWrap:"break-word" , width:"fit-content" , blockSize:"fit-content"}}> 
                      { <p style={{overflowWrap:"break-word", width:"fit-content", blockSize:"fit-content"}} key={review.id}>{review.title}</p> 
                   }
                      </div>
            </div>

           </div>
             ))}
    </div>
  )
}

export default Review  ; 
