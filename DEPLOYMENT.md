# 🚀 배포 가이드

## 목차
1. [Vercel 배포](#vercel-배포)
2. [Firebase 설정](#firebase-설정)
3. [환경 변수 설정](#환경-변수-설정)
4. [배포 확인](#배포-확인)
5. [트러블슈팅](#트러블슈팅)

---

## Vercel 배포

### 1. Vercel CLI 설치 (선택사항)
```bash
npm install -g vercel
```

### 2. Vercel에 배포

#### 방법 A: GitHub 연동 (추천)
1. [Vercel Dashboard](https://vercel.com/dashboard)에 로그인
2. "Import Project" 클릭
3. GitHub 저장소 선택: `linchpin1104/sheven-agent`
4. 환경 변수 설정 (아래 섹션 참고)
5. "Deploy" 클릭

#### 방법 B: CLI로 배포
```bash
# 로그인
vercel login

# 배포
vercel --prod
```

---

## Firebase 설정

### 1. Firebase 프로젝트 생성
1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: `sheven-agent`)
4. Google Analytics 설정 (선택사항)

### 2. Firestore Database 생성
1. Firebase Console > 빌드 > Firestore Database
2. "데이터베이스 만들기" 클릭
3. **프로덕션 모드**로 시작
4. 위치 선택: `asia-northeast3 (Seoul)` 권장

### 3. 보안 규칙 설정
Firestore Database > 규칙 탭에서 아래 규칙 적용:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 진단 결과는 읽기만 가능 (공개 링크 공유용)
    match /diagnosis_results/{docId} {
      allow read: if true;
      allow write: if false; // API를 통해서만 작성
    }
  }
}
```

### 4. Firebase 클라이언트 설정 가져오기
1. Firebase Console > 프로젝트 설정 (⚙️)
2. "내 앱" > 웹 앱 추가 (</> 아이콘)
3. 앱 닉네임 입력 후 "앱 등록"
4. Firebase SDK 설정 정보 복사

### 5. Firebase Admin SDK 키 생성
1. Firebase Console > 프로젝트 설정 > 서비스 계정
2. "새 비공개 키 생성" 클릭
3. JSON 파일 다운로드
4. **⚠️ 중요**: 이 파일은 절대 Git에 커밋하지 마세요!

---

## 환경 변수 설정

### Vercel Dashboard에서 설정

1. Vercel Dashboard > 프로젝트 선택
2. Settings > Environment Variables
3. 아래 변수들을 추가:

#### Firebase 클라이언트 설정
| 변수명 | 설명 | 예시 |
|--------|------|------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API 키 | `AIzaSyXXXXXXX...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Auth 도메인 | `your-project.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | 프로젝트 ID | `your-project-id` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage 버킷 | `your-project.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging ID | `123456789012` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | 앱 ID | `1:123456789012:web:abcdef` |

#### Firebase Admin SDK (중요!)
| 변수명 | 설명 | 값 |
|--------|------|-----|
| `FIREBASE_SERVICE_ACCOUNT_KEY` | 서비스 계정 키 (JSON) | 다운로드한 JSON 파일 내용 전체를 **한 줄로** 복사 |

**JSON을 한 줄로 변환하는 방법:**
```bash
# macOS/Linux
cat your-service-account-key.json | jq -c

# 또는 수동으로
# JSON 파일 열기 → 전체 복사 → 줄바꿈 제거
```

### 환경별 설정
- **Development**: `.env.local` 파일 사용
- **Production**: Vercel Dashboard에서 설정
- **Preview**: Vercel이 자동으로 Production 환경 변수 사용

---

## 배포 확인

### 1. 빌드 성공 확인
```bash
npm run build
```

예상 결과:
```
✓ Compiled successfully
✓ Generating static pages
✓ Finalizing page optimization

Route (app)
├ ○ /
├ ○ /quiz
└ ƒ /result/[id]
```

### 2. 로컬에서 프로덕션 빌드 테스트
```bash
npm run build
npm run start
```

브라우저에서 `http://localhost:3000` 접속하여 테스트

### 3. 배포 후 확인사항
- [ ] 랜딩 페이지 로딩
- [ ] 퀴즈 페이지 작동 (84문항)
- [ ] 키보드 입력 작동 (1-5, 방향키, Enter)
- [ ] 결과 제출 성공
- [ ] 결과 페이지 표시 (DNA 분석, 차트)
- [ ] OG 이미지 생성 (결과 공유 시)

---

## 트러블슈팅

### ❌ Firebase 인증 오류
**증상**: `Could not load the default credentials`

**해결**:
1. Vercel 환경 변수에 `FIREBASE_SERVICE_ACCOUNT_KEY` 확인
2. JSON 형식이 올바른지 확인 (큰따옴표, 이스케이프 문자)
3. 서비스 계정에 Firestore 권한이 있는지 확인

### ❌ 빌드 실패
**증상**: `Type error` 또는 `ESLint error`

**해결**:
```bash
# 타입 체크
npm run type-check

# 린트 검사
npm run lint

# 테스트 실행
npm run test:run

# 전체 검사
npm run check
```

### ❌ Firestore 쓰기 권한 오류
**증상**: `Missing or insufficient permissions`

**해결**:
1. Firebase Console > Firestore Database > 규칙
2. 위의 보안 규칙 적용
3. "게시" 클릭

### ❌ 환경 변수가 적용되지 않음
**증상**: 클라이언트에서 `undefined` 반환

**해결**:
1. 클라이언트 환경 변수는 반드시 `NEXT_PUBLIC_` 접두사 필요
2. Vercel에서 환경 변수 수정 후 **재배포** 필요
3. 브라우저 캐시 삭제 후 재테스트

### 📝 메모리 저장소 모드
Firebase 설정 없이도 배포 가능합니다 (개발/테스트용):
- 진단 결과가 메모리에만 저장 (서버 재시작 시 삭제)
- 콘솔에 "📝 개발 모드: 메모리 저장소 사용" 메시지 출력
- 프로덕션에서는 반드시 Firebase 설정 필요

---

## 배포 플랫폼별 가이드

### Vercel (추천)
- ✅ Zero-config 배포
- ✅ Edge Functions 지원
- ✅ 자동 HTTPS
- ✅ Preview 배포
- 📖 [공식 문서](https://vercel.com/docs)

### Netlify
```bash
# netlify.toml 생성 필요
npm install -g netlify-cli
netlify deploy --prod
```

### AWS Amplify
1. AWS Console > Amplify
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 배포

---

## 성능 최적화

### 1. 이미지 최적화
- Next.js Image 컴포넌트 사용 중
- WebP 자동 변환
- Lazy loading 적용

### 2. 번들 크기 분석
```bash
npm run build -- --analyze
```

### 3. 캐싱 전략
- Static 페이지: `/`, `/quiz` (CDN 캐싱)
- Dynamic 페이지: `/result/[id]` (ISR 적용 가능)
- API Routes: 캐싱 없음

---

## 모니터링

### Vercel Analytics
1. Vercel Dashboard > Analytics
2. 자동으로 활성화됨
3. 페이지 로딩 속도, 방문자 수 확인

### Firebase Console
1. Firestore Database > 사용량
2. 일일 읽기/쓰기 횟수 모니터링
3. 무료 할당량: 50,000 읽기/20,000 쓰기 (일일)

---

## 도움이 필요하신가요?

- 📧 이슈: [GitHub Issues](https://github.com/linchpin1104/sheven-agent/issues)
- 📖 Next.js 문서: https://nextjs.org/docs
- 📖 Firebase 문서: https://firebase.google.com/docs
- 📖 Vercel 문서: https://vercel.com/docs
