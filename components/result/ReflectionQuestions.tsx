'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface ReflectionQuestionsProps {
  questions: string[];
}

export function ReflectionQuestions({ questions }: ReflectionQuestionsProps) {
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <HelpCircle className="w-6 h-6" />
            스스로에게 던져볼 점검 질문
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            이 질문들에 대한 답을 생각해보면서, 당신의 현재 위치와 나아갈 방향을 점검해보세요.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed flex-1 pt-1">
                  {question}
                </p>
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-blue-100/50 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">
              💡 <strong>활용 팁:</strong> 이 질문들을 노트에 적고, 매주 또는 매월 정기적으로 답변해보세요.
              시간이 지나면서 당신의 답변이 어떻게 변화하는지 관찰하면, 성장의 궤적을 볼 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
