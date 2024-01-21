import { DateTime, Duration } from 'luxon';

import { RecordSessionType } from '@/enum';
import { getCurrentDateString } from '@/utils';

export const recordsSelector = (state) => {
  return state.recordReducer.records;
};

export const todaysActiveTimeSelector = (state) => {
  const records = state.recordReducer.records;
  const currentSession = state.currentSessionReducer.currentSession;

  const date = getCurrentDateString();

  const todaysRecords = records.filter((record) => record.date === date);

  let activeMinutes = 0;

  todaysRecords.forEach((record) => {
    record.sessions
      .filter((session) => session.sessionType === RecordSessionType.ACTIVE)
      .forEach((session) => {
        const sessionStartTime = DateTime.fromJSDate(
          new Date(session.sessionStartTime),
        );
        const sessionEndTime = DateTime.fromJSDate(
          new Date(session.sessionEndTime),
        );
        const { minutes } = sessionEndTime
          .diff(sessionStartTime, 'minutes')
          .toObject();

        activeMinutes += minutes;
      });
  });

  if (
    currentSession &&
    currentSession.sessionType === RecordSessionType.ACTIVE
  ) {
    const sessionStartTime = DateTime.fromJSDate(
      new Date(currentSession.sessionStartTime),
    );
    const { minutes } = DateTime.now()
      .diff(sessionStartTime, 'minutes')
      .toObject();

    activeMinutes += minutes;
  }

  return Math.floor(activeMinutes);
};

export const todaysIdleTimeSelector = (state) => {
  const records = state.recordReducer.records;
  console.log(state.recordReducer.counterForRerender);
  const currentSession = state.currentSessionReducer.currentSession;

  const date = getCurrentDateString();

  const todaysRecords = records.filter((record) => record.date === date);

  let activeMinutes = 0;

  todaysRecords.forEach((record) => {
    record.sessions
      .filter((session) => session.sessionType === RecordSessionType.IDLE)
      .forEach((session) => {
        const sessionStartTime = DateTime.fromJSDate(
          new Date(session.sessionStartTime),
        );
        const sessionEndTime = DateTime.fromJSDate(
          new Date(session.sessionEndTime),
        );
        const { minutes } = sessionEndTime
          .diff(sessionStartTime, 'minutes')
          .toObject();

        activeMinutes += minutes;
      });
  });

  if (currentSession && currentSession.sessionType === RecordSessionType.IDLE) {
    const sessionStartTime = DateTime.fromJSDate(
      new Date(currentSession.sessionStartTime),
    );
    const { minutes } = DateTime.now()
      .diff(sessionStartTime, 'minutes')
      .toObject();
    console.log({ idelMinutes: minutes });
    activeMinutes += minutes;
  }

  return Math.floor(activeMinutes);
};

export const weekActiveTimeSelector = (state) => {
  const records = state.recordReducer.records;
  const currentSession = state.currentSessionReducer.currentSession;

  const weekStart = DateTime.now().minus({ week: 1 });

  const weekRecords = records.filter((record) => {
    const recordDate = DateTime.fromFormat(record.date, 'dd/MM/yyyy');

    return recordDate >= weekStart;
  });

  let activeMinutes = 0;

  weekRecords.forEach((record) => {
    record.sessions
      .filter((session) => session.sessionType === RecordSessionType.ACTIVE)
      .forEach((session) => {
        const sessionStartTime = DateTime.fromJSDate(
          new Date(session.sessionStartTime),
        );
        const sessionEndTime = DateTime.fromJSDate(
          new Date(session.sessionEndTime),
        );
        const { minutes } = sessionEndTime
          .diff(sessionStartTime, 'minutes')
          .toObject();

        activeMinutes += minutes;
      });
  });

  if (
    currentSession &&
    currentSession.sessionType === RecordSessionType.ACTIVE
  ) {
    const sessionStartTime = DateTime.fromJSDate(
      new Date(currentSession.sessionStartTime),
    );
    const { minutes } = DateTime.now()
      .diff(sessionStartTime, 'minutes')
      .toObject();

    activeMinutes += minutes;
  }

  return Math.floor(activeMinutes);
};

export const weekIdleTimeSelector = (state) => {
  const records = state.recordReducer.records;
  const currentSession = state.currentSessionReducer.currentSession;

  const weekStart = DateTime.now().minus({ week: 1 });
  Duration.fromDurationLike({ minutes: 1230 }).toObject();
  const weekRecords = records.filter((record) => {
    const recordDate = DateTime.fromFormat(record.date, 'dd/MM/yyyy');

    return recordDate >= weekStart;
  });

  let activeMinutes = 0;

  weekRecords.forEach((record) => {
    record.sessions
      .filter((session) => session.sessionType === RecordSessionType.IDLE)
      .forEach((session) => {
        const sessionStartTime = DateTime.fromJSDate(
          new Date(session.sessionStartTime),
        );
        const sessionEndTime = DateTime.fromJSDate(
          new Date(session.sessionEndTime),
        );
        const { minutes } = sessionEndTime
          .diff(sessionStartTime, 'minutes')
          .toObject();

        activeMinutes += minutes;
      });
  });

  if (currentSession && currentSession.sessionType === RecordSessionType.IDLE) {
    const sessionStartTime = DateTime.fromJSDate(
      new Date(currentSession.sessionStartTime),
    );
    const { minutes } = DateTime.now()
      .diff(sessionStartTime, 'minutes')
      .toObject();

    activeMinutes += minutes;
  }

  return Math.floor(activeMinutes);
};
