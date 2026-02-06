'use client';

import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface QuizProgressProps {
  current: number;
  total: number;
  answeredCount: number;
}

export function QuizProgress({ current, total, answeredCount }: QuizProgressProps) {
  const percentage = Math.round((answeredCount / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-gray-700">
          문항 {current + 1} / {total}
        </span>
        <motion.span
          key={percentage}
          initial={{ scale: 1.2, color: '#10b981' }}
          animate={{ scale: 1, color: '#6b7280' }}
          className="font-semibold"
        >
          {percentage}% 완료
        </motion.span>
      </div>
      <Progress value={percentage} className="h-3" />
    </div>
  );
}
