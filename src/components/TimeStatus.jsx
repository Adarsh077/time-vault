import { useSelector } from 'react-redux';

import {
  todaysActiveTimeSelector,
  todaysIdleTimeSelector,
  weekActiveTimeSelector,
  weekIdleTimeSelector,
} from '@/store/records/records.selector';
import { secondsToHumanReadable } from '@/utils';

const TimeStatus = () => {
  const todaysActiveMinutes = useSelector(todaysActiveTimeSelector);
  const todaysIdleMinutes = useSelector(todaysIdleTimeSelector);
  const weekActiveMinutes = useSelector(weekActiveTimeSelector);
  const weekIdleTimeMinutes = useSelector(weekIdleTimeSelector);

  return (
    <table className='w-full text-[14px] text-left'>
      <thead>
        <tr>
          <th></th>
          <th className='font-normal text-green-700'>Active</th>
          <th className='font-normal text-red-600'>Idle</th>
          <th className='font-normal'>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr className='font-bold'>
          <th className='text-sm text-right pr-6'>Day</th>
          <td className='text-green-700'>
            {secondsToHumanReadable(todaysActiveMinutes)}
          </td>
          <td className='text-red-600'>
            {secondsToHumanReadable(todaysIdleMinutes)}
          </td>
          <td>
            {secondsToHumanReadable(todaysActiveMinutes + todaysIdleMinutes)}
          </td>
        </tr>
        <tr>
          <th className='text-sm font-normal text-right pr-6'>Week</th>
          <td className='text-green-700'>
            {secondsToHumanReadable(weekActiveMinutes)}
          </td>
          <td className='text-red-600'>
            {secondsToHumanReadable(weekIdleTimeMinutes)}
          </td>
          <td>
            {secondsToHumanReadable(weekActiveMinutes + weekIdleTimeMinutes)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default TimeStatus;
