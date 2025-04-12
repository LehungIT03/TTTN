import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Rating,
} from '@mui/material';
import { styled } from '@mui/system';
import { URL } from '../api';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme?.spacing(2),
  backgroundColor: '#f5f5f5',
}));

const CarReviews = ({ carId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ stars: 0, comment: '' });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${URL}/reviews/${carId}`);
        setReviews(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [carId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/reviews`, {
        carId,
        stars: newReview.stars,
        comment: newReview.comment,
      });
      setReviews([...reviews, response.data]);
      setNewReview({ stars: 0, comment: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Car Reviews
      </Typography>

      {/* List of Reviews */}
      <Grid container spacing={2}>
        {reviews.map((review) => (
          <Grid item xs={12} key={review._id}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <Rating value={review.stars} readOnly />
                  <Typography variant="h6" component="p" sx={{ marginLeft: 2 }}>
                    {review.stars} stars
                  </Typography>
                </Box>
                <Typography variant="body2">{review.comment}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Form to Add a New Review */}
      <Card sx={{ padding: 2, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add Your Review
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <Rating
              name="stars"
              value={newReview.stars}
              onChange={(e, newValue) => setNewReview({ ...newReview, stars: newValue })}
              size="large"
              required
            />
          </Box>
          <TextField
            label="Comment"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit Review
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default CarReviews;
