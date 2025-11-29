import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  const { toggle } = useContext(ThemeContext);
  const { user, signout } = useContext(AuthContext);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <ThemeToggle onToggle={toggle} />
          {user ? (
            <>
              <Typography sx={{ mx:2 }}>{user.name} ({user.role})</Typography>
              <Button color="inherit" onClick={signout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/signin">Sign In</Button>
              <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ p:2 }}>{children}</Box>
    </>
  );
}
