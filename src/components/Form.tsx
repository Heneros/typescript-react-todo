import  { useRef } from 'react'
import  {TaskItemProps}      from './TaskItem';
import  useLocalStorage  from '../hooks/useLocalStorage';
import { Box, Button, FormControl, FormGroup, FormHelperText, Input, TextField } from '@mui/material'
import { useAppDispatch } from '';


export const Form = () => {
  const dispatch = useAppDispatch();
  
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [filter, setFilter] = useLocalStorage({ key: "filter", defaultValue: () => 'all' });

  const add = () => {
    if (nameRef.current && descriptionRef.current) {
      if (nameRef.current.value === '' || descriptionRef.current.value === '') {
        alert('Empty fields')
      }
    } else {
      const filterValue = filter()
      const isAllOrCompleted = filterValue === 'all' || filterValue === 'completed';
      const isAllOrProgress = filterValue === 'all' || filterValue === 'progress';

      const newTask: TaskItemProps   = {
        id: Date.now().toString(), 
        name: nameRef.current?.value || '', 
        description: descriptionRef.current?.value || '',
        completed: false,
        all: isAllOrCompleted,
        progress: isAllOrProgress
      }

  

      console.log(newTask)
    }
   }
  
  return (
    <Box sx={{ mt: 15 }} style={{ marginBottom: "45px" }}>
      <FormControl>
        <form>
        <FormControl fullWidth >
                        <TextField type="text" fullWidth style={{ width: '100%' }} inputRef={nameRef} placeholder="Name of task" />
                        <TextField type="text" fullWidth style={{ width: '100%' }} inputRef={descriptionRef} placeholder="Description" />
                        <Button type="submit" fullWidth variant="outlined" >
                            Add Task
                        </Button>
                    </FormControl>
        </form>
      </FormControl>
      </Box>
  )
}
