SheVentures DNA Diagnosis Project Rules

이 문서는 '쉬벤처스 창업가 DNA 진단(SheVentures Founder DNA Test)' 프로젝트의 프론트엔드 및 백엔드 개발 규칙을 정의합니다.
SheVentures_Test_Page_Spec.md의 기획 의도와 로직을 정확히 구현하는 것을 목표로 합니다.

1. 프론트엔드 개발 규칙 (Frontend Rules)

1.1. 기술 스택 및 스타일링

Framework: Next.js 14+ (App Router)

Language: TypeScript (Strict Mode)

Styling: Tailwind CSS, src/app/globals.css

UI Component: shadcn/ui 라이브러리 기반

설문 카드: Card, Carousel (슬라이드 형태)

진행률: Progress (애니메이션 포함)

입력: RadioGroup, Button

Animation: framer-motion (문항 전환 및 결과 그래프 애니메이션 필수)

Visualization: recharts (7각 레이더 차트)

1.2. 폴더 구조

src/
├── app/
│   ├── page.tsx (랜딩)
│   ├── quiz/page.tsx (진단)
│   ├── result/[id]/page.tsx (결과 리포트)
│   └── api/ (Next.js API Routes)
├── components/
│   ├── ui/ (shadcn 기본)
│   ├── quiz/ (QuizProgress, QuestionCard)
│   ├── result/ (ResultHeader, RadarChart, ActionPlan)
│   └── shared/ (SEOHead, ShareButton)
├── lib/
│   ├── firebase.ts (클라이언트 SDK)
│   ├── firebase-admin.ts (서버 SDK)
│   └── logic.ts (진단 알고리즘 - 순수 함수)
├── constants/
│   ├── questions.ts (84문항 DB)
│   └── archetypes.ts (27개 유형 DB)
└── types/
    └── index.ts (공통 타입 정의)


1.3. 상태 관리 및 로직 (State & Logic)

상태 관리: Zustand 사용

Persist Middleware 필수: 사용자가 도중에 새로고침해도 응답 데이터가 날아가지 않도록 localStorage에 자동 저장.

진단 로직 분리:

UI 컴포넌트 내에 비즈니스 로직 작성 금지. 반드시 /lib/logic.ts에 순수 함수로 작성.

필수 구현 함수:

calculateRootScores(answers): MIND, WILL, HEART 점수 산출

calculateMuscleScores(answers): HEAD, HAND, SOUL 점수 산출 (BODY 통합 로직 적용)

determineMicroArchetype(roots, muscles): 주력/보조 엔진 기반 27개 유형 매칭

1.4. 결과 페이지 및 SEO (중요)

Dynamic OG Image: @vercel/og를 사용하여 결과 페이지 URL 공유 시, 해당 유형(예: "스마트 전차")의 이름과 이미지가 포함된 썸네일을 동적으로 생성해야 함.

이미지 저장: html2canvas를 사용하여 결과 리포트 영역을 이미지로 다운로드하는 기능 구현.

2. 백엔드 개발 규칙 (Backend Rules)

2.1. 아키텍처 및 DB

Serverless: Next.js API Routes 사용

Database: Firebase Firestore

컬렉션: diagnosis_results

Validation: Zod 라이브러리 사용

API 요청 데이터(body)가 스키마와 일치하는지 반드시 검증 후 DB 저장.

2.2. 데이터 스키마 (Firestore & Types)

// types/index.ts
export interface DiagnosisData {
  id: string; // UUID
  createdAt: string; // ISO String
  userInfo?: {
    name?: string;
    email?: string;
    startupStage?: 'seed' | 'pre-a' | 'series-a';
  };
  scores: {
    root: { MIND: number; WILL: number; HEART: number };
    muscle: { HEAD: number; HAND: number; SOUL: number };
  };
  result: {
    archetypeId: string; // 예: "will_hand_head"
    archetypeName: string; // 예: "Smart Tank"
    rootDominance: string; 
    majorMuscle: string;
    minorMuscle: string;
    level: "LIGHT" | "SHADOW";
  };
  rawAnswers: number[]; // 1~5 사이의 정수 배열 (길이 84)
}


2.3. API 엔드포인트 규칙

POST /api/diagnosis: 진단 제출 및 저장

Input: answers (배열), userInfo (선택)

Process: 백엔드에서 다시 한번 점수 계산(검증) 후 DB 저장

Output: { id: string, result: DiagnosisData['result'] }

GET /api/diagnosis/[id]: 결과 조회 (공유용)

3. 핵심 비즈니스 로직 (Core Logic Requirements)

SheVentures_Test_Page_Spec_Micro.md 기준

역채점 (Reverse Coding): 지정된 인덱스는 반드시 6 - 점수로 변환.

3대 엔진 통합: 문항 61~84번은 모두 SOUL 점수로 통합 계산 (평균).

마이크로 유형 판별 (27 Types):

Root (1위) + Major Muscle (1위) + Minor Muscle (2위) 조합.

단, Major와 Minor 점수 차가 0.3점 미만이거나 Major가 4.5점 이상인 예외 케이스 처리 로직 포함.

성숙도 기준: Major Muscle 점수 4.2점 기준 분기.

4. 테스트 및 품질 관리 (QA Rules)

4.1. 단위 테스트 (Unit Testing) - 필수

Vitest 또는 Jest 사용.

84문항 입력에 대해 27가지 유형이 정확히 나오는지 검증하는 테스트 코드 작성 필수.

이유: 경우의 수가 많아 수동 테스트 불가능.

src/lib/logic.test.ts 파일 생성.

4.2. 에러 핸들링

사용자가 문항을 건너뛰었을 때의 방어 로직.

API 호출 실패 시 로컬 스토리지 데이터를 활용한 '재시도' UI 제공.

5. Cursor 작업 가이드 (Step-by-Step)

Setup: 프로젝트 생성 및 shadcn, zustand, zod, vitest 설치.

Data: constants/questions.ts에 84문항 DB 구축.

Logic & Test: lib/logic.ts 구현 후 반드시 테스트 코드(logic.test.ts) 통과 확인.

Frontend: Zustand 스토어 구축 -> Quiz UI 구현 (framer-motion 적용).

Backend: Firebase 연결 -> API 구현 -> Zod 검증 적용.

Result: 결과 페이지 차트 및 동적 콘텐츠 바