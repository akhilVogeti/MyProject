import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Modal,
  Input,
  Typography,
  Divider
} from '@mui/joy';
import Add from '@mui/icons-material/Add';
import { Task, getTasks, createTask, deleteTask, updateTask } from '../api';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from "react-icons/fa";


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
        console.log('in useEffect of dashboard');
        const response = await getTasks(token);
        console.log(`response.data in useeffect fetch tasks is ${response.data}`)
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [token, navigate]);

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
        console.log(`newTask is ${JSON.stringify(newTask)}`);
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1px' }}>
        <Typography level="h3">Hi, {`${username}`}</Typography>
        <Typography level="h1">Welcome to Task Manager</Typography>
        <Button color="danger" onClick={handleLogout}>Logout</Button>
      </div>
      <Divider></Divider>
      <div style={{paddingTop:'10px'}} >
      <Button  startDecorator={<Add />} onClick={() => openModal(null)}>Add Task</Button>
      {/* <Typography level="h2">Your Tasks</Typography> */}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}> 
        {tasks && tasks.map((task) => (
          <Card key={task._id} variant="outlined" sx={{ height: '200px' ,width: '350px', padding:'2', display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 3,
            transition: '0.3s',
            '&:hover': {
              boxShadow: 6, 
              }
            }}>
            
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor:'#dcdcdc' }}>
              <Button variant="plain" color="danger" onClick={() => removeTask(task._id)}> <FaTrash /> </Button>
              <Typography level="h3">{task.title}</Typography>
              <Button variant="plain" color="primary" onClick={() => openModal(task)}> <FaEdit /> </Button>
            </div> 

            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'   }}>
              <Typography level="h4" style={{ maxHeight: '100px', overflow: 'auto', textAlign: 'center', padding:'2px' }}>
                {task.description}
              </Typography>
            </div>

           <div style={{padding:'10px'}}>
              <Divider></Divider>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Checkbox
                  
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(task._id)}
                />
                {task.completed? <Typography level="h4" color='success' >{`completed`}</Typography> : 
                                   <Typography level="h4" color='danger' >{`pending`}</Typography> }
              </div>
            </div>
            
          </Card>
        ))}
      </div>

      <Modal open={modalOpen} onClose={closeModal}  sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ padding: '16px',  border: '2px solid black',borderRadius: '8px',backgroundColor: 'white', width: '300px' }} >
          <Typography level="h3">{newTask ? 'Edit Task' : 'Add a new Task'}</Typography>
          <Input
            sx={{marginY:'14px'}}
            placeholder="Title"
            defaultValue={newTask?.title || ''}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value } as Task)}
            fullWidth
          />
          <Input
            placeholder="Description"
            defaultValue={newTask?.description || ''}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value } as Task)}
            fullWidth
          />
          <div style={{ marginTop: '16px',display: 'flex', alignItems: 'center', justifyContent: 'space-between',padding:'4px' }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button onClick={handleSaveTask}>Save</Button>
          </div>
        </div>
      </Modal>
      
    </div>
  );
};

export default Dashboard;
