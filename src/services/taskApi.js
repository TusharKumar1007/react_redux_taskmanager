export const fetchTaskApi = async () => {
  const res = await fetch("/db/tasks");
  const data = await res.json();
  return data.tasks;
};

export function prepareUserTask(userTaskInput) {
  return { id: Date.now(), title: userTaskInput, done: false, editMode: false };
}

export const addTaskApi = async (title) => {
  const res = await fetch("/db/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};
export const deleteTaskApi = async (id) => {
  const res = await fetch(`/db/tasks/${id}`, {
    method: "DELETE",
  });
  return { id };
};

export const updateTaskApi = async (id, title) => {
  const res = await fetch(`/db/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return { id, title };
};
