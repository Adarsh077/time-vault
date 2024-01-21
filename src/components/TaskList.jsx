import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';

import { RecordSessionType } from '@/enum';
import {
  startSessionAction,
  stopSessionAction,
} from '@/store/current-session/current-session.action';
import { currentSessionSelector } from '@/store/current-session/current-session.selector';
import { recordSessionAction } from '@/store/records/records.action';
import { tasksSelector } from '@/store/task/task.selector';

const TaskList = () => {
  const tasks = useSelector(tasksSelector);
  const currentSession = useSelector(currentSessionSelector);
  const dispatch = useDispatch();

  const handleStartButtonClick = (taskId) => {
    if (currentSession) {
      dispatch(stopSessionAction());
      dispatch(
        recordSessionAction({
          taskId: currentSession.taskId,
          sessionStartTime: currentSession.sessionStartTime,
          sessionEndTime: DateTime.now().toString(),
          sessionType: currentSession.sessionType,
        }),
      );
    }

    if (window.electron) window.electron.send('startTimer');

    dispatch(
      startSessionAction({ taskId, sessionType: RecordSessionType.ACTIVE }),
    );
  };

  return tasks.map((task) => (
    <div key={task.id} className='border-b-[1px] border-b-gray-300'>
      <div className='flex items-center justify-between'>
        <p className='px-2 py-3 text-sm'>{task.title}</p>
        {currentSession?.taskId !== task.id && (
          <div
            className='px-4 py-3 cursor-pointer'
            onClick={() => handleStartButtonClick(task.id)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-5 h-5 text-green-600'
            >
              <path
                fillRule='evenodd'
                d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  ));
};
export default TaskList;
