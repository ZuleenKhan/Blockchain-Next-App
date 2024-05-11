
import {X, Trash2,SquarePlus,MinusSquare,ArrowBigUp,ArrowBigDown } from 'lucide-react' ; 
import "semantic-ui-css/semantic.min.css";
import Star from './StarRatingComponent';
import { useEffect, useState } from 'react';
import StarRatingComponent from './StarRatingComponent';


const Review = () => {
  const [reviews,setReviews] = useState([]) ; 
  useEffect(()=>{
    async function fetchUsers(){
      const res = await fetch("http://localhost:3000/api/review",{cache : "no-store"})
      setReviews(await res.json()) ; 
    }
    fetchUsers() ; 
  },[]) ; 

  return (
    <>
    { reviews && reviews?.review?.map((review) => (
      <div style={{overflowWrap:"break-word"}}>
            <div style={{border:"solid 2px grey", padding:"3px", marginBottom: "6px"}}>
             
               <div style={{overflowWrap:"break-word"}}> 
                      { <p style={{overflowWrap:"break-word"}} key={review.id}>{review.title}</p> 
                   }
                      </div>
            </div>

           </div>
             ))}
    </>
  )
}

export default Review  ; 
