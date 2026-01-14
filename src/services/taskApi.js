export const fetchTaskApi = async () => {
  const res = await fetch("/tasks");
  const data = await res.json();
  return data.tasks;
};

export function prepareUserTask(userTaskInput) {
  return { id: Date.now(), title: userTaskInput, done: false, editMode: false };
}

export const addTaskApi = async (title) => {
  const res = await fetch("/tasks/addTask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};
export const deleteTaskApi = async (id) => {
  const res = await fetch(`/tasks/removeTask`, {
    method: "DELETE",
  });
  return { id };
};

export const updateTaskApi = async (taskId, newTitle) => {
  const res = await fetch(`/tasks/updateTask`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newTitle }),
  });
  return { taskId, newTitle };
};
