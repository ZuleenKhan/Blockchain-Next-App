import React, { useState, useEffect } from 'react';
import StarRating from 'react-rating-stars-component';
import axios from 'axios';

const StarRatingComponent = () => {
  const [rating, setRating] = useState(0);
  const [treviews, setTreviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from backend when component mounts
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/review'); // Replace with your API endpoint
      setTreviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleRatingChange = async (newRating) => {
    try {
      // Send review to backend
      const newReview = {
        description: `Rating: ${newRating}`
      };
      await axios.post('/api/review', newReview); // Replace with your API endpoint
      setRating(newRating);
      // Update reviews displayed on the screen
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  console.log(treviews) ; 
  return (
    <div>
      <h1>Your Rating: {rating}</h1>
      <StarRating
        count={5}
        value={rating}
        onChange={handleRatingChange}
        size={24}
        activeColor="#ffd700"
      />
      <h2>All Reviews:</h2>
      <ul>
        {treviews?.review?.map((revie, index) => (
          <li key={index}>
             {revie.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StarRatingComponent;
