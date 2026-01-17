export const prepareTask = (taskTitle) => {
  return {
    taskId: Date.now(),
    title: taskTitle,
    done: false,
    goEditMode: false,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  };
};
