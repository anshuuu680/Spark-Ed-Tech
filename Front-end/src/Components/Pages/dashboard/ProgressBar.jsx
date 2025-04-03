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

    if (percentage >= 70) {
      setProgressColor('text-green-500');
    } else if (percentage >= 50) {
      setProgressColor('text-yellow-500');
    } else {
      setProgressColor('text-red-500');
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
        <circle className="stroke-current" cx="50" cy="50" r="40" strokeWidth="6" fill="transparent" />
        <circle
          ref={circleRef}
          className={`stroke-current ${progressColor}`}
          cx="50"
          cy="50"
          r="40"
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          transform="rotate(-90, 50, 50)"
        />
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
