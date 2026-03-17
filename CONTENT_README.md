# 📚 콘텐츠 데이터베이스 사용 가이드

## 📁 파일 개요

- **파일명**: `CONTENT_DATABASE.json`
- **크기**: 120KB
- **포함 내용**: 
  - ✅ Root (기본 태도) 3개
  - ✅ Muscle (역량 엔진) 3개
  - ✅ Archetype (마이크로 유형) 27개

---

## 🎯 JSON 구조

```json
{
  "metadata": { ... },           // 메타데이터
  "roots": { ... },               // Root 설명 (MIND, WILL, HEART)
  "muscles": { ... },             // Muscle 설명 (HEAD, HAND, SOUL)
  "archetypes": [ ... ],          // 27개 유형 전체
  "usageGuide": { ... }           // 사용 가이드
}
```

### Archetype 객체 구조

```json
{
  "key": "WILL_HAND_HEAD",              // 유형 키
  "id": "smart_tank",                   // 유형 ID
  "name": "Smart Tank",                 // 영문명
  "alias": "스마트 전차",                // 한글명
  "subtitle": "약점을 알고 들이받는...", // 부제
  "oneliner": "무작정 돌진하지...",     // 한줄 설명
  "description": "불굴의 의지를...",    // DNA 설명
  "light": "당신의 가장 큰 강점은...", // 강점 (Light)
  "shadow": "하지만 이 조합은...",     // 약점 (Shadow)
  "action": "**왜 타이밍 판단...",     // 실행 가이드
  "reflectionQuestions": [ ... ],       // 성찰 질문 3개
  "rootDominance": "WILL",              // 지배적 Root
  "majorMuscle": "HAND",                // 주력 Muscle
  "minorMuscle": "HEAD"                 // 보조 Muscle
}
```

---

## 🛠️ 사용 방법

### 1. JSON 뷰어로 열기

**VS Code에서**:
```bash
code CONTENT_DATABASE.json
```

**온라인 JSON 뷰어**:
- https://jsonformatter.org/
- https://jsoneditoronline.org/

### 2. 특정 유형 검색

**터미널에서**:
```bash
# "스마트 전차" 검색
cat CONTENT_DATABASE.json | grep -A 20 "스마트 전차"

# "WILL" 기반 유형만 검색
cat CONTENT_DATABASE.json | grep -A 3 '"rootDominance": "WILL"'
```

**Python으로**:
```python
import json

with open('CONTENT_DATABASE.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# "스마트 전차" 찾기
for archetype in data['archetypes']:
    if archetype['alias'] == '스마트 전차':
        print(json.dumps(archetype, ensure_ascii=False, indent=2))
```

**JavaScript로**:
```javascript
const data = require('./CONTENT_DATABASE.json');

// "스마트 전차" 찾기
const smartTank = data.archetypes.find(a => a.alias === '스마트 전차');
console.log(smartTank);
```

### 3. 내용 수정하기

1. **JSON 파일에서 직접 수정**
   ```bash
   code CONTENT_DATABASE.json
   ```

2. **수정 후 TypeScript 파일에 반영**
   - `constants/archetypes.ts` 파일을 열고
   - 수정한 내용을 복사하여 붙여넣기

3. **검증**
   ```bash
   npm run type-check
   npm run lint
   npm run test:run
   ```

---

## 📊 전체 유형 목록

### WILL 기반 (9개)

| # | Key | 한글명 | 영문명 |
|---|-----|--------|--------|
| 1 | WILL_HAND_HEAD | 스마트 전차 | Smart Tank |
| 2 | WILL_HAND_SOUL | 지휘관 | Commander |
| 3 | WILL_HAND_HAND | 폭주기관차 | Mad Max |
| 4 | WILL_HEAD_HAND | 전략가 | Strategist |
| 5 | WILL_HEAD_SOUL | 비전가 | Visionary |
| 6 | WILL_HEAD_HEAD | 마스터마인드 | Mastermind |
| 7 | WILL_SOUL_HAND | 영향력자 | Influencer |
| 8 | WILL_SOUL_HEAD | 카리스마 리더 | Charismatic Leader |
| 9 | WILL_SOUL_SOUL | 타고난 리더 | Natural Leader |

### MIND 기반 (9개)

