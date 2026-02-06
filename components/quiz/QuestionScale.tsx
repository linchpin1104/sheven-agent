'use client';

import { Question } from '@/types';
import { motion } from 'framer-motion';

interface QuestionScaleProps {
  question: Question;
  value: number;
  onChange: (value: number) => void;
  index: number;
  isFocused: boolean;
  onFocus: () => void;
}

const SCALE_LABELS = [
  '전혀 아니다',
  '아니다', 
  '보통이다',
  '그렇다',
  '매우 그렇다',
];

export function QuestionScale({ question, value, onChange, index, isFocused, onFocus }: QuestionScaleProps) {
  // 모든 문항에 동일한 보라색 스타일 적용
  const styles = {
    active: 'bg-purple-500 border-purple-500',
    hover: 'hover:border-purple-400 hover:bg-purple-50',
    border: 'border-purple-500',
    text: 'text-purple-700',
    line: 'bg-purple-400',
    check: 'text-purple-600',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      onClick={onFocus}
      className={`py-6 border-b border-gray-200 last:border-0 cursor-pointer transition-all ${
        isFocused ? 'bg-purple-50 -mx-6 px-6 rounded-lg' : 'hover:bg-gray-50 -mx-6 px-6'
      }`}
    >
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-2">
          <div className="flex items-center gap-2 min-w-[60px]">
            {isFocused && (
              <span className="text-purple-600 animate-pulse">▶</span>
            )}
            <span className={`text-sm font-bold ${isFocused ? 'text-purple-600' : 'text-gray-500'}`}>
              Q{question.id}
            </span>
          </div>
          <p className={`leading-relaxed flex-1 ${isFocused ? 'text-gray-900 font-medium' : 'text-gray-800'}`}>
            {question.text}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-[52px] relative">
        {/* Background connecting lines */}
        <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-6">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`flex-1 h-0.5 transition-all duration-200 ${
                value >= index && value !== 0
                  ? styles.line
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            onClick={() => onChange(score)}
            className={`flex-1 group relative z-10 transition-all duration-200 ${
              value === score ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            {/* Radio Button */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all duration-200 shadow-md ${
                  value === score
                    ? `${styles.active} text-white shadow-xl`
                    : `border-gray-300 bg-white text-gray-600 ${styles.hover}`
                }`}
              >
                {score}
              </div>
              
              {/* Label */}
              <span
                className={`text-xs text-center transition-all duration-200 leading-tight ${
                  value === score
                    ? `${styles.text} font-bold`
                    : 'text-gray-500 group-hover:text-gray-700'
                }`}
              >
                {SCALE_LABELS[score - 1]}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Answer indicator */}
      {value > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-2 ml-[52px] text-xs ${styles.check} font-medium`}
        >
          ✓ 답변 완료
        </motion.div>
      )}
    </motion.div>
  );
}
