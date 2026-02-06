'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MuscleScores, MuscleType } from '@/types';
import { MUSCLE_DESCRIPTIONS } from '@/constants/descriptions';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, MessageCircle } from 'lucide-react';

interface StrengthsWeaknessesProps {
  muscleScores: MuscleScores;
  majorMuscle: MuscleType;
  minorMuscle: MuscleType;
  lightContent: string;
  shadowContent: string;
}

export function StrengthsWeaknesses({
  muscleScores,
  majorMuscle,
  minorMuscle,
  lightContent,
  shadowContent,
}: StrengthsWeaknessesProps) {
  const majorScore = muscleScores[majorMuscle];
  const minorScore = muscleScores[minorMuscle];

  // 강점/약점 판단
  const isStrength = majorScore >= 4.0;
  const hasMinorWeakness = minorScore < 3.5; // 보조 엔진이 약한 경우

  const majorDesc = MUSCLE_DESCRIPTIONS[majorMuscle];
  const minorDesc = MUSCLE_DESCRIPTIONS[minorMuscle];

  // 주변에서 듣는 말 선택
  const getMajorFeedback = () => majorScore >= 3.5 ? majorDesc.commonFeedback.high : majorDesc.commonFeedback.low;
  const getMinorFeedback = () => minorScore >= 3.5 ? minorDesc.commonFeedback.high : minorDesc.commonFeedback.low;

  return (
    <div className="space-y-6">
      {/* 강점 */}
      {isStrength && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <TrendingUp className="w-5 h-5" />
                당신의 강점
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none text-gray-700">
                {lightContent.split('\n\n').map((para, idx) => (
                  <p key={idx} className="mb-3">{para}</p>
                ))}
              </div>

              {/* 주변에서 많이 듣는 말 */}
              <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="flex items-center gap-2 font-semibold text-green-700 mb-3">
                  <MessageCircle className="w-4 h-4" />
                  주변에서 가장 많이 듣는 말
                </h4>
                <div className="space-y-2">
                  {getMajorFeedback().map((feedback, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">💬</span>
                      <p className="text-sm text-gray-700 italic">{feedback}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 약점 */}
      {!isStrength && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700">
                <AlertCircle className="w-5 h-5" />
                개선이 필요한 부분
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none text-gray-700">
                {shadowContent.split('\n\n').map((para, idx) => (
                  <p key={idx} className="mb-3">{para}</p>
                ))}
              </div>

              {/* 주변에서 많이 듣는 말 */}
              <div className="mt-4 p-4 bg-white rounded-lg border border-amber-200">
                <h4 className="flex items-center gap-2 font-semibold text-amber-700 mb-3">
                  <MessageCircle className="w-4 h-4" />
                  주변에서 가장 많이 듣는 말
                </h4>
                <div className="space-y-2">
                  {getMajorFeedback().map((feedback, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">💬</span>
                      <p className="text-sm text-gray-700 italic">{feedback}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 보조 엔진이 약한 경우 추가 피드백 */}
      {hasMinorWeakness && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                보조 엔진 ({minorDesc.name}) 보완 필요
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">
                당신의 유형은 <strong className="text-purple-600">{minorDesc.title}</strong>을(를) 보조로 활용한다고 나왔지만,
                현재 이 영역의 점수가 <strong className="text-red-600">{minorScore.toFixed(1)}점</strong>으로 낮습니다.
              </p>
              <p className="text-sm text-gray-700">
                이는 <strong>유형은 맞지만 아직 충분히 발달하지 않은 상태</strong>입니다.
                보조 엔진이 제대로 작동하지 않으면 주력 엔진만으로는 한계에 부딪힐 수 있습니다.
              </p>

              {/* 주변에서 듣는 말 (약점) */}
              <div className="mt-4 p-4 bg-white rounded-lg border border-red-200">
                <h4 className="flex items-center gap-2 font-semibold text-red-700 mb-3">
                  <MessageCircle className="w-4 h-4" />
                  이런 피드백을 자주 받지 않나요?
                </h4>
                <div className="space-y-2">
                  {getMinorFeedback().map((feedback, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">💬</span>
                      <p className="text-sm text-gray-700 italic">{feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 개선 방법 */}
              <div className="mt-4 p-4 bg-white rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-700 mb-3">🎯 개선 방법</h4>
                <ul className="space-y-2">
                  {minorDesc.howToImprove.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
