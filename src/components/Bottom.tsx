import  { useState } from 'react'
import { useAppSelector } from '../hooks'
import TaskItem, { TaskItemProps } from './TaskItem';
import { Button, TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';


export const Bottom = () => {
  // const tasks:TaskItemProps = useAppSelector(state => state.tasks);
  const tasks: TaskItemProps[] = useAppSelector((state) => state.tasks.tasks);

  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('all');


  const filteredTasks = (tasks || []).filter((task) => {
    if (filter === 'all') {
      return true;
  } else if (filter === 'completed') {
      return task.completed;
  } else if (filter === 'progress') {
      return !task.completed;
  }
  }).filter((task) => {
    const nameMatch = task.name && task.name.toLowerCase().includes(searchText.toLowerCase());
    const descriptionMatch = task.description && task.description.toLowerCase().includes(searchText.toLowerCase());
    return nameMatch || descriptionMatch;
  })

  
    console.log(tasks);
    return (
      <>
            <TextField
                    type="search"
                    variant="filled"
                    label="Search Field"
                    fullWidth
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
        />
           <div className="buttons">
                    <Button sx={{ m: 1 }} variant="contained" onClick={() => setFilter('all')}>All</Button>
                    <Button sx={{ m: 1 }}
                        variant="contained"
                        startIcon={<DoneIcon />}
                        onClick={() => setFilter('completed')}
                        color="success"
                    >Completed</Button>
                    <Button
                        sx={{ m: 1 }}
                        variant="contained"
                        color="secondary"
                        onClick={() => setFilter('progress')}
                        startIcon={<HourglassBottomIcon />}
                    >Progress</Button>
                </div>
        {tasks && tasks.length ? ( filteredTasks.map((task: TaskItemProps) => (
          <TaskItem
            id={task.id}
            name={task.name}
            description={task.description}
            completed={task.completed}
            progress={task.progress}
            all={task.all}
          />
        )) 
      ): (<>No tasks added.</>)}
        </>
  )
}
