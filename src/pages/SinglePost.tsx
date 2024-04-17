import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectTaskById, TaskState, editTask } from '../redux/slices/TodoSlice';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Input, InputLabel, TextField, TextareaAutosize, Typography } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { RootState } from '../redux/store';


export const SinglePost = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const task = useAppSelector((state: RootState) => selectTaskById(state.tasks, String(id)));

    // console.log(task)

    const [name, setName] = useState(task?.name || "");
    const [description, setDescription] = useState(task?.description || "");
    const [completed, setCompleted] = useState(task?.completed || false);
  const [isEdit, setEditFunc] = useState(true);
  
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    
    const handleEditClick = () => {
        setEditFunc(!isEdit)
    }


    const onNameChanged =  (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    const onDescriptionChanged = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)
  
     const onSaveTaskClicked = (e: React.FormEvent<HTMLFormElement>) => {
    // const onSaveTaskClicked = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      try {
        dispatch(editTask({ id: task?.id, name, description, completed }));
        setSnackbarMessage("Task  updated");
        setSnackbarOpen(true);
      } catch (error) {
        console.log('Error EditTask', error)
      }
    }
    return (
      <Box sx={{ mt: 15 }}>
        Details:
            <>
          <Button onClick={handleEditClick}
                             variant="contained"
                             color="secondary"
          >Edit task</Button>
                {isEdit ? (
                         <div >
                         <h2>{name}</h2>
                   <p>{description}</p>
                         Is completed? <b>{completed ? "Yes" : "No"}</b>
                         </div> 
                ) : (<>
              <Typography variant="h5">Edit Task</Typography>
              <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
            severity="success"
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
                             <form className='form-edit' onSubmit={onSaveTaskClicked}>
          <FormGroup>
            <FormControl sx={{ pt: 5 }}>
              <TextField
                value={id}
                label="ID"
                disabled
      
              />
            </FormControl>
            <FormControl sx={{ pt: 2 }}>
              <TextField
                label="Name Task"
                value={name}
                onChange={onNameChanged}
                required
              />
            </FormControl>
            <FormControl sx={{ pt: 2 }}>
              <TextField
                label="Description Task"
                type="text"
                required
                value={description}
                onChange={onDescriptionChanged}
                multiline
                minRows={2}
                maxRows={5}
              />
            </FormControl>
                <FormControlLabel
                label="Is done?"
                control={
                  <Checkbox
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                  />
                }
                  />
                    <Button type="submit" size="large" variant="contained">Update Task</Button>
            {/* <Button type="submit" size="large" variant="contained" onClick={onSaveTaskClicked}>Update Task</Button> */}
          </FormGroup>
        </form>
            </>)}
        </>
      </Box>
    )
  }