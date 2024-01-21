export const tasksSelector = (state) => state.taskReducer.tasks;

export const taskByIdSelector = (id) => (state) => {
  if (!id) return null;
  return state.taskReducer.tasks.find((task) => task.id === id);
};