| # | Key | 한글명 | 영문명 |
|---|-----|--------|--------|
| 10 | MIND_HEAD_HAND | 현명한 실행자 | Wise Executor |
| 11 | MIND_HEAD_SOUL | 겸손한 현자 | Humble Sage |
| 12 | MIND_HEAD_HEAD | 영원한 학습자 | Eternal Learner |
| 13 | MIND_HAND_HEAD | 민첩한 학습자 | Agile Learner |
| 14 | MIND_HAND_SOUL | 겸손한 실행자 | Humble Doer |
| 15 | MIND_HAND_HAND | 겸손한 허슬러 | Humble Hustler |
| 16 | MIND_SOUL_HEAD | 공감하는 사색가 | Empathetic Thinker |
| 17 | MIND_SOUL_HAND | 섬기는 리더 | Servant Leader |
| 18 | MIND_SOUL_SOUL | 겸손한 연결자 | Humble Connector |

### HEART 기반 (9개)

| # | Key | 한글명 | 영문명 |
|---|-----|--------|--------|
| 19 | HEART_HEAD_HAND | 열정적인 빌더 | Passionate Builder |
| 20 | HEART_HEAD_SOUL | 공감하는 전략가 | Empathetic Strategist |
| 21 | HEART_HEAD_HEAD | 고객 과학자 | Customer Scientist |
| 22 | HEART_HAND_HEAD | 고객 챔피언 | Customer Champion |
| 23 | HEART_HAND_SOUL | 미션 중심 실행자 | Mission-Driven Doer |
| 24 | HEART_HAND_HAND | 열정적인 허슬러 | Passionate Hustler |
| 25 | HEART_SOUL_HEAD | 영감을 주는 사색가 | Inspiring Thinker |
| 26 | HEART_SOUL_HAND | 사람을 움직이는 자 | People Mover |
| 27 | HEART_SOUL_SOUL | 공감의 자석 | Empathetic Magnet |

---

## ✏️ 콘텐츠 수정 가이드

### Light (강점) 수정 시

```json
"light": "당신의 가장 큰 강점은 \"X\"와 \"Y\"의 조합입니다.\n\n[구체적 설명]\n\n**실제로 이런 일이 자주 일어납니다:**\n• [예시 1]\n• [예시 2]\n• [예시 3]\n\n[시너지 효과 설명]"
```

### Shadow (약점) 수정 시

```json
"shadow": "하지만 [대조적 상황]입니다.\n\n[구체적 설명]\n\n**이런 상황들을 경험하고 있을 가능성이 높습니다:**\n• [예시 1]\n• [예시 2]\n• [예시 3]\n\n가장 위험한 것은 **[핵심 약점]**입니다."
```

### Action (실행 가이드) 수정 시

```json
"action": "**왜 [주제]가 필요한가?**\n\n[이유 설명]\n\n**구체적인 실행 가이드:**\n\n**1. [제목]**\n   - [설명 1]\n   - [설명 2]\n\n[2-5번 반복]\n\n**기억하세요:** [마무리 문장]"
```

---

## 🚀 배포 프로세스

```bash
# 1. 콘텐츠 수정
code CONTENT_DATABASE.json

# 2. TypeScript 파일에 반영
# constants/archetypes.ts 수정

# 3. 검증
npm run type-check
npm run lint
npm run test:run

# 4. 빌드
npm run build

# 5. Git 커밋
git add -A
git commit -m "content: Update archetype descriptions"
git push origin main

# 6. Vercel 배포
vercel --prod --yes
```

---

## 💡 유용한 명령어

### 특정 필드만 추출

```bash
# 모든 alias만 추출
cat CONTENT_DATABASE.json | jq '.archetypes[].alias'

# 모든 light 내용 추출
cat CONTENT_DATABASE.json | jq '.archetypes[].light'

# 특정 유형의 모든 정보
cat CONTENT_DATABASE.json | jq '.archetypes[] | select(.alias == "스마트 전차")'
```

### 통계

```bash
# 각 Root별 유형 수
cat CONTENT_DATABASE.json | jq '[.archetypes[].rootDominance] | group_by(.) | map({root: .[0], count: length})'

# Light 평균 길이
cat CONTENT_DATABASE.json | jq '[.archetypes[].light | length] | add / length'
```

---

## 🔍 문제 해결

### JSON 유효성 검사

```bash
# JSON 문법 확인
cat CONTENT_DATABASE.json | jq . > /dev/null && echo "✅ Valid JSON" || echo "❌ Invalid JSON"
```

### 누락된 필드 확인

```bash
# reflectionQuestions가 없는 유형 찾기
cat CONTENT_DATABASE.json | jq '.archetypes[] | select(.reflectionQuestions == null) | .alias'
```

---

**마지막 업데이트**: 2026-02-07  
**버전**: 1.0.0  
**문의**: CONTENT_DATABASE.json 파일을 직접 수정하거나 issue를 등록해주세요.
