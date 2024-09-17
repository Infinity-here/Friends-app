import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? '/api/auth/signup' : '/api/auth/login';
    try {
      const res = await axios.post(url, formData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      dispatch(setUser(token));  // Store JWT token
      navigate('/home');
    } catch (err) {
      console.error('Error during authentication', err);
    }
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Login'}</Typography>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          )}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '1rem' }}>
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>
          <Grid container justifyContent="flex-end" style={{ marginTop: '1rem' }}>
            <Grid item>
              <Button onClick={switchMode}>{isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
