export const prepareTask = (newTaskId,taskTitle) => {
  return {
    taskId: newTaskId,
    title: taskTitle,
    done: false,
    goEditMode: false,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  };
};
