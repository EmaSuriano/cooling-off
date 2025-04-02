import { useState, useEffect } from "react";

interface TimerProgressBarProps {
  createdDate: string;
  targetDate: string;
}

const TimerProgressBar = ({
  createdDate,
  targetDate,
}: TimerProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Function to calculate progress and time left
    const updateProgress = () => {
      const now = new Date();
      const startDate = new Date(createdDate);
      const endDate = new Date(targetDate);

      // Calculate total duration in milliseconds
      const totalDuration = endDate.getTime() - startDate.getTime();
      // Calculate elapsed time in milliseconds
      const elapsedTime = now.getTime() - startDate.getTime();

      // Calculate progress percentage (capped at 100%)
      const calculatedProgress = Math.min(
        Math.floor((elapsedTime / totalDuration) * 100),
        100
      );
      setProgress(calculatedProgress);

      // Calculate time left
      if (now >= endDate) {
        setTimeLeft("Ready to decide!");
      } else {
        const timeLeftMs = endDate.getTime() - now.getTime();
        setTimeLeft(formatTimeLeft(timeLeftMs));
      }
    };

    // Initial update
    updateProgress();

    // Update every minute
    const intervalId = setInterval(updateProgress, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [createdDate, targetDate]);

  // Format time left in a human-readable format
  const formatTimeLeft = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days !== 1 ? "s" : ""} left`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""} left`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} left`;
    } else {
      return "Less than a minute left";
    }
  };

  // Determine color based on progress
  const getProgressColor = () => {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 75) return "bg-yellow-500";
    if (progress >= 50) return "bg-blue-500";
    return "bg-red-500";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
        <span>Cooling off...</span>
        <span>{timeLeft}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getProgressColor()}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TimerProgressBar;
