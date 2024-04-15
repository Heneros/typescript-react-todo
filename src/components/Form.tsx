import  { useRef } from 'react'
import  {TaskItemProps}      from './TaskItem';
import  useLocalStorage  from '../hooks/useLocalStorage';
import { Box, Button, FormControl, FormGroup, FormHelperText, Input, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks';
import { addTask, TaskState } from '../redux/slices/TodoSlice';
import { useDispatch } from 'react-redux';


export const Form = () => {
  const dispatch = useDispatch();

    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    // const [filter, setFilter] = useLocalStorage('all');

  const add = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameRef.current || !descriptionRef.current || nameRef.current.value === '' || descriptionRef.current.value === '') {
      alert('Empty fields');
      return;
  } else {
      const newTask: TaskItemProps = {
          id: Date.now().toString(),
          name: nameRef.current.value,
          description: descriptionRef.current.value,
          completed: false,
          all: true,
          progress: true
      }
      dispatch(addTask(newTask));
      console.log(newTask);

      nameRef.current.value="";
      descriptionRef.current.value="";
  }
   }
  
//    function handleSubmit(e) {
//     e.preventDefault();
//     add();
// }

  
  return (
    <Box sx={{ mt: 15 }} style={{ marginBottom: "45px" }}>
      <FormControl>
        <form onSubmit={add}>
        <FormControl fullWidth >
                        <TextField type="text" fullWidth style={{ width: '100%' }}inputRef={nameRef} placeholder="Name of task" />
                        <TextField type="text" fullWidth style={{ width: '100%' }}  inputRef={descriptionRef} placeholder="Description" />
                        <Button type="submit" fullWidth variant="outlined" >
                            Add Task
                        </Button>
                    </FormControl>
        </form>
      </FormControl>
      </Box>
  )
}
