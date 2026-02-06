'use client';

import { Card, CardContent } from '@/components/ui/card';
import { RootType, MuscleType } from '@/types';
import { ROOT_DESCRIPTIONS, MUSCLE_DESCRIPTIONS } from '@/constants/descriptions';
import { motion } from 'framer-motion';

interface ResultSummaryProps {
  rootDominance: RootType;
  majorMuscle: MuscleType;
  minorMuscle: MuscleType;
}

export function ResultSummary({ rootDominance, majorMuscle, minorMuscle }: ResultSummaryProps) {
  const rootDesc = ROOT_DESCRIPTIONS[rootDominance];
  const majorDesc = MUSCLE_DESCRIPTIONS[majorMuscle];
  const minorDesc = MUSCLE_DESCRIPTIONS[minorMuscle];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
            🧬 당신의 DNA 구성
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* Root */}
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">{rootDesc.icon}</div>
              <div className="text-xs text-gray-500 mb-1">뿌리 (태도)</div>
              <div className="font-bold text-gray-800">{rootDesc.name}</div>
              <div className="text-xs text-gray-600 mt-2">{rootDesc.title}</div>
            </div>

            {/* Major Muscle */}
            <div className="bg-white p-4 rounded-lg text-center border-2 border-purple-300">
              <div className="text-3xl mb-2">{majorDesc.icon}</div>
              <div className="text-xs text-purple-600 mb-1 font-semibold">주력 엔진</div>
              <div className="font-bold text-gray-800">{majorDesc.name}</div>
              <div className="text-xs text-gray-600 mt-2">{majorDesc.title}</div>
            </div>

            {/* Minor Muscle */}
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">{minorDesc.icon}</div>
              <div className="text-xs text-gray-500 mb-1">보조 엔진</div>
              <div className="font-bold text-gray-800">{minorDesc.name}</div>
              <div className="text-xs text-gray-600 mt-2">{minorDesc.title}</div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-white/80 rounded-lg">
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              <strong className="text-purple-600">{rootDesc.title}</strong> 태도를 바탕으로,
              <strong className="text-purple-600"> {majorDesc.title}</strong>을(를) 주무기로 사용하며,
              필요할 때 <strong className="text-purple-600">{minorDesc.title}</strong>을(를) 보조로 활용하는 창업가입니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
