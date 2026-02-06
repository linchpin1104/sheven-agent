'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MuscleType } from '@/types';
import { motion } from 'framer-motion';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';

interface ActionPlanProps {
  weakestMuscle: MuscleType;
  action: string;
}

const MUSCLE_NAMES: Record<MuscleType, string> = {
  HEAD: '지혜 (전략적 사고)',
  HAND: '야성 (실행력)',
  SOUL: '장악 (리더십)',
};

const MUSCLE_ICONS: Record<MuscleType, string> = {
  HEAD: '🧠',
  HAND: '💪',
  SOUL: '❤️',
};

// 텍스트를 포맷팅하는 함수
function formatText(text: string) {
  // **텍스트** -> <strong>
  const formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-bold">$1</strong>');
  
  // 줄바꿈 처리
  const paragraphs = formatted.split('\n\n');
  
  return paragraphs.map((para, idx) => {
    // 리스트 항목 체크
    if (para.trim().startsWith('•') || para.trim().startsWith('-')) {
      const items = para.split('\n').filter(line => line.trim());
      return (
        <ul key={idx} className="space-y-2 ml-4">
          {items.map((item, itemIdx) => {
            const cleanItem = item.replace(/^[•\-]\s*/, '');
            return (
              <li key={itemIdx} className="text-gray-700 leading-relaxed list-disc">
                <span dangerouslySetInnerHTML={{ __html: cleanItem }} />
              </li>
            );
          })}
        </ul>
      );
    }
    
    // 일반 문단
    return (
      <p key={idx} className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: para }} />
    );
  });
}

export function ActionPlan({ weakestMuscle, action }: ActionPlanProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900">
            <Target className="w-6 h-6" />
            성장 처방전
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">가장 약한 영역 집중 공략</h4>
              <p className="text-gray-700">
                {MUSCLE_ICONS[weakestMuscle]} <strong>{MUSCLE_NAMES[weakestMuscle]}</strong>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                이 영역을 강화하면 시너지 효과가 극대화됩니다.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg border border-amber-200 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900 text-lg">실행 가이드</h4>
            </div>
            <div className="space-y-4">
              {formatText(action)}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
