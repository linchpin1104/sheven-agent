'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RootType, MuscleType } from '@/types';
import { ROOT_DESCRIPTIONS, MUSCLE_DESCRIPTIONS } from '@/constants/descriptions';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

interface ResultSummaryProps {
  rootDominance: RootType;
  majorMuscle: MuscleType;
  minorMuscle: MuscleType;
}

export function ResultSummary({ rootDominance, majorMuscle, minorMuscle }: ResultSummaryProps) {
  const rootDesc = ROOT_DESCRIPTIONS[rootDominance];
  const majorDesc = MUSCLE_DESCRIPTIONS[majorMuscle];
  const minorDesc = MUSCLE_DESCRIPTIONS[minorMuscle];
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);

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
            <div 
              className="bg-white p-4 rounded-lg text-center cursor-pointer hover:shadow-lg transition-shadow relative group"
              onClick={() => setSelectedInfo('root')}
            >
              <div className="absolute top-2 right-2">
                <Info className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
              </div>
              <div className="text-3xl mb-2">{rootDesc.icon}</div>
              <div className="text-xs text-gray-500 mb-1">기본 태도</div>
              <div className="font-bold text-gray-800">{rootDesc.name}</div>
              <div className="text-xs text-gray-600 mt-2">{rootDesc.title}</div>
            </div>

            {/* Major Muscle */}
            <div 
              className="bg-white p-4 rounded-lg text-center border-2 border-purple-300 cursor-pointer hover:shadow-lg transition-shadow relative group"
              onClick={() => setSelectedInfo('major')}
            >
              <div className="absolute top-2 right-2">
                <Info className="w-4 h-4 text-purple-400 group-hover:text-purple-600" />
              </div>
              <div className="text-3xl mb-2">{majorDesc.icon}</div>
              <div className="text-xs text-purple-600 mb-1 font-semibold">주력 엔진</div>
              <div className="font-bold text-gray-800">{majorDesc.name}</div>
              <div className="text-xs text-gray-600 mt-2">{majorDesc.title}</div>
            </div>

            {/* Minor Muscle */}
            <div 
              className="bg-white p-4 rounded-lg text-center cursor-pointer hover:shadow-lg transition-shadow relative group"
              onClick={() => setSelectedInfo('minor')}
            >
              <div className="absolute top-2 right-2">
                <Info className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
              </div>
              <div className="text-3xl mb-2">{minorDesc.icon}</div>
              <div className="text-xs text-gray-500 mb-1">보조 엔진</div>
              <div className="font-bold text-gray-800">{minorDesc.name}</div>
              <div className="text-xs text-gray-600 mt-2">{minorDesc.title}</div>
            </div>
          </div>

          {/* Info Modal */}
          <AnimatePresence>
            {selectedInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-4 p-4 bg-white rounded-lg border-2 border-purple-300 shadow-lg"
                onClick={() => setSelectedInfo(null)}
              >
                {selectedInfo === 'root' && (
                  <>
                    <h4 className="font-bold text-purple-600 mb-2">{rootDesc.icon} {rootDesc.name}</h4>
                    <p className="text-sm text-gray-700 mb-2">{rootDesc.description}</p>
                    <div className="text-xs text-gray-600">
                      <p><strong>강점:</strong> {rootDesc.strength}</p>
                      <p><strong>약점:</strong> {rootDesc.weakness}</p>
                    </div>
                  </>
                )}
                {selectedInfo === 'major' && (
                  <>
                    <h4 className="font-bold text-purple-600 mb-2">{majorDesc.icon} {majorDesc.name}</h4>
                    <p className="text-sm text-gray-700 mb-2">{majorDesc.description}</p>
                    <div className="text-xs text-gray-600">
                      <p><strong>강점:</strong> {majorDesc.strength}</p>
                      <p><strong>약점:</strong> {majorDesc.weakness}</p>
                    </div>
                  </>
                )}
                {selectedInfo === 'minor' && (
                  <>
                    <h4 className="font-bold text-purple-600 mb-2">{minorDesc.icon} {minorDesc.name}</h4>
                    <p className="text-sm text-gray-700 mb-2">{minorDesc.description}</p>
                    <div className="text-xs text-gray-600">
                      <p><strong>강점:</strong> {minorDesc.strength}</p>
                      <p><strong>약점:</strong> {minorDesc.weakness}</p>
                    </div>
                  </>
                )}
                <p className="text-xs text-gray-400 mt-2 text-center">클릭하여 닫기</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 p-6 bg-white/80 rounded-lg space-y-4">
            <p className="text-base text-gray-800 leading-relaxed">
              <strong className="text-purple-600">{rootDesc.title}</strong> 태도를 바탕으로,
              <strong className="text-purple-600"> {majorDesc.title}</strong>을(를) 주무기로 사용하며,
              필요할 때 <strong className="text-purple-600">{minorDesc.title}</strong>을(를) 보조로 활용하는 창업가입니다.
            </p>
            
            <div className="border-l-4 border-purple-400 pl-4 space-y-2">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-800">• 기본 태도:</span> {rootDesc.description}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-800">• 주력 엔진:</span> {majorDesc.description}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-800">• 보조 엔진:</span> {minorDesc.description}
              </p>
            </div>
            
            <p className="text-sm text-gray-600 italic text-center pt-2">
              이 조합이 만드는 시너지가 당신만의 고유한 창업가 DNA입니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
