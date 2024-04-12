import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskItemProps } from '../../components/TaskItem';
import { updateTask } from '../../utils/taskUtil';


export interface TaskState {
    tasks: TaskItemProps[]
}



const storedTasks = localStorage.getItem("tasks");
const initialState: TaskState = storedTasks ? JSON.parse(storedTasks) : { tasks: [] };



const reducerTask = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskItemProps>) => {
            state.tasks.push(action.payload);
            return updateTask(state);
          },
    }
})


export const { addTask } = reducerTask.actions;
export const reducer = reducerTask.reducer;

