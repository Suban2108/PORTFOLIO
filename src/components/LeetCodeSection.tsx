'use client';

import { CheckCircle, BarChart3 } from 'lucide-react';
import clsx from 'clsx';

interface LeetCodeStatsSectionProps {
  totalSolved?: number;
  totalQuestions?: number;
  easy?: [number, number];
  medium?: [number, number];
  hard?: [number, number];
  isLoading?: boolean;
}

const LeetCodeStatsSection: React.FC<LeetCodeStatsSectionProps> = ({
  totalSolved = 0,
  totalQuestions = 1,
  easy = [0, 1],
  medium = [0, 1],
  hard = [0, 1],
  isLoading = false,
}) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  const calcDash = (val: number, total: number) =>
    (val / totalQuestions) * circumference;

  return (
    <section
      id="leetcode"
      className="bg-[#1e1e1e] text-white py-16 px-4 sm:px-8 md:px-16 lg:px-32 relative"
    >
      <div className="absolute left-0 top-10 bottom-10 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-40 hidden sm:block" />

      <div className="max-w-6xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between gap-12">
        {/* 💬 Left: Description */}
        <div className="sm:w-1/2 text-left relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-purple-700 w-6 h-6" />
            <h2 className={clsx('text-4xl font-bold', isLoading && 'bg-gray-700 rounded w-1/2 h-8 animate-pulse')}>
              {!isLoading && 'My LeetCode Journey'}
            </h2>
          </div>

          <p className={clsx('text-gray-300 mb-4 leading-relaxed tracking-wide text-base', isLoading && 'h-16 bg-gray-700 rounded animate-pulse')}>
            {!isLoading &&
              `LeetCode has been a core part of my problem-solving and technical growth journey. 
              It helped me develop strong fundamentals in data structures, algorithms, and critical thinking—skills that I regularly apply in real-world development and coding interviews.`}
          </p>

          <p className={clsx('text-gray-400 text-sm', isLoading && 'bg-gray-700 h-4 w-3/4 rounded animate-pulse')}>
            {!isLoading &&
              'Below is a visual representation of my current progress across different difficulties.'}
          </p>

          {!isLoading && (
            <div className="mt-6">
              <span className="inline-block bg-purple-800 text-pink-300 text-xs uppercase tracking-wide px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                Live Stats Synced
              </span>
            </div>
          )}
        </div>

        {/* 📊 Right: Chart + Stats */}
        <div className="sm:w-1/2 flex flex-col items-center gap-6">
          {/* Chart */}
          <div className={clsx('relative w-60 h-60', isLoading && 'animate-pulse')}>
            {isLoading ? (
              <div className="w-full h-full bg-gray-700 rounded-full" />
            ) : (
              <>
                <svg width="100%" height="100%" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#2d2d2d"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#00ff59ff"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${calcDash(easy[0], easy[1])} ${circumference}`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#FFD233"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${calcDash(medium[0], medium[1])} ${circumference}`}
                    strokeDashoffset={-calcDash(easy[0], easy[1])}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#FF6363"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${calcDash(hard[0], hard[1])} ${circumference}`}
                    strokeDashoffset={
                      -(
                        calcDash(easy[0], easy[1]) + calcDash(medium[0], medium[1])
                      )
                    }
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">
                  <div className="text-[25px] font-bold flex justify-center items-center"><p className='text-[40px] flex items-center'>{totalSolved}</p>/{totalQuestions}</div>
                  <div className="flex items-center gap-1 text-green-500 text-sm mt-1">
                    <CheckCircle className="w-4 h-4" />
                    Solved
                  </div>
                  <div className="text-gray-400 text-xs mt-1">0 Attempting</div>
                </div>
              </>
            )}
          </div>

          {/* Stats List */}
          <div className="flex flex-col gap-3 w-full sm:w-3/4">
            {['Easy', 'Med.', 'Hard'].map((label, i) => {
              const [solved, total] = [easy, medium, hard][i];
              const colors = ['text-green-400', 'text-yellow-400', 'text-red-400'];
              return (
                <div
                  key={label}
                  className={clsx(
                    'bg-[#2a2a2a] px-4 py-2 rounded-md flex justify-between items-center shadow-md',
                    isLoading && 'animate-pulse'
                  )}
                >
                  <span className={clsx('font-medium', colors[i])}>
                    {isLoading ? <div className="h-4 w-12 bg-gray-600 rounded" /> : label}
                  </span>
                  <span>
                    {isLoading ? <div className="h-4 w-16 bg-gray-600 rounded" /> : `${solved}/${total}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeetCodeStatsSection;
