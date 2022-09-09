import { createSlice } from "@reduxjs/toolkit";
let todos = JSON.parse(localStorage.getItem("todoList")) || [];
if (todos.length <= 0) {
  todos = [
    { id: 1, name: "Learn Yoga", completed: false, priority: "Medium" },
    { id: 2, name: "Learn Redux", completed: true, priority: "High" },
    {
      id: 3,
      name: "Learn JavaScript",
      completed: false,
      priority: "Low",
    },
  ];
}
export default createSlice({
  name: "todoList",
  initialState: todos,
  // [
  //   { id: 1, name: "Learn Yoga", completed: false, priority: "Medium" },
  //   { id: 2, name: "Learn Redux", completed: true, priority: "High" },
  //   {
  //     id: 3,
  //     name: "Learn JavaScript",
  //     completed: false,
  //     priority: "Low",
  //   },
  // ],

  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
      localStorage && localStorage.setItem("todoList", JSON.stringify(state));
    },
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find((todo) => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
        localStorage && localStorage.setItem("todoList", JSON.stringify(state));
      }
    },
  },
});
