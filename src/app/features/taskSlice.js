import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTaskApi,
  addTaskApi,
  deleteTaskApi,
  updateTaskApi,
} from "../../services/taskApi";
import { loginUser, registerNewUser } from "../../services/authApi";

export const getUser = createAsyncThunk(
  "login/getUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await loginUser({ email, password });
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async ({ userName, email, password }, { rejectWithValue }) => {
    try {
      return await registerNewUser({ userName, email, password });
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async () => await fetchTaskApi()
);
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (title) => await addTaskApi(title)
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id) => await deleteTaskApi(id)
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, title }) => {
    return await updateTaskApi(id, title);
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    error: "",
    gotUser: false,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateDoneTask: (state, action) => {
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
      .addCase(getUser.fulfilled, (state, action) => {
        state.tasks = action.payload.user.tasks;
        state.error = null;
        state.stat = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        // state.error = "Invalid credientials";
        state.error = action.payload;
        state.gotUser = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
        state.error = null;
        state.gotUser = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.gotUser = false;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const curTask = state.tasks.find(
          (task) => task.id === action.payload.id
        );
        if (curTask) {
          curTask.title = action.payload.title;
          curTask.editMode = false;
        }
      });
  },
});

export const {
  addTask,
  removeTask,
  updateDoneTask,
  toggleEditMode,
  replaceTask,
} = taskSlice.actions;

export default taskSlice.reducer;
