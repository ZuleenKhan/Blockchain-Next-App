"use client"
import React, { useState } from 'react'
import { Form, Rating, TextArea,Button } from 'semantic-ui-react'
import { StarRatingInput } from 'react-star-rating-input';
import axios from 'axios';

function Reviewform() {
    const [title,setTitle] = useState("") ;
    const [description,setDescription] = useState("") ;
    const handleSubmit = async(e) =>{
      console.log("SD"); 
      e.preventDefault() ; 
      if(!title){
          alert("Bhai !! Kya kar raha hai ? ") ; 
          return ; 
      }
      try {
          await fetch('http://localhost:3000/api/review',{
                method:"POST",
                headers:{
                      "Content-type":"application/json",
                },
                body: JSON.stringify({title}),
          }) ; 
      }catch(error){ console.log(error)}
  }

  return (
    <div>
    <Form onSubmit={handleSubmit}>
      {/* <Star onChange={ (e)=>{setDescription(e.target.value); value={description} }}/> */}  
    <TextArea onChange={(e)=>setTitle(e.target.value)} rows={5} placeholder='Tell us more' 
         value={title}

         style={{marginBottom:"5px", border:"solid 2px grey"}}
      />
      <Button positive>Submit</Button>
         </Form>
    </div>
  )
}

export default Reviewform

