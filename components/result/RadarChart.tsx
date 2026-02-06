'use client';

import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { RootScores, MuscleScores } from '@/types';
import { motion } from 'framer-motion';

interface RadarChartProps {
  rootScores: RootScores;
  muscleScores: MuscleScores;
}

export function RadarChartComponent({ rootScores, muscleScores }: RadarChartProps) {
  const data = [
    { factor: 'MIND\n(성품)', value: rootScores.MIND, fullMark: 5 },
    { factor: 'WILL\n(의지)', value: rootScores.WILL, fullMark: 5 },
    { factor: 'HEART\n(마음)', value: rootScores.HEART, fullMark: 5 },
    { factor: 'HEAD\n(지혜)', value: muscleScores.HEAD, fullMark: 5 },
    { factor: 'HAND\n(야성)', value: muscleScores.HAND, fullMark: 5 },
    { factor: 'SOUL\n(장악)', value: muscleScores.SOUL, fullMark: 5 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full h-[400px] bg-white rounded-lg p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
        DNA 분석 차트
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="factor"
            tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }}
            style={{ whiteSpace: 'pre-line' }}
          />
          <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#9ca3af', fontSize: 11 }} />
          <Radar
            name="점수"
            dataKey="value"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.6}
            strokeWidth={2}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </motion.div>
  );
}
