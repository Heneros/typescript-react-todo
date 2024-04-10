import { configureStore } from "@reduxjs/toolkit";
import { reducer as reducerTask } from './slices/TodoSlice';


const store = configureStore({
    reducer: {
     reducer: reducerTask
    }
})
 
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;