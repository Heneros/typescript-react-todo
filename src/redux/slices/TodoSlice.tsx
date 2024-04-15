import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskItemProps } from '../../components/TaskItem';
import { updateTask } from '../../utils/taskUtil';


export interface TaskState {
    tasks: TaskItemProps[],
    searchResults?: TaskItemProps[],
    filterText?: string
}

export interface RootState {
    tasks: TaskState;
}


const storedTasks = localStorage.getItem("tasks");
const initialState: TaskState = storedTasks ? JSON.parse(storedTasks) : { tasks: [] };



const reducerTask = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskItemProps>) => {
            const item = action.payload;
            const existItem = state.tasks.find((x) => x.id === item.id);
            if (!existItem) {
                state.tasks  = [...state.tasks, item];
             }
            return updateTask(state);
        },
        searchTask: (state, action) => {
            const { searchText } = action.payload;
            const filteredText = state.tasks.filter(task => {
                return task.name && task.name.toLowerCase().includes(searchText.toLowerCase());
            });
            state.searchResults = filteredText;
            state.filterText = searchText;

        },
        editTask: (state, action) => {
            if (!action.payload.id) {
                console.log('Update could not complete');
                return;
            }
            const updatedTask = action.payload;
            const updatedTasks = state.tasks.map(task => {
                if (task.id === updatedTask.id) {
                    return updatedTask;
                }
                return task;
            });
            state.tasks = updatedTasks;
            return updateTask(state);
        },
        removeTask: (state, action) => {
            const taskId = action.payload;
            let updatedTasks = state.tasks.filter(task => {
                return task.id !== taskId;
            });
            state.tasks = updatedTasks;
            return updateTask(state);
        }
    }
})

export const selectTaskById = (state: TaskState, id: string) => state.tasks.find(task => task.id === id);


export const { addTask, searchTask, editTask, removeTask } = reducerTask.actions;
export const reducer = reducerTask.reducer;

