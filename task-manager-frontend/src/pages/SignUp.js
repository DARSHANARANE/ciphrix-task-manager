import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';

export default function SignUp(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('user');
  const { signup } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const nav = useNavigate();

  const handle = async () => {
    try{
      await signup(name, email, password, role);
      showNotification('Signed up successfully', 'info');
      nav('/dashboard');
    } catch(err){
      showNotification(err.response?.data?.message || 'Signup failed', 'error');
    }
  };

  return (
    <Container maxWidth="xs">
    <Box sx={{mt:8}} boxShadow={2} p={4} borderRadius={2} bgcolor="background.paper">
        <Typography variant="h5">Sign Up</Typography>
        <TextField label="Full name" fullWidth sx={{mt:2}} value={name} onChange={e=>setName(e.target.value)} />
        <TextField label="Email" fullWidth sx={{mt:2}} value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField label="Password" fullWidth type="password" sx={{mt:2}} value={password} onChange={e=>setPassword(e.target.value)} />
        <TextField select label="Role (for demo)" value={role} onChange={e=>setRole(e.target.value)} sx={{mt:2, width: '100%'}}>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>
        <Button variant="contained" sx={{mt:2}} fullWidth onClick={handle}>Sign Up</Button>
      </Box>
    </Container>
  );
}
