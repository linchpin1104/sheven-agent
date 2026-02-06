'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RootType, MuscleType, RootScores, MuscleScores } from '@/types';
import { ROOT_DESCRIPTIONS, MUSCLE_DESCRIPTIONS, getScoreLevel } from '@/constants/descriptions';
import { motion } from 'framer-motion';
import { TrendingUp, BookOpen } from 'lucide-react';

interface DetailedAnalysisProps {
  rootDominance: RootType;
  majorMuscle: MuscleType;
  minorMuscle: MuscleType;
  rootScores: RootScores;
  muscleScores: MuscleScores;
}

export function DetailedAnalysis({
  rootDominance,
  majorMuscle,
  minorMuscle,
  rootScores,
  muscleScores,
}: DetailedAnalysisProps) {
  const rootDesc = ROOT_DESCRIPTIONS[rootDominance];
  const majorDesc = MUSCLE_DESCRIPTIONS[majorMuscle];
  const minorDesc = MUSCLE_DESCRIPTIONS[minorMuscle];

  return (
    <div className="space-y-6">
      {/* Root 분석 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Card className={`border-2 border-${rootDesc.color}-200 bg-gradient-to-br from-${rootDesc.color}-50 to-${rootDesc.color}-100`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-3xl">{rootDesc.icon}</span>
              <div>
                <div className="text-xl">{rootDesc.name}</div>
                <div className="text-sm font-normal text-gray-600">{rootDesc.title}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-4">{rootDesc.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✓ 강점</h4>
                  <p className="text-sm text-gray-700">{rootDesc.strength}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">⚠ 주의점</h4>
                  <p className="text-sm text-gray-700">{rootDesc.weakness}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>💡 조언:</strong> {rootDesc.advice}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Major Muscle 분석 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-3xl">{majorDesc.icon}</span>
              <div>
                <div className="text-xl">{majorDesc.name} - 주력 엔진</div>
                <div className="text-sm font-normal text-gray-600">
                  점수: {muscleScores[majorMuscle].toFixed(2)} / 5.0
                  <span className={`ml-2 ${getScoreLevel(muscleScores[majorMuscle]).color}`}>
                    ({getScoreLevel(muscleScores[majorMuscle]).level})
                  </span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <p className="text-gray-700 leading-relaxed mb-4">{majorDesc.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✓ 강점</h4>
                  <p className="text-sm text-gray-700">{majorDesc.strength}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">⚠ 주의점</h4>
                  <p className="text-sm text-gray-700">{majorDesc.weakness}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                이 역량을 더 키우려면
              </h4>
              <ul className="space-y-2">
                {majorDesc.howToImprove.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Minor Muscle 분석 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <Card className="border-2 border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-3xl">{minorDesc.icon}</span>
              <div>
                <div className="text-xl">{minorDesc.name} - 보조 엔진</div>
                <div className="text-sm font-normal text-gray-600">
                  점수: {muscleScores[minorMuscle].toFixed(2)} / 5.0
                  <span className={`ml-2 ${getScoreLevel(muscleScores[minorMuscle]).color}`}>
                    ({getScoreLevel(muscleScores[minorMuscle]).level})
                  </span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <p className="text-gray-700 leading-relaxed">
                {minorDesc.description}
              </p>
            </div>

            <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
              <p className="text-sm text-pink-900">
                <strong>💡 Tip:</strong> 보조 엔진을 적절히 활용하면 주력 엔진의 약점을 보완할 수 있습니다.
                {majorMuscle}의 한계가 느껴질 때 {minorMuscle}를 활용해보세요.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 전체 점수 요약 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              상세 점수 분석
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Root Scores */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">태도 (Root) 점수</h4>
                <div className="space-y-2">
                  {Object.entries(rootScores).map(([key, score]) => {
                    const level = getScoreLevel(score);
                    const desc = ROOT_DESCRIPTIONS[key as RootType];
                    return (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{desc.icon}</span>
                          <span className="font-medium">{desc.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{score.toFixed(2)}</div>
                          <div className={`text-xs ${level.color}`}>{level.level}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Muscle Scores */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">역량 (Muscle) 점수</h4>
                <div className="space-y-2">
                  {Object.entries(muscleScores).map(([key, score]) => {
                    const level = getScoreLevel(score);
                    const desc = MUSCLE_DESCRIPTIONS[key as MuscleType];
                    return (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{desc.icon}</span>
                          <span className="font-medium">{desc.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{score.toFixed(2)}</div>
                          <div className={`text-xs ${level.color}`}>{level.level}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
