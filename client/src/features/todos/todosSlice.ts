import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Todo } from "./types/todo.ts";

interface TodosState {
    items: Todo[];
}

const initialState: TodosState = {
    items: [],
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.items.push({
                id: crypto.randomUUID(),
                title: action.payload,
                completed: false,
            });
        }, 

        toggleTodo(state, action: PayloadAction<string>) {
            const todo = state.items.find((t: { id: string; }) => t.id === action.payload);
            if (todo){
                todo.completed = !todo.completed;
            }
        }, 

        deleteTodo(state, action: PayloadAction<string>){
            state.items = state.items.filter((t: { id: string; }) => t.id !== action.payload);
        },
    },
});

export const {addTodo, toggleTodo, deleteTodo} = todosSlice.actions;

export default todosSlice.reducer;