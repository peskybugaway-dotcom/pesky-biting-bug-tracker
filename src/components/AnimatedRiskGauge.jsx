import React from 'react';

const AnimatedRiskGauge = ({ value = 0 }) => {
  // Logic to calculate needle rotation
  // 0 is far left (-90deg), 3 is far right (90deg)
  const rotation = (value / 3) * 180 - 90;

  const getColor = (v) => {
    if (v >= 3) return '#ef4444'; // Red
    if (v >= 2) return '#f97316'; // Orange
    if (v >= 1) return '#facc15'; // Yellow
    return '#10b981';            // Emerald
  };

  return (
    <div className="relative flex flex-col items-center">
      <svg width="160" height="100" viewBox="0 0 160 100">
        {/* Background Track (The gray arc) */}
        <path
          d="M 20 80 A 60 60 0 0 1 140 80"
          fill="none"
          stroke="#1e293b"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Colored Progress Track */}
        <path
          d="M 20 80 A 60 60 0 0 1 140 80"
          fill="none"
          stroke={getColor(value)}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="188.5"
          strokeDashoffset={188.5 - (value / 3) * 188.5}
          className="transition-all duration-1000 ease-out"
        />
        {/* The Needle */}
        <g transform={`rotate(${rotation}, 80, 80)`}>
          <line
            x1="80" y1="80" x2="80" y2="30"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="80" cy="80" r="5" fill="white" />
        </g>
      </svg>
      
      {/* Big Number in the middle */}
      <div className="absolute top-12 text-3xl font-black text-white">
        {value}
      </div>
    </div>
  );
};

export default AnimatedRiskGauge;
