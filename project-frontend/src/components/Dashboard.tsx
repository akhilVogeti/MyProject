import React, { useState, useEffect } from 'react';
import { Button,Card,Checkbox,Modal,Input,Typography,Divider} from '@mui/joy';
import Add from '@mui/icons-material/Add';
import { Task, getTasks, createTask, deleteTask, updateTask } from '../api';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from "react-icons/fa";
import { TaskModal } from './TaskModal';
import {  cssStyles, muiStyles } from './styles/styles';


const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  document.title='Dashboard';

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) navigate('/login');
      try {
        
        const response = await getTasks(token);
        
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleCheckboxChange = async (taskId: string) => {
    const taskToUpdate = tasks.find(task => task._id === taskId);
    if (taskToUpdate && token) {
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      try {
        await updateTask(taskId, updatedTask, token);
        setTasks(tasks.map(task => (task._id === taskId ? updatedTask : task)));
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

  const handleSaveTask = async () => {
    if (newTask && token) {
      try {
       
        if (newTask._id) {
          await updateTask(newTask._id, newTask, token);
          setTasks(tasks.map(task => (task._id === newTask._id ? newTask : task)));
        } else {
          newTask.completed = false;
          const response = await createTask(newTask, token);
          setTasks([...tasks, response.data]);
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
        await deleteTask(taskId, token);
        setTasks(tasks.filter(task => task._id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/'); // Redirect to home
  };

  return (
    <div >
      <div style={cssStyles.header}>
        <Typography level="h3">Hi, {`${username}`}</Typography>
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
