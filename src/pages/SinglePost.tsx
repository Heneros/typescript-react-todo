import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectTaskById, TaskState, editTask } from '../redux/slices/TodoSlice';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Input, InputLabel, TextField, TextareaAutosize, Typography } from '@mui/material'
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

    const handleEditClick = () => {
        setEditFunc(!isEdit)
    }


    // const onNameChanged = e => setName(e.target.value)
    // const onDescriptionChanged = e => setDescription(e.target.value)
    // const onSaveTaskClicked = (e) => {
    //   e.preventDefault();

    //   try {
    //     dispatch(editTask({ id: task.id, name, description, completed }));
    //   } catch (error) {
    //     console.log('Error EditTask'.error)
    //   }
    // }
    return (
      <Box sx={{ mt: 15 }}>
        Details:
            <>
                <button onClick={handleEditClick}>Edit task</button>
                {isEdit ? (
                         <div >
                         <h2>{name}</h2>
                   <p>{description}</p>
                         Is completed? <b>{completed ? "Yes" : "No"}</b>
                         </div> 
                ) : (<>
                              <Typography variant="h5">Edit Task</Typography>
                              {/* <form sx={{ pt: 5 }} className='form-edit' >
          <FormGroup>
            <FormControl sx={{ pt: 5 }}>
              <TextField
                value={id}
                label="ID"
                disabled
                followCursor
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
                  onChange={(e) => setСompleted(e.target.checked)}
                />
              }
            />
            <Button type="submit" size="large" variant="contained" onClick={onSaveTaskClicked}>Update Task</Button>
          </FormGroup>
        </form> */}
            </>)}
        </>
      </Box>
    )
  }