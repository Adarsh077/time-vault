export const currentSessionSelector = (state) => {
  return state.currentSessionReducer.currentSession;
};

export const lastSessionTaskIdSelector = (state) => {
  return state.currentSessionReducer.lastSessionTaskId;
};
