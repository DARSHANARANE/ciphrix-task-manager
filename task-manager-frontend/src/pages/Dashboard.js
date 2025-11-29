import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Box, Button, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { getTasks, deleteTask } from '../services/taskService';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';
import AddEditTask from './AddEditTask';


export default function Dashboard(){
  const { user } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const limit = 6;
  

  const load = async (p=1) => {
    const res = await getTasks(p, limit);
    setTasks(res.data.tasks);
    setPages(res.data.pages);
    setPage(res.data.page);
  };

  const handleDelete = async (id) => {
    setTaskToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try{
      await deleteTask(taskToDelete);
      showNotification('Task deleted successfully', 'info');
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
      load(page);
    } catch(err){
      showNotification(err.response?.data?.message || 'Delete failed', 'error');
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  useEffect(()=>{ load(); }, []);

  return (
    <Container>
      <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', mb:2}}>
        <Typography variant="h5" className='heading-class'>Tasks</Typography>
        <Button variant="contained" onClick={()=>{ setEditingTask(null); setModalOpen(true); }}>Add Task</Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 2 }}>
        {tasks.map((t) => (
          <Paper key={t._id} className="task-card" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">{t.title}</Typography>
              <Box>
                <IconButton onClick={() => { setEditingTask(t); setModalOpen(true); }} size="small">
                  <EditIcon />
                </IconButton>
                {user?.role === 'admin' && (
                  <IconButton onClick={() => handleDelete(t._id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Typography variant="body2">{t.description}</Typography>
            <Typography variant="caption">
              {t.status} — {dayjs(t.createdAt).format('DD MMM YYYY')}
            </Typography>
          </Paper>
        ))}
      </Box>


      <AddEditTask
        open={modalOpen}
        onClose={()=>setModalOpen(false)}
        initialData={editingTask}
        onSaved={()=>{ setModalOpen(false); load(page); }}
        headerName={user?.name || user?.email}
        remainingCount={tasks.length}
      />

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* simple pagination */}
      <Box sx={{display:'flex', justifyContent:'center', mt:3, gap:1}}>
        <Button disabled={page<=1} onClick={()=>load(page-1)}>Prev</Button>
        <Typography sx={{p:1}}>{page} / {pages}</Typography>
        <Button disabled={page>=pages} onClick={()=>load(page+1)}>Next</Button>
      </Box>
    </Container>
  );
}
