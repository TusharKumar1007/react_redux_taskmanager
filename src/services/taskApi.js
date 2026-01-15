export const fetchTaskApi = async () => {
  const res = await fetch("/tasks");
  const data = await res.json();
  return data.tasks;
};

export function prepareUserTask(userTaskInput) {
  return { id: Date.now(), title: userTaskInput, done: false, editMode: false };
}

export const addTaskApi = async (taskTitle) => {
  const res = await fetch("/tasks/addTask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskTitle }),
  });
  const { taskId, title, done, goEditMode, createdAt, updatedAt } =
    await res.json();
  return { taskId, title, done, goEditMode, createdAt, updatedAt };
};
export const deleteTaskApi = async (taskId) => {
  const res = await fetch(`/tasks/removeTask`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskId }),
  });
  const updatedTasks = await res.json();
  return updatedTasks;
};

export const updateTaskApi = async (taskId, newTitle) => {
  const res = await fetch(`/tasks/updateTask`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskId, newTitle }),
  });
  const { updatedTasks } = await res.json();
  
  return updatedTasks;
};
export const toggleTaskDoneApi = async (taskId, isdone) => {
  const res = await fetch(`/tasks/toogleTaskDone`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskId, isdone }),
  });
  const { updatedTasks } = await res.json();

  return updatedTasks;
};
