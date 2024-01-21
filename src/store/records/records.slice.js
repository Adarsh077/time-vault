import { createSlice } from '@reduxjs/toolkit';

import { RecordSessionType } from '@/enum';
import { getCurrentDateString } from '@/utils';

/**
records[]
  - taskId
  - date
  - sessions[]
      - sessionStartTime
      - sessionEndTime
      - sessionType: ACTIVE | IDLE
 */

const initialState = {
  records: [
    // {
    //   taskId,
    //   date,
    //   sessions: [
    //     { sessionStartTime, sessionEndTime, sessionType }
    //   ]
    // }
  ],

  counterForRerender: 0,
};

export const recordSlice = createSlice({
  name: 'recordSlice',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    setCounterForRerender: (state) => {
      return {
        ...state,
        counterForRerender: state.counterForRerender === 0 ? 1 : 0,
      };
    },
    recordSession: (state, action) => {
      const { taskId, sessionStartTime, sessionEndTime, sessionType } =
        action.payload;

      if (
        !taskId ||
        !sessionStartTime ||
        !sessionEndTime ||
        !sessionType ||
        ![RecordSessionType.ACTIVE, RecordSessionType.IDLE].includes(
          sessionType,
        )
      ) {
        return;
      }

      const date = getCurrentDateString();

      let recordIndex = state.records.findIndex(
        (r) => r.taskId === taskId && r.date === date,
      );

      if (recordIndex === -1) {
        recordIndex = state.records.length;
      }

      let record = state.records[recordIndex];

      if (!record) {
        record = {
          taskId,
          date,
          sessions: [],
        };
      }

      record.sessions.push({
        sessionStartTime,
        sessionEndTime,
        sessionType,
      });

      state.records[recordIndex] = record;

      return state;
    },
  },
});

export const { reset, recordSession, setCounterForRerender } =
  recordSlice.actions;

export default recordSlice.reducer;
