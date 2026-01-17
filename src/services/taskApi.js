import { apiFetch } from "../api/fetchClient";
export const fetchTaskApi = async () => {
  const res = await apiFetch("/tasks");
  const data = await res.json();
  return data.tasks;
};


export const addTaskApi = async (taskTitle) => {
  const res = await apiFetch("/tasks/addTask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskTitle }),
  });
  const { taskId, title, done, goEditMode, createdAt, updatedAt } =
    await res.json();
  return { taskId, title, done, goEditMode, createdAt, updatedAt };
};
export const deleteTaskApi = async (taskId) => {
  const res = await apiFetch(`/tasks/removeTask`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskId }),
  });
  const updatedTasks = await res.json();
  return updatedTasks;
};

export const updateTaskApi = async (taskId, newTitle) => {
  const res = await apiFetch(`/tasks/updateTask`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskId, newTitle }),
  });
  const { updatedTasks } = await res.json();
  
  return updatedTasks;
};
export const toggleTaskDoneApi = async (taskId, isdone) => {
  const res = await apiFetch(`/tasks/toogleTaskDone`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskId, isdone }),
  });
  const { updatedTasks } = await res.json();

  return updatedTasks;
};
