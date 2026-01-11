import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTaskApi, addTaskApi } from "../../services/taskApi";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async () => await fetchTaskApi()
);
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (title) => await addTaskApi(title)
);

const taskSlice = createSlice({
  name: "tasks",
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
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      });
  },
});

export const { addTask, removeTask, updateTask, toggleEditMode, replaceTask } =
  taskSlice.actions;

export default taskSlice.reducer;
