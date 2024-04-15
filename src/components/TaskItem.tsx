
import React  from 'react'

import { Box, Button, Card,  IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { useAppDispatch } from '../hooks';
import { removeTask } from '../redux/slices/TodoSlice';

 export interface TaskItemProps {
    id: string,
    name: string,
    description: string,
    completed: boolean,
    all: boolean;
    progress: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, name, description, completed, all, progress }: TaskItemProps) => {

    const dispatch = useAppDispatch();

    const removeById = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
       e.preventDefault();
        dispatch(removeTask(id))
    }

  return (
    <Card sx={{ p: 2, m: 2, border: '1px solid grey' }} color="success" variant="outlined" className="item-task" >
    <IconButton
        sx={{ display: 'flex', justifyContent: 'right' }}
        color="error"
        onClick={removeById}
    >
        <CloseIcon fontSize="inherit" />
    </IconButton>
    <div className="text" style={{ margin: '5' }}>
        <h2>
            {name && name.length > 15 ? name.substring(0, 15) + '...' : name}
        </h2>
        <p>
            {description && description.length > 25 ? description.substring(0, 25) + `...` : description}
        </p>
    </div>
    <Box component="div" className="item-btns" sx={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: {
            md: "row"
        }
    }}>
        <Link to={`/edit/${id}`} >
            <Button variant="contained" startIcon={<EditIcon />} >
                Edit
            </Button>
        </Link>
        <Link to={`/tasks/${id}`}>
            <Button variant="contained"
                startIcon={<InfoIcon />}
            >
                Details
            </Button>
        </Link>
    </Box>
</Card >
  )
}

export default TaskItem;
