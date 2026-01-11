import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      let curTask = state.tasks.find((task) => task.id === action.payload.id);
      if (curTask) {
        curTask.done = action.payload.isDone;
      }
    },
    toggleEditMode: (state, action) => {
      const curTask = state.tasks.find((task) => task.id === action.payload.id);
      if (curTask) {
        curTask.editMode = action.payload.goEditMode;
      }
    },
    replaceTask: (state, action) => {
      const curTask = state.tasks.find((task) => task.id === action.payload.id);
      if (curTask) {
        curTask.title = action.payload.title;
        curTask.editMode = false;
      }
    },
  },
});

export const { addTask, removeTask, updateTask, toggleEditMode, replaceTask } =
  taskSlice.actions;

export default taskSlice.reducer;
