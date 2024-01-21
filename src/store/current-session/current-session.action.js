import { startSession, stopSession } from './current-session.slice';

export const startSessionAction = (data) => async (dispatch) => {
  const { taskId, sessionType } = data;
  dispatch(startSession({ taskId, sessionType }));
};

export const stopSessionAction = () => async (dispatch) => {
  dispatch(stopSession());
};
