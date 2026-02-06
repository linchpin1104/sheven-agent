'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Target, TrendingUp } from 'lucide-react';

export function NextSteps() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.5 }}
    >
      <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-900">
            <Target className="w-6 h-6" />
            지금 바로 실행할 수 있는 다음 단계
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 30일 플랜 */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              30일 액션 플랜
            </h3>
            
            <div className="space-y-4">
              {/* Week 1 */}
              <div className="bg-white p-4 rounded-lg border border-teal-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    1주차
                  </span>
                  <h4 className="font-semibold text-gray-800">자기 인식 높이기</h4>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>진단 결과를 팀원/동료와 공유하고 피드백 받기</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>약점으로 나온 영역에 대한 추천 도서 1권 구매하기</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>성장 일지 시작하기 (매일 5분씩 회고)</span>
                  </li>
                </ul>
              </div>

              {/* Week 2-3 */}
              <div className="bg-white p-4 rounded-lg border border-teal-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    2-3주차
                  </span>
                  <h4 className="font-semibold text-gray-800">약점 보완 시작</h4>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>약점 영역 관련 온라인 코스 1개 수강 시작</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>해당 영역의 멘토 찾아 커피챗 요청하기</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>작은 실험 1개 실행하여 새로운 접근 시도</span>
                  </li>
                </ul>
              </div>

              {/* Week 4 */}
              <div className="bg-white p-4 rounded-lg border border-teal-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    4주차
                  </span>
                  <h4 className="font-semibold text-gray-800">리뷰 및 조정</h4>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>30일간의 변화를 측정하고 기록하기</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>진단을 다시 받아 변화 확인하기</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span>다음 30일 플랜 수립하기</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 즉시 실행 가능한 액션 */}
          <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              오늘 당장 할 수 있는 3가지
            </h3>
            
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">결과 공유하기</h4>
                    <p className="text-sm text-gray-600">
                      공동 창업자나 팀원에게 이 결과를 공유하고, 서로의 유형을 이해하며 협업 방식 개선하기
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">액션 플랜 캘린더에 추가</h4>
                    <p className="text-sm text-gray-600">
                      위의 30일 플랜을 캘린더에 구체적인 날짜와 함께 입력하기 (알람 설정!)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">약점 보완 시작</h4>
                    <p className="text-sm text-gray-600">
                      약점으로 나온 영역의 추천 도서나 코스 중 1개를 선택하여 오늘 바로 시작하기
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600 mb-4">
              💡 <strong>Tip:</strong> 한 번에 모든 걸 바꾸려 하지 마세요. 
              작은 변화들이 모여 큰 성장을 만듭니다.
            </p>
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
            >
              📄 액션 플랜 인쇄하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
