import { api } from "../../../services/api";

export interface Todo {
    id: string;
    title: string;
    completed: boolean;   
}

export const todosApi = api.injectEndpoints({
  endpoints: builder => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todos"],
    }),

    addTodo: builder.mutation<Todo, string>({
      query: title => ({
        url: "/todos",
        method: "POST",
        body: { title, completed: false },
      }),
      invalidatesTags: ["Todos"],
    }),

    toggleTodo: builder.mutation<void, string>({
      query: id => ({
        url: `/todos/${id}/toggle`,
        method: "PUT",
      }),
      invalidatesTags: ["Todos"],
    }),

    deleteTodo: builder.mutation<void, string>({
      query: id => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useDeleteTodoMutation,
} = todosApi;