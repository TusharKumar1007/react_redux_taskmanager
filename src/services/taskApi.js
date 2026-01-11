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
    body: JSON.stringify(prepareUserTask(title)),
  });
  return res.json();
};
