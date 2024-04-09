import { TaskState } from '../redux/slices/TodoSlice';


export const updateTask = (state: TaskState): TaskState => {
    localStorage.setItem('tasks', JSON.stringify(state));
    return state; 
}