import { useEffect, useState } from 'react';

const LoadingProgressBar = ({ message }: { message?: string }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 10);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex items-center justify-center">
      <div className="text-center w-1/2">
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300 ease-in-out"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, #00c6ff, #0072ff)`,
              boxShadow: `0 0 10px #00c6ff, 0 0 20px #0072ff`,
            }}
          ></div>
        </div>
        <p>{message || 'Loading information...'}</p>
      </div>
    </div>
  );
};

export default LoadingProgressBar;
