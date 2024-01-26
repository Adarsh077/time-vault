import { useEffect } from 'react';

import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';

import StartAndStopButton from './components/StartAndStopButton';
import TaskList from './components/TaskList';
import TimeStatus from './components/TimeStatus';
import { RecordSessionType } from './enum';
import {
  startSessionAction,
  stopSessionAction,
} from './store/current-session/current-session.action';
import { currentSessionSelector } from './store/current-session/current-session.selector';
import { recordSessionAction } from './store/records/records.action';

function App() {
  const dispatch = useDispatch();
  const currentSession = useSelector(currentSessionSelector);

  const restartCurrentSessionWithNewSessionType = (sessionType) => {
    if (currentSession.sessionType === sessionType) return;

    dispatch(
      recordSessionAction({
        taskId: currentSession.taskId,
        sessionStartTime: currentSession.sessionStartTime,
        sessionEndTime: DateTime.now().toString(),
        sessionType: currentSession.sessionType,
      }),
    );

    dispatch(stopSessionAction());

    dispatch(
      startSessionAction({
        taskId: currentSession.taskId,
        sessionType: sessionType,
      }),
    );
  };

  useEffect(() => {
    if (!window.electron) return;

    window.electron.receive('systemIdleStateChange', ({ isIdle }) => {
      if (!currentSession) return;
      restartCurrentSessionWithNewSessionType(
        isIdle ? RecordSessionType.IDLE : RecordSessionType.ACTIVE,
      );
    });

    window.electron.receive('onClose', () => {
      console.log(currentSession);
      if (!currentSession) {
        window.electron.send('closed');
        return;
      }
      dispatch(
        recordSessionAction({
          taskId: currentSession.taskId,
          sessionStartTime: currentSession.sessionStartTime,
          sessionEndTime: DateTime.now().toString(),
          sessionType: currentSession.sessionType,
        }),
      );
      dispatch(stopSessionAction());
      setTimeout(() => window.electron.send('closed'), 500);
    });

    return () => {
      window.electron.removeAllListeners('systemIdleStateChange');
      window.electron.removeAllListeners('onClose');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSession?.sessionType]);

  return (
    <div>
      <div className='border-b-[1px] border-y-gray-300 py-2 px-2'>
        <TimeStatus />
      </div>
      <div className='p-2 border-b-[1px] border-b-gray-300'>
        <StartAndStopButton />
      </div>
      <TaskList />
    </div>
  );
}

export default App;
