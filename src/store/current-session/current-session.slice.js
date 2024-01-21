import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

import { RecordSessionType } from '@/enum';

const initialState = {
  currentSession: null /* {
    sessionStartTime,
    sessionType,
    taskId,
  }, */,
  lastSessionTaskId: null,
};

export const currentSessionSlice = createSlice({
  name: 'currentSessionSlice',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    startSession: (state, action) => {
      const { taskId, sessionType } = action.payload;

      if (
        !taskId ||
        !sessionType ||
        ![RecordSessionType.ACTIVE, RecordSessionType.IDLE].includes(
          sessionType,
        )
      ) {
        return;
      }

      const sessionStartTime = DateTime.now().toString();

      const currentSession = {
        sessionStartTime,
        sessionType,
        taskId,
      };

      return {
        ...state,
        currentSession,
      };
    },
    stopSession: (state) => {
      const lastSessionTaskId = state.currentSession.taskId;

      return {
        ...initialState,
        lastSessionTaskId,
      };
    },
  },
});

export const { reset, startSession, stopSession } = currentSessionSlice.actions;

export default currentSessionSlice.reducer;
