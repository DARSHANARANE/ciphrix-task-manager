import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../contexts/ThemeContext';

export default function ThemeToggle(){
  const { mode, toggle } = useContext(ThemeContext);
  return (
    <IconButton color="inherit" onClick={toggle}>
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
