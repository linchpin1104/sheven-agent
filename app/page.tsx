'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center space-y-4 pb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                쉬벤처스 창업가 DNA 진단
              </CardTitle>
            </motion.div>
            <CardDescription className="text-lg text-gray-600">
              당신의 창업가 유형을 발견하세요
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4 text-gray-700"
            >
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-purple-900">
                  🧬 27가지 마이크로 유형 분석
                </h3>
                <p className="text-sm leading-relaxed">
                  3가지 뿌리(MIND, WILL, HEART)와 3가지 엔진(HEAD, HAND, SOUL)의 조합으로
                  당신만의 창업가 DNA를 정밀하게 분석합니다.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">⏱️</span>
                    <h4 className="font-semibold">소요 시간</h4>
                  </div>
                  <p className="text-sm text-gray-600">약 10-15분</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📊</span>
                    <h4 className="font-semibold">문항 수</h4>
                  </div>
                  <p className="text-sm text-gray-600">총 84문항</p>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-900">
                  <strong>💡 Tip:</strong> 솔직하게 답변할수록 정확한 결과를 얻을 수 있습니다.
                  정답은 없으니 편안하게 응답해주세요.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                onClick={() => router.push('/quiz')}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                진단 시작하기 →
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          © 2026 SheVentures. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}
