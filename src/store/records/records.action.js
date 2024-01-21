import { recordSession } from './records.slice';

export const recordSessionAction = (data) => async (dispatch) => {
  const { taskId, sessionStartTime, sessionEndTime, sessionType } = data;

  dispatch(
    recordSession({ taskId, sessionStartTime, sessionEndTime, sessionType }),
  );
};
