import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';

export default function SignIn(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const { signin } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const nav = useNavigate();

  const handle = async () => {
    try{
      await signin(email, password);
      showNotification('Signed in successfully', 'info');
      nav('/dashboard');
    } catch(err){
      showNotification(err.response?.data?.message || 'Signin failed', 'error');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{mt:8}} boxShadow={2} p={4} borderRadius={2} bgcolor="background.paper">
        <Typography variant="h5">Sign In</Typography>
        <TextField label="Email" fullWidth sx={{mt:2}} value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField label="Password" fullWidth type="password" sx={{mt:2}} value={password} onChange={e=>setPassword(e.target.value)} />
        <Button variant="contained" sx={{mt:2}} fullWidth onClick={handle}>Sign In</Button>
      </Box>
    </Container>
  );
}
