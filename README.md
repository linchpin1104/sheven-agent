# 쉬벤처스 창업가 DNA 진단 (SheVentures Founder DNA Test)

당신의 창업가 유형을 발견하세요! 3가지 뿌리(MIND, WILL, HEART)와 3가지 엔진(HEAD, HAND, SOUL)의 조합으로 27가지 마이크로 유형을 정밀하게 분석합니다.

## 🚀 주요 기능

- **84문항 진단**: 정밀한 창업가 DNA 분석
- **27가지 유형**: Root + Major Muscle + Minor Muscle 조합
- **실시간 진행률**: 답변 진행 상황 실시간 표시
- **레이더 차트**: 6가지 요인 시각화
- **상세 분석**: Root와 Muscle에 대한 깊이 있는 해석
- **점수 해석**: 각 영역별 수준 평가 및 설명
- **Light & Shadow 분석**: 강점과 약점 분석
- **성장 처방전**: 개인화된 액션 플랜
- **추천 자료**: 도서, 코스, 멘토, 커뮤니티 추천
- **30일 액션 플랜**: 단계별 실행 가이드
- **결과 공유**: 동적 OG 이미지 생성 및 공유
- **이미지 다운로드**: 결과 리포트 이미지 저장

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animation**: Framer Motion
- **Charts**: Recharts
- **State Management**: Zustand (with Persist Middleware)

### Backend
- **API**: Next.js API Routes (Serverless)
- **Database**: Firebase Firestore
- **Validation**: Zod
- **OG Image**: @vercel/og

### Testing
- **Framework**: Vitest
- **Coverage**: 48 test cases (진단 로직 검증)

## 📁 프로젝트 구조

```
sheven_agent/
├── app/
│   ├── page.tsx                    # 랜딩 페이지
│   ├── quiz/page.tsx               # 진단 페이지
│   ├── result/[id]/page.tsx        # 결과 페이지
│   └── api/
│       ├── diagnosis/route.ts      # 진단 제출 API
│       ├── diagnosis/[id]/route.ts # 결과 조회 API
│       └── og/route.tsx            # OG 이미지 생성 API
├── components/
│   ├── ui/                         # shadcn/ui 컴포넌트
│   ├── quiz/                       # 진단 관련 컴포넌트
│   │   ├── QuizProgress.tsx
│   │   └── QuestionCard.tsx
│   └── result/                     # 결과 관련 컴포넌트
│       ├── ResultHeader.tsx
│       ├── ResultSummary.tsx
│       ├── RadarChart.tsx
│       ├── DetailedAnalysis.tsx
│       ├── ActionPlan.tsx
│       ├── RecommendedResources.tsx
│       └── NextSteps.tsx
├── lib/
│   ├── logic.ts                    # 진단 알고리즘 (순수 함수)
│   ├── logic.test.ts               # 진단 로직 테스트
│   ├── store.ts                    # Zustand 스토어
│   ├── validation.ts               # Zod 스키마
│   └── firebase/
│       ├── firebase.ts             # Firebase 클라이언트 SDK
│       └── firebase-admin.ts       # Firebase Admin SDK
├── constants/
│   ├── questions.ts                # 84문항 데이터베이스
│   ├── archetypes.ts               # 27개 유형 데이터베이스
│   └── descriptions.ts             # Root/Muscle 상세 설명
└── types/
    └── index.ts                    # 공통 타입 정의
```

## 🔧 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```env
# Firebase 클라이언트 설정
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}

# Base URL (프로덕션 배포 시)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 테스트 실행

```bash
npm test
```

### 5. 프로덕션 빌드

```bash
npm run build
npm start
```

## 🧪 테스트

진단 로직의 정확성을 보장하기 위해 48개의 테스트 케이스를 작성했습니다:

- ✅ 역채점 로직 검증
- ✅ 점수 계산 검증
- ✅ 27가지 유형 매칭 검증
- ✅ 성숙도 레벨 판정 검증
- ✅ 입력 검증 테스트
- ✅ 실제 시나리오 테스트

```bash
npm test
```

## 📊 진단 로직

### 1. 점수 계산

#### ROOT (태도) 점수
- **MIND (성품)**: 문항 1~12 평균
- **WILL (의지)**: 문항 13~24 평균
- **HEART (마음)**: 문항 25~36 평균

#### MUSCLE (역량) 점수
- **HEAD (지혜)**: 문항 37~48 평균
- **HAND (야성)**: 문항 49~60 평균
- **SOUL (장악)**: 문항 61~84 평균 (BODY + SOUL 통합)

### 2. 역채점

지정된 문항은 `6 - 점수`로 변환됩니다.

### 3. 유형 결정

1. **Dominant Root**: MIND, WILL, HEART 중 최댓값 (동점 시 WILL > MIND > HEART)
2. **Major Muscle**: HEAD, HAND, SOUL 중 최댓값
3. **Minor Muscle**: 주력을 제외한 나머지 중 최댓값
4. **Level**: Major Muscle 점수 >= 4.2 → LIGHT, < 4.2 → SHADOW

### 4. 27가지 유형

Root (3) × Major Muscle (3) × Minor Muscle (3) = 27가지 조합

## 🎨 UI/UX 특징

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **애니메이션**: Framer Motion으로 부드러운 전환 효과
- **진행률 표시**: 실시간 답변 진행 상황
- **자동 저장**: 새로고침해도 답변 데이터 유지 (localStorage)
- **접근성**: 키보드 네비게이션 지원

## 🔒 데이터 보안

- Firebase Security Rules 적용 권장
- 민감한 정보는 환경 변수로 관리
- API 요청 시 Zod 검증

## 📱 배포

> 📖 **상세 배포 가이드**: [DEPLOYMENT.md](./DEPLOYMENT.md) 참고

### 빌드 전 체크리스트

```bash
# 전체 검사 (타입 체크 + 린트 + 테스트)
npm run check

# 프로덕션 빌드
npm run build
```

### Vercel 배포 (권장)

#### GitHub 연동 배포
1. [Vercel Dashboard](https://vercel.com/dashboard)에 로그인
2. "Import Project" → GitHub 저장소 선택
3. 환경 변수 설정 (아래 참고)
4. "Deploy" 클릭

#### CLI 배포
```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel --prod
```

### 환경 변수 설정

Vercel Dashboard > Settings > Environment Variables에서 설정:

#### 필수 환경 변수
```env
# Firebase 클라이언트 (7개)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin SDK (중요!)
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

> 📝 **참고**: `env.production.example` 파일 참고

### Firebase 없이 배포하기

Firebase 설정 없이도 배포 가능합니다 (개발/테스트용):
- ✅ 빌드 성공
- ✅ 퀴즈 작동
- ⚠️ 결과가 메모리에만 저장 (서버 재시작 시 삭제)
- 🚨 프로덕션에서는 Firebase 필수

### 배포 확인

```bash
# 로컬에서 프로덕션 빌드 테스트
npm run build
npm run start
```

체크리스트:
- [ ] 랜딩 페이지 로딩
- [ ] 퀴즈 84문항 작동
- [ ] 키보드 입력 (1-5, 방향키, Enter)
- [ ] 결과 제출 성공
- [ ] 결과 페이지 표시
- [ ] OG 이미지 생성

## 🤝 기여

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

© 2026 SheVentures. All rights reserved.

## 🙏 감사의 말

이 프로젝트는 쉬벤처스의 창업가 DNA 진단 기획 명세서를 기반으로 개발되었습니다.

---

**Made with ❤️ by SheVentures**
