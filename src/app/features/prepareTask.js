export const prepareTask = (newTaskId, taskTitle) => {
  return {
    id: newTaskId,
    task: taskTitle,
    completed: false,
    ineditmode: false,
    createdat: new Date().toISOString(),
    updatedat: new Date().toISOString(),
  };
};
