import { Question } from '@/types';

export const QUESTIONS: Question[] = [
  // A. MIND (성품) [1~12]
  { id: 1, text: '내 실수나 잘못이 밝혀졌을 때 변명 없이 즉시 인정한다.', category: 'MIND', isReverse: false },
  { id: 2, text: '내 의견과 반대되는 명확한 데이터가 나오면, 내 주장을 철회한다.', category: 'MIND', isReverse: false },
  { id: 3, text: '내 생각에 확신이 있으면, 주변의 조언이나 데이터는 무시하는 편이다.', category: 'MIND', isReverse: true },
  { id: 4, text: '나보다 경험이 적은 사람에게도 배울 점이 있다면 기꺼이 배운다.', category: 'MIND', isReverse: false },
  { id: 5, text: '멘토나 동료의 따끔한 피드백을 감정적 비난이 아닌 성장의 기회로 받아들인다.', category: 'MIND', isReverse: false },
  { id: 6, text: '누군가 내 아이디어를 비판하면 나도 모르게 방어적으로 반응하게 된다.', category: 'MIND', isReverse: true },
  { id: 7, text: '성공의 원인을 나의 능력뿐만 아니라 운이나 동료 덕분으로 돌린다.', category: 'MIND', isReverse: false },
  { id: 8, text: '모르는 주제가 나오면 아는 척하기보다 솔직하게 "모른다"고 말한다.', category: 'MIND', isReverse: false },
  { id: 9, text: '나는 현재 내가 무엇을 알고 무엇을 모르는지 명확하게 구분할 수 있다.', category: 'MIND', isReverse: false },
  { id: 10, text: '나는 내 능력을 실제보다 조금 더 과장해서 표현하는 경향이 있다.', category: 'MIND', isReverse: true },
  { id: 11, text: '리더로서 나의 약점을 팀원들에게 솔직하게 공개하는 것이 두렵지 않다.', category: 'MIND', isReverse: false },
  { id: 12, text: '불편한 진실이라도 거짓된 위로보다는 낫다고 믿는다.', category: 'MIND', isReverse: false },

  // B. WILL (의지) [13~24]
  { id: 13, text: '나는 한번 목표를 세우면 장애물이 있어도 끝까지 완수한다.', category: 'WILL', isReverse: false },
  { id: 14, text: '프로젝트가 실패해도 포기하지 않고 배운 점을 찾아 다시 시도한다.', category: 'WILL', isReverse: false },
  { id: 15, text: '노력해도 결과가 안 나오면, 빨리 다른 길을 찾는 것이 현명하다고 생각한다.', category: 'WILL', isReverse: true },
  { id: 16, text: '문제가 생겼을 때 상황이나 남 탓을 하기보다 내가 해결할 방법을 찾는다.', category: 'WILL', isReverse: false },
  { id: 17, text: '누가 시키지 않아도 스스로 일을 찾아서 만들고 주도한다.', category: 'WILL', isReverse: false },
  { id: 18, text: '내 책임 범위 밖의 일에는 굳이 나서지 않으려 한다.', category: 'WILL', isReverse: true },
  { id: 19, text: '현재의 금전적 보상이 없더라도 이 일을 지속할 강력한 이유(Why)가 있다.', category: 'WILL', isReverse: false },
  { id: 20, text: '나는 이 문제를 해결하여 세상에 긍정적인 영향을 주고 싶다는 갈망이 있다.', category: 'WILL', isReverse: false },
  { id: 21, text: '솔직히 말해서, 창업의 가장 큰 목적은 경제적 부(돈)이다.', category: 'WILL', isReverse: true },
  { id: 22, text: '나는 편안한 안주보다는 고통스럽더라도 성장하는 도전을 즐긴다.', category: 'WILL', isReverse: false },
  { id: 23, text: '밤을 새워서라도 해결하고 싶은 난제가 있을 때 희열을 느낀다.', category: 'WILL', isReverse: false },
  { id: 24, text: '아무도 나를 지지해주지 않아도 혼자서라도 밀고 나갈 의지가 있다.', category: 'WILL', isReverse: false },

  // C. HEART (마음) [25~36]
  { id: 25, text: '나의 개인적 성공보다 우리 팀원들의 성장과 성공이 더 중요하다.', category: 'HEART', isReverse: false },
  { id: 26, text: '팀을 위해서라면 내가 손해를 보더라도 궂은일을 도맡아 한다.', category: 'HEART', isReverse: false },
  { id: 27, text: '리더라면 팀원들보다는 더 많은 스포트라이트를 받아야 한다고 생각한다.', category: 'HEART', isReverse: true },
  { id: 28, text: '회사의 이익과 고객의 문제 해결이 충돌할 때, 고객을 우선시한다.', category: 'HEART', isReverse: false },
  { id: 29, text: '책상에 앉아있는 시간보다 고객을 만나 그들의 이야기를 듣는 것을 선호한다.', category: 'HEART', isReverse: false },
  { id: 30, text: '고객의 피드백보다는 나의 직관과 아이디어가 더 중요하다고 믿는다.', category: 'HEART', isReverse: true },
  { id: 31, text: '최악의 위기 상황에서도, 결국에는 우리가 해낼 것이라는 믿음을 잃지 않는다.', category: 'HEART', isReverse: false },
  { id: 32, text: '팀원들이 지쳐 있을 때, 긍정적인 에너지를 불어넣는 역할을 한다.', category: 'HEART', isReverse: false },
  { id: 33, text: '상황이 안 좋아지면 최악의 시나리오부터 생각하며 불안해하는 편이다.', category: 'HEART', isReverse: true },
  { id: 34, text: '논리적 승패를 따지는 것보다, 사람의 마음을 얻는 것이 더 중요하다고 믿는다.', category: 'HEART', isReverse: false },
  { id: 35, text: '타인의 감정과 어려움을 내 것처럼 깊이 공감하고 느낀다.', category: 'HEART', isReverse: false },
  { id: 36, text: '경쟁자를 이기는 것보다, 우리만의 가치를 만드는 것에 더 집중한다.', category: 'HEART', isReverse: false },

  // D. HEAD (지혜) [37~48]
  { id: 37, text: '복잡한 문제를 만났을 때, 핵심 원인(Root Cause)을 한 문장으로 정의할 수 있다.', category: 'HEAD', isReverse: false },
  { id: 38, text: '서로 관련 없어 보이는 정보들을 연결하여 새로운 기회를 발견하곤 한다.', category: 'HEAD', isReverse: false },
  { id: 39, text: '복잡한 상황이 닥치면 머릿속이 하얘지고 정리가 잘 안 된다.', category: 'HEAD', isReverse: true },
  { id: 40, text: '문제를 해결할 때 감(Feel)보다는 구체적인 데이터와 근거를 찾는다.', category: 'HEAD', isReverse: false },
  { id: 41, text: '내 생각을 말이나 글로 표현할 때, 상대방이 이해하기 쉽게 구조화한다.', category: 'HEAD', isReverse: false },
  { id: 42, text: '설명하다 보면 나도 모르게 횡설수설하거나 요점을 놓칠 때가 있다.', category: 'HEAD', isReverse: true },
  { id: 43, text: '기존의 지식이 더 이상 유효하지 않을 때, 미련 없이 버리고(Unlearn) 새로 배운다.', category: 'HEAD', isReverse: false },
  { id: 44, text: '전혀 새로운 분야의 지식이나 툴(Tool)을 익히는 속도가 남들보다 빠르다.', category: 'HEAD', isReverse: false },
  { id: 45, text: '새로운 기술이나 방식을 배우는 것에 스트레스를 많이 받는다.', category: 'HEAD', isReverse: true },
  { id: 46, text: '현재 우리 비즈니스의 핵심 지표(KPI)와 성장 동력을 정확히 꿰뚫고 있다.', category: 'HEAD', isReverse: false },
  { id: 47, text: '시장의 거시적인 흐름(Trend)을 읽고 미래를 예측하는 시야가 있다.', category: 'HEAD', isReverse: false },
  { id: 48, text: '플랜 A가 막혔을 때, 논리적으로 타당한 플랜 B, C를 즉시 설계할 수 있다.', category: 'HEAD', isReverse: false },

  // E. HAND (야성) [49~60]
  { id: 49, text: '아이디어가 떠오르면 완벽한 계획을 짜기 전에 작게라도 시도(MVP)해 본다.', category: 'HAND', isReverse: false },
  { id: 50, text: '실패를 고민하며 주저하기보다, 빨리 실패하고 빨리 수정하는 쪽을 택한다.', category: 'HAND', isReverse: false },
  { id: 51, text: '준비가 완벽하지 않으면 시작하는 것을 꺼리는 편이다.', category: 'HAND', isReverse: true },
  { id: 52, text: '정보가 100% 확실하지 않은 상황(60~70%)에서도 과감하게 의사결정을 내린다.', category: 'HAND', isReverse: false },
  { id: 53, text: '결정에 따르는 책임과 비난을 두려워하지 않고 감수한다.', category: 'HAND', isReverse: false },
  { id: 54, text: '중요한 결정을 내려야 할 때, 자꾸 미루거나 남에게 의견을 묻게 된다.', category: 'HAND', isReverse: true },
  { id: 55, text: '가장 중요한 한 가지 목표를 위해, 좋아 보이는 다른 기회들을 과감히 포기한다.', category: 'HAND', isReverse: false },
  { id: 56, text: '업무를 할 때 방해 요소를 차단하고 무섭게 몰입하는 규율이 있다.', category: 'HAND', isReverse: false },
  { id: 57, text: '이것저것 관심사가 많아서 한 가지에 오랫동안 집중하기 어렵다.', category: 'HAND', isReverse: true },
  { id: 58, text: '자원이 부족하면 불평하는 대신, 가진 것만으로 어떻게든 해결책을 만들어낸다.', category: 'HAND', isReverse: false },
  { id: 59, text: '책상에서 고민하기보다 현장에 나가서 답을 찾는 것을 선호한다.', category: 'HAND', isReverse: false },
  { id: 60, text: '나는 생각과 행동 사이의 시차(Time lag)가 매우 짧은 편이다.', category: 'HAND', isReverse: false },

  // F. SOUL (장악 - 통합) [61~84]
  // 내공/회복탄력성 Sub-factor
  { id: 61, text: '큰 실패나 거절을 당해도, 며칠 내로 털어버리고 원래의 멘탈로 돌아온다.', category: 'SOUL', isReverse: false },
  { id: 62, text: '비즈니스적인 실패를 나의 인격적인 실패로 받아들이지 않고 분리한다.', category: 'SOUL', isReverse: false },
  { id: 63, text: '안 좋은 일이 생기면 며칠 동안 그 생각에 사로잡혀 일상생활이 힘들다.', category: 'SOUL', isReverse: true },
  { id: 64, text: '정해진 답이 없고 앞이 보이지 않는 모호한 상황을 불안해하기보다 즐기는 편이다.', category: 'SOUL', isReverse: false },
  { id: 65, text: '계획대로 되지 않는 돌발 상황이 발생해도 당황하지 않고 대안을 찾는다.', category: 'SOUL', isReverse: false },
  { id: 66, text: '예측 불가능한 상황이 닥치면 스트레스를 심하게 받는다.', category: 'SOUL', isReverse: true },
  { id: 67, text: '며칠 밤을 새워도 업무에 집중할 수 있는 기초 체력이 받쳐준다.', category: 'SOUL', isReverse: false },
  { id: 68, text: '번아웃이 오지 않도록 나만의 스트레스 관리 루틴을 가지고 있다.', category: 'SOUL', isReverse: false },
  { id: 69, text: '최근 들어 체력이 떨어져서 업무 집중도가 현저히 낮아졌다.', category: 'SOUL', isReverse: true },
  { id: 70, text: '감정이 격해지는 위기 상황에서도 냉정함을 잃지 않고 업무를 수행한다.', category: 'SOUL', isReverse: false },
  { id: 71, text: '장기적인 레이스를 위해 페이스 조절을 할 줄 안다.', category: 'SOUL', isReverse: false },
  { id: 72, text: '나는 내 감정을 통제하고 다스리는 능력이 뛰어나다.', category: 'SOUL', isReverse: false },

  // 리더십/영향력 Sub-factor
  { id: 73, text: '나의 비전을 매력적인 스토리로 전달하여 타인의 마음을 움직이고 설득한다.', category: 'SOUL', isReverse: false },
  { id: 74, text: '직책이나 권위가 없어도 사람들이 나를 따르게 만드는 아우라가 있다.', category: 'SOUL', isReverse: false },
  { id: 75, text: '남을 설득하거나 내 편으로 만드는 일이 어렵고 부담스럽다.', category: 'SOUL', isReverse: true },
  { id: 76, text: '팀원들 각자의 잠재력을 파악하고, 그들이 성장할 수 있도록 동기를 부여한다.', category: 'SOUL', isReverse: false },
  { id: 77, text: '조직의 목표 달성을 위해 필요하다면, 단호하게 싫은 소리(Feedback)를 할 수 있다.', category: 'SOUL', isReverse: false },
  { id: 78, text: '팀원들에게 싫은 소리를 하느니 차라리 내가 일을 다 처리하는 편이다.', category: 'SOUL', isReverse: true },
  { id: 79, text: '고객이나 팀원의 표정과 말투만 봐도 그들의 숨은 감정을 잘 읽어낸다.', category: 'SOUL', isReverse: false },
  { id: 80, text: '타인의 입장에서 생각하고 그들의 어려움에 깊이 공명한다.', category: 'SOUL', isReverse: false },
  { id: 81, text: '일할 때는 감정을 배제하고 논리적으로만 접근하는 것이 옳다고 생각한다.', category: 'SOUL', isReverse: true },
  { id: 82, text: '이해관계가 충돌하는 갈등 상황에서, 양쪽을 조율하여 합의를 이끌어낸다.', category: 'SOUL', isReverse: false },
  { id: 83, text: '낯선 사람과도 금방 라포(Rapport)를 형성하고 네트워크를 만든다.', category: 'SOUL', isReverse: false },
  { id: 84, text: '나는 조직의 분위기를 주도하고 에너지를 불어넣는 메이커다.', category: 'SOUL', isReverse: false },
];

// 역채점 인덱스 (0-based)
export const REVERSE_INDICES = [2, 5, 9, 14, 17, 20, 26, 29, 32, 38, 41, 44, 50, 53, 56, 62, 65, 68, 74, 77, 80];
