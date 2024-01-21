import { useEffect } from 'react';

import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';

import { RecordSessionType } from '@/enum';
import {
  startSessionAction,
  stopSessionAction,
} from '@/store/current-session/current-session.action';
import {
  currentSessionSelector,
  lastSessionTaskIdSelector,
} from '@/store/current-session/current-session.selector';
import { recordSessionAction } from '@/store/records/records.action';
import { setCounterForRerender } from '@/store/records/records.slice';
import { taskByIdSelector, tasksSelector } from '@/store/task/task.selector';

import { Button } from './ui/button';

const StartAndStopButton = () => {
  const dispatch = useDispatch();
  const currentSession = useSelector(currentSessionSelector);
  const lastSessionTaskId = useSelector(lastSessionTaskIdSelector);

  const currentSessionTask = useSelector(
    taskByIdSelector(currentSession?.taskId),
  );
  const lastSessionTask = useSelector(taskByIdSelector(lastSessionTaskId));

  const tasks = useSelector(tasksSelector);

  const startButtonTask = lastSessionTask ? lastSessionTask : tasks[0];

  const handleStartButtonClick = (taskId) => {
    dispatch(
      startSessionAction({ taskId, sessionType: RecordSessionType.ACTIVE }),
    );
  };

  const handleStopButtonClick = () => {
    dispatch(
      recordSessionAction({
        taskId: currentSession.taskId,
        sessionStartTime: currentSession.sessionStartTime,
        sessionEndTime: DateTime.now().toString(),
        sessionType: currentSession.sessionType,
      }),
    );
    dispatch(stopSessionAction());
  };

  useEffect(() => {
    if (!currentSession) return;
    const intervalId = setInterval(() => {
      dispatch(setCounterForRerender());
    }, 1000 * 10);

    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSession]);

  if (currentSession) {
    return (
      <Button
        onClick={() => {
          handleStopButtonClick();
          if (window.electron) window.electron.send('stopTimer');
        }}
        className='bg-red-600 hover:bg-red-700 w-full opacity-85 h-auto py-3'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-5 h-5 mr-2'
        >
          <path
            fillRule='evenodd'
            d='M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z'
            clipRule='evenodd'
          />
        </svg>
        Stop {currentSessionTask.title}
      </Button>
    );
  }

  return (
    <Button
      onClick={() => {
        handleStartButtonClick(startButtonTask.id);
        if (window.electron) window.electron.send('startTimer');
      }}
      className='bg-green-600 hover:bg-green-700 w-full opacity-85 h-auto py-3'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-5 h-5 mr-2'
      >
        <path
          fillRule='evenodd'
          d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
          clipRule='evenodd'
        />
      </svg>
      Start {startButtonTask.title}
    </Button>
  );
};
export default StartAndStopButton;
