import React, { useState, useEffect, useContext } from 'react';
import { Container, TextField, Button, Typography, MenuItem, Box, Modal, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { createTask, updateTask } from '../services/taskService';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { NotificationContext } from '../contexts/NotificationContext';

export default function AddEditTask({ open, onClose, initialData, onSaved, headerName, remainingCount }){
  const params = useParams();
  const routeId = params?.id;
  const isRoute = !!routeId;
  const nav = useNavigate();
  const { showNotification } = useContext(NotificationContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(()=>{
    if(isRoute){
      (async ()=>{
        const res = await axiosInstance.get(`/tasks`);
        const all = res.data.tasks;
        const t = all.find(x=>x._id===routeId);
        if(t){ setTitle(t.title); setDesc(t.description); setStatus(t.status); }
      })();
    } else {
      if(initialData){
        setTitle(initialData.title || '');
        setDesc(initialData.description || '');
        setStatus(initialData.status || 'pending');
      } else {
        // if used as modal for add, clear fields when opened
        setTitle(''); setDesc(''); setStatus('pending');
      }
    }
  }, [routeId, isRoute, initialData, open]);
  const submit = async () => {
    try{
      if(isRoute){
        await updateTask(routeId, { title, description: desc, status });
        showNotification('Task updated successfully', 'info');
        nav('/dashboard');
      } else {
        if(initialData && initialData._id){
          await updateTask(initialData._id, { title, description: desc, status });
          showNotification('Task updated successfully', 'info');
        } else {
          await createTask({ title, description: desc, status });
          showNotification('Task created successfully', 'info');
        }
        if(onSaved) onSaved();
        if(onClose) onClose();
      }
    } catch(err){
      showNotification(err.response?.data?.message || 'Save failed', 'error');
    }
  };

  const form = (
    <Container maxWidth="sm" disableGutters p={0}>
      
      <Box sx={{ mt: 0,  position: 'relative', overflow: 'hidden' }}>
     
        <Box sx={{ borderRadius: 2,  bgcolor: 'background.paper' }}>
          
          <Box sx={{ p: 3, pb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h5" className='heading-class'>
                  { ((isRoute || (initialData && initialData._id)) ? 'Edit Task' : 'Add Task')}
                </Typography>
             
              </Box>
            </Box>
          </Box>

          <Box sx={{ p: 3, pt: 1 }}>
            <Typography variant="srOnly" sx={{ display: 'none' }}>form container</Typography>
            <TextField label="Task Title" fullWidth sx={{ mt: 2 }} value={title} onChange={e => setTitle(e.target.value)} />
            <TextField label="Description" fullWidth multiline rows={4} sx={{ mt: 2 }} value={desc} onChange={e => setDesc(e.target.value)} />
            <TextField select label="Status" value={status} onChange={e => setStatus(e.target.value)} sx={{ mt: 2, width: '100%' }}>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </TextField>

            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button variant="contained" sx={{ width: isMobile ? '100%' : 'auto' }} onClick={submit}>{(isRoute || (initialData && initialData._id)) ? 'Update' : 'Create'}</Button>
              {!isRoute && (
              <Button variant="outlined" sx={{ width: isMobile ? '100%' : 'auto' }} onClick={onClose}>Cancel</Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );

  if(!isRoute){
    // used as modal/drawer component
    if(isMobile){
      // Bottom drawer for mobile
      return (
        <Drawer 
          anchor="bottom" 
          open={!!open} 
          onClose={onClose}
          PaperProps={{
            sx: {
              borderRadius: '25px 25px 0 0'
            }
          }}
        >
          <Box sx={{ p: 2, maxHeight: '90vh', overflow: 'auto' }} >
            {form}
          </Box>
        </Drawer>
      );
    } else {
      // Modal for desktop
      return (
        <Modal open={!!open} onClose={onClose}>
          <Box sx={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', width: 520, bgcolor:'background.paper', boxShadow:24, borderRadius:1}}>
            {form}
          </Box>
        </Modal>
      );
    }
  }
  return form;
}
