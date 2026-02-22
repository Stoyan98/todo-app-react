import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addTodo, toggleTodo, deleteTodo } from "../todosSlice";
import type { Todo } from "../types/todo";
import "../../../styles/todo.css";

export const TodosPage = () => {
    const [text, setText] = useState("");

    const todos: Todo[] = useAppSelector(state => state.todos.items);
    const dispatch = useAppDispatch();

    const handleAdd = () => {
        if (!text.trim()) return;
        dispatch(addTodo(text));
        setText("");
    }

    return (
        <div className="todo-container">
            <h1 className="todo-title">Todo App</h1>

            <div className="todo-input-group">
                <input  
                    className="todo-input"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Add new task..."
                />
                <button className="btn btn-add" onClick={handleAdd}>Add</button>
            </div>

            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} className="todo-item">
                        <span
                            onClick={() => dispatch(toggleTodo(todo.id))}
                            className={`todo-text ${
                                todo.completed ? "completed" : ""
                            }`}
                        >
                            {todo.title}
                        </span>

                        <button className="btn-delete" onClick={() => dispatch(deleteTodo(todo.id))}>
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};