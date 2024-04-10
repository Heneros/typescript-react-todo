import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskItemProps } from '../../components/TaskItem';
import { updateTask } from '../../utils/taskUtil';


export interface TaskState {
    tasks: TaskItemProps[]
}

const initialState: TaskState = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")!) : { tasks: [] };


const reducerTask = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskItemProps>) => {
            const item = action.payload;
            if (!state.tasks) {
                state.tasks = [];
            }
            const existItem = state.tasks.find((x) => x.id === item.id)

            if (!existItem) {
                state.tasks = [...state.tasks, item]
            }
            return updateTask(state);
        }
    }
})


export const { addTask } = reducerTask.actions;
export const reducer = reducerTask.reducer;

