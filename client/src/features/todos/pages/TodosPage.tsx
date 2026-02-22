import { useState } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useDeleteTodoMutation,
} from "../api/todosApi";
import "../../../styles/todo.css";

export const TodosPage = () => {
    const [text, setText] = useState("");

    const { data: todos = [], isLoading } = useGetTodosQuery();

    const [addTodo] = useAddTodoMutation();
    const [toggleTodo] = useToggleTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleAdd = async () => {
        if (!text.trim()) return;
        try {
            await addTodo(text).unwrap();
            setText("");
        } catch {
            alert("Failed to add todo");
        }
    }

    const handleToggle = async (id: string) => {
        try {
            await toggleTodo(id);
        } catch {
            alert("Failed toggle todo");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTodo(id);
        } catch {
            alert("Failed delete todo");
        }
    };

    if (isLoading) return <p>Loading...</p>;    

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
                            onClick={() => handleToggle(todo.id)}
                            className={`todo-text ${
                                todo.completed ? "completed" : ""
                            }`}
                        >
                            {todo.title}
                        </span>

                        <button className="btn-delete" onClick={async () => handleDelete(todo.id)}>
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};