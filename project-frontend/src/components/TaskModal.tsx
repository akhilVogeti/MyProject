import React , {useEffect, useState }from 'react';
import { Modal, Input, Button, Typography } from '@mui/joy';
import { Task } from '../service/task.service';
import { cssStyles, muiStyles } from './styles/styles';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: Task) => void;
    task: Task | null;
  }

export const TaskModal: React.FC <TaskModalProps> = ({isOpen, onClose, onSave, task}) => {
  const [title, setTitle] = useState<string>(task?.title || '');
  const [description, setDescription] = useState<string>(task?.description || '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [task]);

  const handleSave = () => {
    onSave({ ...task, title, description } as Task);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}  sx={muiStyles.modalBox}>
      <div style={cssStyles.modalHeader} >
        <Typography level="h3">{task ? 'Edit Task' : 'Add a new Task'}</Typography>
        <Input
          sx={{marginY:'14px'}}
          placeholder="Title"
          defaultValue={task?.title || ''}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <Input
          placeholder="Description"
          defaultValue={task?.description || ''}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <div style={cssStyles.modalFooter}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Modal>
  );
}