import React, { useEffect, useState } from 'react';
import { Container, TextField, Typography, List, ListItem, Button, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState([]);
  const [friendRecommendations, setFriendRecommendations] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // Fetch user's friend list and recommendations
    const fetchFriends = async () => {
      try {
        const res = await axios.get('/api/users/friends', { headers: { Authorization: `Bearer ${user}` } });
        setFriends(res.data.friends);
      } catch (err) {
        console.error('Error fetching friends', err);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const res = await axios.get('/api/users/recommendations', { headers: { Authorization: `Bearer ${user}` } });
        setFriendRecommendations(res.data.recommendations);
      } catch (err) {
        console.error('Error fetching recommendations', err);
      }
    };

    fetchFriends();
    fetchRecommendations();
  }, [user]);

  const handleUnfriend = async (friendId) => {
    // Implementing the unfriend functionality
    try {
        await axios.delete(`/api/users/unfriend/${friendId}`, {
          headers: { Authorization: `Bearer ${user}` },
        });
        // Remove friend from the list
        setFriends(friends.filter((friend) => friend._id !== friendId));
      } catch (error) {
        console.error('Error unfriending:', error);
      }
  };

  const handleAddFriend = async (friendId) => {
    // Implementing friend request functionality
    try {
        await axios.post(`/api/users/add-friend`, { friendId }, {
          headers: { Authorization: `Bearer ${user}` },
        });
        setRecommendations(recommendations.filter((recommendation) => recommendation._id !== friendId));
      } catch (error) {
        console.error('Error adding friend:', error);
      }
  };

  return (
    <Container>
      <Typography variant="h4">Welcome to Your Dashboard</Typography>
      <TextField
        label="Search Users"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Displaying Friends */}
      <Paper style={{ padding: '1rem', marginTop: '2rem' }}>
        <Typography variant="h5">Your Friends</Typography>
        <List>
          {friends.map((friend) => (
            <ListItem key={friend._id}>
              {friend.username}
              <Button variant="outlined" onClick={() => handleUnfriend(friend._id)} style={{ marginLeft: 'auto' }}>
                Unfriend
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Displaying Friend Recommendations */}
      <Paper style={{ padding: '1rem', marginTop: '2rem' }}>
        <Typography variant="h5">Friend Recommendations</Typography>
        <List>
          {friendRecommendations.map((recommendation) => (
            <ListItem key={recommendation._id}>
              {recommendation.username}
              <Button variant="contained" onClick={() => handleAddFriend(recommendation._id)} style={{ marginLeft: 'auto' }}>
                Add Friend
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Home;
