import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const CircularProgressBar = ({ percentage }) => {
  const [progressColor, setProgressColor] = useState('');
  const circumference = 2 * Math.PI * 40;
  const circleRef = useRef(null);

  useEffect(() => {
    const progressOffset = (percentage / 100) * circumference;
    const offsetValue = circumference - progressOffset;

    if (circleRef.current) {
      gsap.to(circleRef.current, { strokeDashoffset: offsetValue, duration: 1, ease: 'power2.out' });
    }

    // Set progress color based on percentage
    if (percentage >= 70) {
      setProgressColor('stroke-green-500');
    } else if (percentage >= 50) {
      setProgressColor('stroke-yellow-500');
    } else {
      setProgressColor('stroke-red-500');
    }
  }, [percentage, circumference]);

  return (
    <div className="w-16 h-16 relative py-1">
      <svg
        className="absolute"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle
          className="stroke-gray-300 dark:stroke-gray-700"
          cx="50"
          cy="50"
          r="40"
          strokeWidth="8"
          fill="transparent"
        />

        {/* Progress circle */}
        <circle
          ref={circleRef}
          className={`transition-all duration-300 ease-in-out ${progressColor}`}
          cx="50"
          cy="50"
          r="40"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          transform="rotate(-90, 50, 50)"
        />

        {/* Text percentage */}
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          fontSize="22px"
          className="font-semibold fill-gray-900 dark:fill-white"
        >
          {percentage}%
        </text>

      </svg>
    </div>
  );
};

export default CircularProgressBar;
