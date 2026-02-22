import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import todosReducer from "../features/todos/todosSlice"

export const store = configureStore({
    reducer: {
        todos: todosReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware(),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;