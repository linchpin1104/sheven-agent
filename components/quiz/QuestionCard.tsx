'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '@/types';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
  value: number;
  onChange: (value: number) => void;
}

const LABELS = [
  '전혀 아니다',
  '아니다',
  '보통이다',
  '그렇다',
  '매우 그렇다',
];

const CATEGORY_COLORS: Record<string, string> = {
  MIND: 'from-blue-500 to-cyan-500',
  WILL: 'from-red-500 to-orange-500',
  HEART: 'from-pink-500 to-rose-500',
  HEAD: 'from-purple-500 to-indigo-500',
  HAND: 'from-green-500 to-emerald-500',
  SOUL: 'from-amber-500 to-yellow-500',
};

const CATEGORY_NAMES: Record<string, string> = {
  MIND: '성품',
  WILL: '의지',
  HEART: '마음',
  HEAD: '지혜',
  HAND: '야성',
  SOUL: '장악',
};

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${CATEGORY_COLORS[question.category]}`}>
              {CATEGORY_NAMES[question.category]}
            </span>
            <span className="text-xs text-gray-500">Q{question.id}</span>
          </div>
          <CardTitle className="text-xl leading-relaxed">
            {question.text}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <RadioGroup
            value={value.toString()}
            onValueChange={(val) => onChange(parseInt(val))}
            className="space-y-3"
          >
            {[1, 2, 3, 4, 5].map((score) => (
              <motion.div
                key={score}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    value === score
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                  }`}
                  onClick={() => onChange(score)}
                >
                  <RadioGroupItem value={score.toString()} id={`q${question.id}-${score}`} />
                  <Label
                    htmlFor={`q${question.id}-${score}`}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {LABELS[score - 1]}
                  </Label>
                  <span className="text-sm text-gray-500">{score}</span>
                </div>
              </motion.div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </motion.div>
  );
}
