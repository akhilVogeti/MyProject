import React, { useState, useEffect } from 'react';
import { Button, Card, Checkbox, Typography, Divider} from '@mui/joy';
import Add from '@mui/icons-material/Add';
import {fetchTasks, createNewTask, updateExistingTask, deleteExistingTask } from '../features/task/taskThunk'
import { Task } from '../types'
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from "react-icons/fa";
import { TaskModal } from './TaskModal';
import { cssStyles, muiStyles } from './styles/styles';
import { RootState, AppDispatch } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import {logout } from '../features/auth/authSlice'




const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: RootState) => state.auth.token); 
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  
  const [newTask, setNewTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(fetchTasks(token)); 
    }
    document.title = 'Dashboard';
  }, [token, dispatch, navigate]);

  const handleCheckboxChange = async (taskId: string) => {
    const taskToUpdate = tasks.find(task => task._id === taskId);
    if (taskToUpdate && token) {
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      try {
        await dispatch(updateExistingTask({ taskId, updatedTask, token }));
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };

  const openModal = (task: Task | null) => {
    setNewTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setNewTask(null);
    setModalOpen(false);
  };

  const handleSaveTask = async (updatedTask : Task) => {

    if (updatedTask && token) {
      try {
        if (updatedTask._id) {
          await dispatch(updateExistingTask({
          taskId: updatedTask._id,         
          updatedTask,      
          token,     
          }));
        } else {
          updatedTask.completed = false;
          await dispatch(createNewTask({
            task:updatedTask, 
            token
          }));
        }
        closeModal();
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
  };

  const removeTask = async (taskId: string) => {
    if(token){
      try {
        await dispatch(deleteExistingTask({taskId, token}))
        
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
  };

  return (
    <div >
      <div style={cssStyles.header}>
        
        <Typography level="h1">Welcome to Task Manager</Typography>
        <Button color="danger" onClick={handleLogout}>Logout</Button>
      </div>
     
      <Divider></Divider>
     
      <div style={{paddingTop:'10px'}} >
        <Button  startDecorator={<Add />} onClick={() => openModal(null)}>Add Task</Button>
      </div>

      <div style={cssStyles.contentHeader}> 
        {tasks && tasks.map((task) => (
          <Card key={task._id} variant="outlined" sx={muiStyles.card}>
        
            <div style={cssStyles.cardHeader}>
              <Button variant="plain" color="danger" onClick={() => removeTask(task._id)}> <FaTrash /> </Button>
              <Typography level="h3">{task.title}</Typography>
              <Button variant="plain" color="primary" onClick={() => openModal(task)}> <FaEdit /> </Button>
            </div> 

            <div style={cssStyles.cardDescription}>
              <Typography level="h4" style={cssStyles.taskDescription}>
                {task.description}
              </Typography>
            </div>

            <div style={{padding:'10px'}}>
              <Divider></Divider>
              <div style={cssStyles.cardFooter}>
                <Checkbox checked={task.completed}onChange={() => handleCheckboxChange(task._id)}/>
                {task.completed? 
                <Typography level="h4" color='success' >{`completed`}</Typography> : 
                <Typography level="h4" color='danger' >{`pending`}</Typography> }
              </div>
            </div>

          </Card>
        ))}
      </div>
      
      <TaskModal isOpen={modalOpen} onClose={closeModal} onSave={handleSaveTask} task={newTask} />
    </div>
  );
};

export default Dashboard;
