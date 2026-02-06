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
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">보완이 필요한 영역</h4>
              <p className="text-gray-700">
                {MUSCLE_ICONS[weakestMuscle]} <strong>{MUSCLE_NAMES[weakestMuscle]}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-amber-200">
            <TrendingUp className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">실행 가이드</h4>
              <p className="text-gray-700 leading-relaxed">
                {action}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
