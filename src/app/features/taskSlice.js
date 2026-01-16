import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTaskApi,
  addTaskApi,
  deleteTaskApi,
  updateTaskApi,
  toggleTaskDoneApi,
} from "../../services/taskApi";
import {
  loginUser,
  registerNewUser,
  getCurrentUserApi,
  LogOutApi,
  deleteAccount,
} from "../../services/authApi";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      return await getCurrentUserApi();
    } catch {
      return rejectWithValue(null);
    }
  }
);

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

export const toggleTaskDone = createAsyncThunk(
  "tasks/toggleTaskDone",
  async ({ id, isDone }) => await toggleTaskDoneApi(id, isDone)
);

export const logOut = createAsyncThunk(
  "logout/logOut",
  async () => await LogOutApi()
);

export const deleteUser = createAsyncThunk(
  "delete/deleteUser",
  async () => await deleteAccount()
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    userName: "",
    error: "",
    gotUser: false,
    inAccountSettings: false,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.taskId !== action.payload.taskedIdRemoved
      );
    },
    updateDoneTask: (state, action) => {
      let curTask = state.tasks.find(
        (task) => task.taskId === action.payload.id
      );
      if (curTask) {
        curTask.done = action.payload.isDone;
      }
    },
    toggleEditMode: (state, action) => {
      const curTask = state.tasks.find(
        (task) => task.taskId === action.payload.id
      );
      if (curTask) {
        curTask.editMode = action.payload.goEditMode;
      }
    },
    replaceTask: (state, action) => {
      const curTask = state.tasks.find(
        (task) => task.taskId === action.payload.id
      );
      if (curTask) {
        curTask.title = action.payload.title;
        curTask.editMode = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.gotUser = true;
        state.tasks = action.payload.tasks;
        state.userName = action.payload.userName;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.gotUser = false;
        state.tasks = [];
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.tasks = action.payload.user.tasks;
        state.userName = action.payload.user.userName;
        state.error = null;
        state.gotUser = true;
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
        state.userName = action.payload.userName;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.gotUser = false;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const { taskId, title, done, goEditMode, createdAt, updatedAt } =
          action.payload;

        state.tasks.push({
          taskId,
          title,
          done,
          goEditMode,
          createdAt,
          updatedAt,
        });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = action.payload.updatedTasks;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(toggleTaskDone.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.gotUser = false;
        state.tasks = [];
        state.userName = "";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.gotUser = false;
        state.tasks = [];
        state.userName = "";
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
