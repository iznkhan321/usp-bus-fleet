import React from 'react';

interface UspLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showDetails?: boolean;
  className?: string;
}

export const UspLogo: React.FC<UspLogoProps> = ({ size = 'sm', showDetails = false, className = '' }) => {
  const dimensionMap = {
    xs: 'w-6 h-6',
    sm: 'w-9 h-9',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-44 h-44'
  };

  const dim = dimensionMap[size];

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Golden Metallic Medallion */}
      <div
        className={`${dim} rounded-full relative flex items-center justify-center p-[2px] shadow-md transition-transform`}
        style={{
          background: 'radial-gradient(circle at 35% 25%, #FFF0A5 0%, #D4AF37 35%, #AA771C 70%, #583906 100%)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.6), inset 0 -2px 4px rgba(0,0,0,0.4)'
        }}
      >
        {/* Inner dark textured ring */}
        <div className="w-full h-full rounded-full bg-[#1e2329] border border-[#d4af37]/80 flex flex-col items-center justify-center relative overflow-hidden p-1 shadow-inner">
          {/* Subtle gold metallic shimmer overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 120%, #ffdf78, transparent 70%)'
            }}
          />

          {/* SVG representation of the University seal */}
          <svg viewBox="0 0 160 160" className="w-full h-full">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff3b0" />
                <stop offset="40%" stopColor="#d4af37" />
                <stop offset="85%" stopColor="#8d5b12" />
                <stop offset="100%" stopColor="#583906" />
              </linearGradient>
              <filter id="emboss" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0.5" dy="0.8" stdDeviation="0.4" floodColor="#000" floodOpacity="0.8" />
              </filter>
              <path id="textCircle" d="M 22,80 A 58,58 0 1,1 138,80" />
              <path id="bottomCircle" d="M 134,84 A 56,56 0 0,1 26,84" />
            </defs>

            {/* Concentric gold rings */}
            <circle cx="80" cy="80" r="74" fill="none" stroke="url(#goldGrad)" strokeWidth="3" />
            <circle cx="80" cy="80" r="54" fill="none" stroke="url(#goldGrad)" strokeWidth="1.8" />

            {/* Circular Text */}
            <text fill="url(#goldGrad)" fontSize="9.5" fontWeight="800" letterSpacing="0.8" filter="url(#emboss)">
              <textPath href="#textCircle" startOffset="50%" textAnchor="middle">
                UNIVERSITY OF SOUTHERN PUNJAB
              </textPath>
            </text>

            <text fill="url(#goldGrad)" fontSize="9" fontWeight="800" letterSpacing="1" filter="url(#emboss)">
              <textPath href="#bottomCircle" startOffset="50%" textAnchor="middle">
                MULTAN PAKISTAN
              </textPath>
            </text>

            {/* Arabic Calligraphy Header: (اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ) */}
            <text
              x="80"
              y="45"
              fill="url(#goldGrad)"
              fontSize="6"
              fontWeight="bold"
              textAnchor="middle"
              filter="url(#emboss)"
              fontFamily="serif"
            >
              (اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ (القرآن
            </text>

            {/* Central USP Text */}
            <text
              x="80"
              y="60"
              fill="url(#goldGrad)"
              fontSize="14"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="0.5"
              filter="url(#emboss)"
            >
              USP
            </text>

            {/* Central Shield Outline */}
            <path
              d="M 62,64 L 98,64 L 98,82 Q 98,96 80,103 Q 62,96 62,82 Z"
              fill="none"
              stroke="url(#goldGrad)"
              strokeWidth="1.8"
              filter="url(#emboss)"
            />

            {/* Geometric Motif inside Shield */}
            <path
              d="M 72,72 L 88,72 L 88,86 L 72,86 Z M 75,69 L 85,69 L 85,89 L 75,89 Z"
              fill="none"
              stroke="url(#goldGrad)"
              strokeWidth="1.2"
              opacity="0.9"
            />
            <circle cx="80" cy="79" r="3" fill="url(#goldGrad)" />

            {/* Foundation Year: 2010 */}
            <text
              x="80"
              y="114"
              fill="url(#goldGrad)"
              fontSize="7"
              fontWeight="bold"
              textAnchor="middle"
              letterSpacing="0.5"
              filter="url(#emboss)"
            >
              2010
            </text>
          </svg>
        </div>
      </div>

      {showDetails && (
        <div className="ml-2.5 flex flex-col text-left">
          <span className="font-extrabold text-[#0b1c30] tracking-tight leading-none text-base">
            USP <span className="text-[#0b2545] font-semibold">BusFleet</span>
          </span>
          <span className="text-[11px] text-[#64748b] font-medium tracking-tight mt-0.5">
            Student Transit Pass
          </span>
        </div>
      )}
    </div>
  );
};
