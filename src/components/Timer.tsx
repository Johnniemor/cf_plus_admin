import { RootState } from '@/redux';
import { setHours, setMinutes, setSeconds } from '@/redux/reducer/timer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ITimer {
  isHeader?: boolean;
}

const Timer: React.FC<ITimer> = ({ isHeader }) => {
  const dispatch = useDispatch();
  const { seconds, minutes, hours, fromTime, commitTime, isRunning, fetching } =
    useSelector((state: RootState) => state.timer);

  const manageTimer = (commit?: number) => {
    const now = commit || new Date().getTime();
    const elapsedTime = now - fromTime;

    const elapsedSeconds = Math.floor(elapsedTime / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);

    dispatch(setSeconds(elapsedSeconds % 60));
    dispatch(setMinutes(elapsedMinutes % 60));
    dispatch(setHours(elapsedHours));
  };

  useEffect(() => {
    let interval: any;
    if (commitTime) manageTimer(commitTime);

    if (isRunning) interval = setInterval(() => manageTimer(), 1000);
    else clearInterval(interval);

    return () => interval && clearInterval(interval);
  }, [fromTime, isRunning]);

  return isHeader ? (
    <div className="flex items-center space-x-0.5 md:space-x-1 lg:space-x-2">
      {fetching ? (
        <div className="text-center">
          <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
            Loading, please wait...
          </p>
          <div className="mt-2">
            <div className="w-4 h-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      ) : (
        <>
          <TimeSegmentHeader label="Hours" value={hours} />
          <ColonHeader />
          <TimeSegmentHeader label="Minutes" value={minutes} />
          <ColonHeader />
          <TimeSegmentHeader label="Seconds" value={seconds} />
        </>
      )}
    </div>
  ) : (
    <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8">
      {fetching ? (
        <div className="text-center">
          <p className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Loading, please wait...
          </p>
          <div className="mt-4">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      ) : (
        <>
          <TimeSegment label="Hours" value={hours} />
          <Colon />
          <TimeSegment label="Minutes" value={minutes} />
          <Colon />
          <TimeSegment label="Seconds" value={seconds} />
        </>
      )}
    </div>
  );
};

interface TimeSegmentProps {
  label: string;
  value: number;
}

const TimeSegment: React.FC<TimeSegmentProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-20 w-30 sm:h-25 sm:w-40 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 ease-out">
          <span className="text-8xl sm:text-9xl lg:text-10xl font-bold tabular-nums text-gray-700 dark:text-gray-300">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base mt-1 sm:mt-2 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
};

const Colon: React.FC = () => (
  <div className="relative flex items-center justify-center h-14 sm:h-20 md:h-25">
    <div className="absolute top-0 text-gray-700 dark:text-gray-300 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
      :
    </div>
  </div>
);

const TimeSegmentHeader: React.FC<TimeSegmentProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-6 w-8 sm:w-10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 ease-out">
          <span className="text-2xl sm:text-3xl lg:text-[31px] font-bold tabular-nums text-gray-700 dark:text-gray-300">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-gray-700 dark:text-gray-300 text-[6px] md:text-[8px] uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
};

const ColonHeader: React.FC = () => (
  <div className="relative flex items-center justify-center">
    <div className="absolute -top-6 sm:-top-7 text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
      :
    </div>
  </div>
);

export default Timer;
