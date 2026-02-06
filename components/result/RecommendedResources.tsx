'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RootType, MuscleType } from '@/types';
import { motion } from 'framer-motion';
import { BookOpen, Video, Users, Lightbulb } from 'lucide-react';

interface RecommendedResourcesProps {
  rootDominance: RootType;
  weakestMuscle: MuscleType;
}

const ROOT_RESOURCES: Record<RootType, { books: string[]; mentors: string[]; communities: string[] }> = {
  MIND: {
    books: [
      '《성장 마인드셋》 by 캐럴 드웩 - 배움에 대한 태도',
      '《겸손한 리더십》 by 에드거 샤인 - 겸손이 힘인 이유',
      '《데이터 기반 의사결정》 - 객관적 판단력 키우기',
    ],
    mentors: [
      '실패를 인정하고 배운 경험이 많은 시니어 창업가',
      '끊임없이 학습하는 모습을 보이는 멘토',
    ],
    communities: [
      '스타트업 학습 커뮤니티',
      '독서 모임',
      '피드백을 적극적으로 주고받는 그룹',
    ],
  },
  WILL: {
    books: [
      '《그릿》 by 앤절라 더크워스 - 끈기의 힘',
      '《불굴의 의지》 - 포기하지 않는 법',
      '《틀을 깨는 사고》 - 장애물을 돌파하는 방법',
    ],
    mentors: [
      '여러 번의 실패를 극복한 연쇄 창업가',
      '높은 추진력을 가진 리더',
    ],
    communities: [
      '고강도 창업 부트캠프',
      '목표 달성 챌린지 그룹',
      '액션 중심의 창업가 모임',
    ],
  },
  HEART: {
    books: [
      '《공감의 힘》 by 브레네 브라운 - 진정성 있는 리더십',
      '《고객의 마음을 읽는 법》 - 고객 중심 사고',
      '《섬기는 리더》 - 팀을 위한 리더십',
    ],
    mentors: [
      '팀 문화를 중요시하는 리더',
      '고객과의 깊은 관계를 만든 창업가',
    ],
    communities: [
      '소셜 임팩트 창업가 네트워크',
      '고객 경험 디자인 커뮤니티',
      '사회적 가치 중심 모임',
    ],
  },
};

const MUSCLE_RESOURCES: Record<MuscleType, { courses: string[]; tools: string[]; practices: string[] }> = {
  HEAD: {
    courses: [
      '전략적 사고 워크샵',
      '데이터 분석 부트캠프',
      '비즈니스 모델 설계 과정',
    ],
    tools: [
      'Google Analytics - 데이터 분석',
      'Notion - 생각 구조화',
      'Miro - 전략 맵핑',
    ],
    practices: [
      '매일 30분 산업 리포트 읽기',
      '주 1회 경쟁사 분석',
      '월 1회 전략 리뷰 회의',
    ],
  },
  HAND: {
    courses: [
      'Lean Startup 실전 과정',
      'MVP 빌딩 워크샵',
      '빠른 프로토타이핑 트레이닝',
    ],
    tools: [
      'Figma - 빠른 프로토타입',
      'Notion - 실행 체크리스트',
      'Linear - 애자일 관리',
    ],
    practices: [
      '주 1개 MVP 테스트',
      '매일 1개 실험 실행',
      '실패 일지 작성',
    ],
  },
  SOUL: {
    courses: [
      '스토리텔링 마스터클래스',
      '리더십 코칭 프로그램',
      '위기관리 워크샵',
    ],
    tools: [
      'Calm - 명상 앱',
      'Headspace - 멘탈 관리',
      'LinkedIn - 네트워킹',
    ],
    practices: [
      '매일 팀원과 1:1 대화',
      '주 1회 팀 회고',
      '월 1회 비전 공유 세션',
    ],
  },
};

export function RecommendedResources({ rootDominance, weakestMuscle }: RecommendedResourcesProps) {
  const rootRes = ROOT_RESOURCES[rootDominance];
  const muscleRes = MUSCLE_RESOURCES[weakestMuscle];

  return (
    <div className="space-y-6">
      {/* 추천 도서 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <BookOpen className="w-5 h-5" />
              추천 도서
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              당신의 {ROOT_RESOURCES[rootDominance] ? '태도' : '역량'}를 더욱 발전시킬 책들입니다.
            </p>
            <ul className="space-y-3">
              {rootRes.books.map((book, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <span className="text-indigo-600 font-bold mt-1">📚</span>
                  <span className="text-gray-700">{book}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* 보완 역량 개발 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <Video className="w-5 h-5" />
              약점 보완 프로그램
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              약한 영역인 <strong>{MUSCLE_RESOURCES[weakestMuscle] ? 'HEAD/HAND/SOUL' : ''}</strong>을 키우기 위한 추천 프로그램입니다.
            </p>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                추천 코스
              </h4>
              <ul className="space-y-2">
                {muscleRes.courses.map((course, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-orange-600">•</span>
                    <span className="text-gray-700">{course}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">🛠 추천 도구</h4>
              <ul className="space-y-2">
                {muscleRes.tools.map((tool, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-orange-600">•</span>
                    <span className="text-gray-700">{tool}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">📅 일상 실천</h4>
              <ul className="space-y-2">
                {muscleRes.practices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-orange-600">•</span>
                    <span className="text-gray-700">{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 추천 네트워크 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Users className="w-5 h-5" />
              추천 네트워크
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">👥 찾아야 할 멘토</h4>
              <ul className="space-y-2">
                {rootRes.mentors.map((mentor, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600">•</span>
                    <span className="text-gray-700">{mentor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">🌐 추천 커뮤니티</h4>
              <ul className="space-y-2">
                {rootRes.communities.map((community, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600">•</span>
                    <span className="text-gray-700">{community}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
