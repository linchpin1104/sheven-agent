import { Archetype } from '@/types';

export const ARCHETYPES: Record<string, Archetype> = {
  // WILL 기반 (9개)
  'WILL_HAND_HEAD': {
    id: 'smart_tank',
    name: 'Smart Tank',
    alias: '스마트 전차',
    subtitle: '약점을 알고 들이받는 스마트 전차',
    oneliner: '무작정 돌진하지 않고 가장 약한 고리를 찾아 타격합니다.',
    description: '당신은 **실행력**을 주무기로 쓰지만, 결정적인 순간에는 **전략**을 섞어 효율을 극대화합니다.',
    light: '실행과 전략의 밸런스가 완벽하여 실패 확률을 0으로 만듭니다.',
    shadow: '생각이 너무 많아 실행 타이밍을 놓치거나, 반대로 너무 빨리 질러서 수습이 어려울 수 있습니다.',
    action: '타이밍을 읽는 연습을 하세요. 언제 생각을 멈추고 실행해야 하는지 기준을 세우세요.',
    rootDominance: 'WILL',
    majorMuscle: 'HAND',
    minorMuscle: 'HEAD',
  },
  'WILL_HAND_SOUL': {
    id: 'commander',
    name: 'Commander',
    alias: '지휘관',
    subtitle: '사람을 움직이는 실행의 리더',
    oneliner: '빠른 실행과 강력한 리더십으로 팀을 이끕니다.',
    description: '당신은 **실행력**과 **리더십**을 동시에 갖춘 지휘관형 창업가입니다.',
    light: '빠른 의사결정과 팀 동기부여로 조직을 강하게 만듭니다.',
    shadow: '혼자 너무 많이 결정하면 팀이 수동적으로 변할 수 있습니다.',
    action: '팀원들에게 결정권을 위임하고, 그들의 성장을 기다려주세요.',
    rootDominance: 'WILL',
    majorMuscle: 'HAND',
    minorMuscle: 'SOUL',
  },
  'WILL_HAND_HAND': {
    id: 'mad_max',
    name: 'Mad Max',
    alias: '폭주기관차',
    subtitle: '브레이크 고장 난 8톤 트럭',
    oneliner: '일단 질러보고 수습은 나중에 생각합니다.',
    description: '당신은 **압도적 실행력**으로 모든 것을 밀어붙이는 타입입니다.',
    light: '속도와 추진력이 너무 강해서 경쟁자가 따라올 수 없습니다.',
    shadow: '방향성 없이 질주하면 팀과 자원을 소진시킬 위험이 있습니다.',
    action: '전략가나 참모를 옆에 두고, 한 달에 한 번은 멈춰서 방향을 점검하세요.',
    rootDominance: 'WILL',
    majorMuscle: 'HAND',
    minorMuscle: 'HAND',
  },
  'WILL_HEAD_HAND': {
    id: 'strategist',
    name: 'Strategist',
    alias: '전략가',
    subtitle: '계산된 승부수를 던지는 전략가',
    oneliner: '철저한 분석 후 과감하게 실행합니다.',
    description: '당신은 **전략적 사고**를 바탕으로 **실행**하는 균형잡힌 창업가입니다.',
    light: '데이터 기반 의사결정과 빠른 실행으로 성공 확률을 높입니다.',
    shadow: '완벽한 계획을 추구하다 실행 타이밍을 놓칠 수 있습니다.',
    action: '70% 확신이 들면 실행하세요. 완벽은 실행 후에 만들어집니다.',
    rootDominance: 'WILL',
    majorMuscle: 'HEAD',
    minorMuscle: 'HAND',
  },
  'WILL_HEAD_SOUL': {
    id: 'visionary',
    name: 'Visionary',
    alias: '비전가',
    subtitle: '미래를 보고 사람을 모으는 비전가',
    oneliner: '명확한 비전으로 사람들을 설득하고 이끕니다.',
    description: '당신은 **전략적 통찰력**과 **리더십**으로 조직을 이끕니다.',
    light: '큰 그림을 그리고 사람들을 그 비전에 동참시키는 능력이 탁월합니다.',
    shadow: '실행력이 부족하면 비전만 있고 결과가 없을 수 있습니다.',
    action: '실행 담당자를 영입하거나, 작은 것부터 직접 실행해보세요.',
    rootDominance: 'WILL',
    majorMuscle: 'HEAD',
    minorMuscle: 'SOUL',
  },
  'WILL_HEAD_HEAD': {
    id: 'mastermind',
    name: 'Mastermind',
    alias: '마스터마인드',
    subtitle: '모든 것을 계산하는 두뇌',
    oneliner: '완벽한 전략으로 승리를 설계합니다.',
    description: '당신은 **압도적 지적 능력**으로 비즈니스를 설계하는 타입입니다.',
    light: '복잡한 문제를 명쾌하게 풀어내는 능력이 탁월합니다.',
    shadow: '분석에 빠져 실행이 늦어지거나, 팀과의 소통이 부족할 수 있습니다.',
    action: '실행 파트너를 찾고, 고객과 직접 대화하는 시간을 늘리세요.',
    rootDominance: 'WILL',
    majorMuscle: 'HEAD',
    minorMuscle: 'HEAD',
  },
  'WILL_SOUL_HAND': {
    id: 'influencer',
    name: 'Influencer',
    alias: '영향력자',
    subtitle: '사람을 움직여 일을 만드는 영향력자',
    oneliner: '강력한 영향력으로 사람들을 행동하게 만듭니다.',
    description: '당신은 **리더십**과 **실행력**을 겸비한 영향력 있는 창업가입니다.',
    light: '사람들을 동기부여하고 실제 행동으로 이끄는 능력이 뛰어납니다.',
    shadow: '전략 없이 감정과 추진력만으로 움직이면 방향을 잃을 수 있습니다.',
    action: '데이터와 전략을 보완할 수 있는 참모를 영입하세요.',
    rootDominance: 'WILL',
    majorMuscle: 'SOUL',
    minorMuscle: 'HAND',
  },
  'WILL_SOUL_HEAD': {
    id: 'charismatic_leader',
    name: 'Charismatic Leader',
    alias: '카리스마 리더',
    subtitle: '지혜와 카리스마로 이끄는 리더',
    oneliner: '전략적 통찰력과 강력한 리더십을 겸비했습니다.',
    description: '당신은 **리더십**과 **전략**을 바탕으로 조직을 이끄는 타입입니다.',
    light: '비전을 제시하고 사람들을 설득하며 전략적으로 실행합니다.',
    shadow: '직접 실행보다 지시에 의존하면 현장 감각을 잃을 수 있습니다.',
    action: '현장에 나가 직접 고객을 만나고 작은 일부터 실행해보세요.',
    rootDominance: 'WILL',
    majorMuscle: 'SOUL',
    minorMuscle: 'HEAD',
  },
  'WILL_SOUL_SOUL': {
    id: 'natural_leader',
    name: 'Natural Leader',
    alias: '타고난 리더',
    subtitle: '사람을 끌어당기는 천부적 리더',
    oneliner: '타고난 카리스마로 사람들이 자연스럽게 따릅니다.',
    description: '당신은 **압도적 리더십**으로 조직을 이끄는 타입입니다.',
    light: '사람들을 하나로 모으고 동기부여하는 능력이 탁월합니다.',
    shadow: '전략과 실행력이 부족하면 카리스마만으로는 한계가 있습니다.',
    action: '전략가와 실행자를 영입하여 팀을 보완하세요.',
    rootDominance: 'WILL',
    majorMuscle: 'SOUL',
    minorMuscle: 'SOUL',
  },

  // MIND 기반 (9개)
  'MIND_HEAD_HAND': {
    id: 'wise_executor',
    name: 'Wise Executor',
    alias: '현명한 실행자',
    subtitle: '겸손하게 배우고 빠르게 실행하는 현자',
    oneliner: '배움을 즉시 실행으로 옮기는 실천형 학습자입니다.',
    description: '당신은 **지혜**와 **실행력**을 균형있게 갖춘 창업가입니다.',
    light: '끊임없이 배우고 개선하며 빠르게 실행합니다.',
    shadow: '너무 많이 배우려다 실행이 늦어질 수 있습니다.',
    action: '배운 것은 24시간 내에 작게라도 실행해보세요.',
    rootDominance: 'MIND',
    majorMuscle: 'HEAD',
    minorMuscle: 'HAND',
  },
  'MIND_HEAD_SOUL': {
    id: 'humble_sage',
    name: 'Humble Sage',
    alias: '겸손한 현자',
    subtitle: '지혜와 공감으로 이끄는 겸손한 리더',
    oneliner: '배움과 공감으로 사람들을 자연스럽게 이끕니다.',
    description: '당신은 **지혜**와 **리더십**을 겸비한 현자형 리더입니다.',
    light: '겸손하게 배우고 사람들을 존중하며 이끕니다.',
    shadow: '실행력이 부족하면 좋은 생각만 있고 결과가 없을 수 있습니다.',
    action: '작은 것부터 직접 실행하고, 실행 파트너를 영입하세요.',
    rootDominance: 'MIND',
    majorMuscle: 'HEAD',
    minorMuscle: 'SOUL',
  },
  'MIND_HEAD_HEAD': {
    id: 'eternal_learner',
    name: 'Eternal Learner',
    alias: '영원한 학습자',
    subtitle: '끊임없이 배우고 성장하는 학습자',
    oneliner: '배움에 대한 열정이 끝이 없습니다.',
    description: '당신은 **압도적 학습 능력**으로 끊임없이 성장하는 타입입니다.',
    light: '빠르게 배우고 적응하며 복잡한 문제를 해결합니다.',
    shadow: '배우기만 하고 실행하지 않으면 기회를 놓칠 수 있습니다.',
    action: '학습과 실행의 비율을 3:7로 바꾸세요. 실행하면서 배우세요.',
    rootDominance: 'MIND',
    majorMuscle: 'HEAD',
    minorMuscle: 'HEAD',
  },
  'MIND_HAND_HEAD': {
    id: 'agile_learner',
    name: 'Agile Learner',
    alias: '민첩한 학습자',
    subtitle: '빠르게 배우고 즉시 실행하는 민첩한 창업가',
    oneliner: '실패를 두려워하지 않고 빠르게 시도하며 배웁니다.',
    description: '당신은 **실행력**과 **학습 능력**을 겸비한 민첩한 창업가입니다.',
    light: '빠르게 시도하고 실패에서 배우며 개선합니다.',
    shadow: '방향성 없이 실행만 하면 에너지를 낭비할 수 있습니다.',
    action: '한 달에 한 번은 멈춰서 배운 것을 정리하고 전략을 수정하세요.',
    rootDominance: 'MIND',
    majorMuscle: 'HAND',
    minorMuscle: 'HEAD',
  },
  'MIND_HAND_SOUL': {
    id: 'humble_doer',
    name: 'Humble Doer',
    alias: '겸손한 실행자',
    subtitle: '낮은 자세로 빠르게 실행하는 창업가',
    oneliner: '겸손하게 배우고 빠르게 실행하며 사람들과 함께 성장합니다.',
    description: '당신은 **실행력**과 **리더십**을 겸손함과 함께 갖춘 창업가입니다.',
    light: '빠르게 실행하면서도 팀과 고객의 피드백을 겸손하게 받아들입니다.',
    shadow: '전략 없이 실행하면 방향을 잃을 수 있습니다.',
    action: '전략적 사고를 보완할 멘토나 참모를 찾으세요.',
    rootDominance: 'MIND',
    majorMuscle: 'HAND',
    minorMuscle: 'SOUL',
  },
  'MIND_HAND_HAND': {
    id: 'humble_hustler',
    name: 'Humble Hustler',
    alias: '겸손한 허슬러',
    subtitle: '낮은 자세로 끊임없이 실행하는 창업가',
    oneliner: '겸손하게 배우지만 실행은 누구보다 빠릅니다.',
    description: '당신은 **압도적 실행력**을 겸손함과 함께 갖춘 창업가입니다.',
    light: '빠른 실행력과 겸손한 태도로 팀과 고객의 신뢰를 얻습니다.',
    shadow: '전략과 리더십이 부족하면 혼자 너무 많이 일하게 됩니다.',
    action: '전략가와 리더를 영입하고, 팀에게 권한을 위임하세요.',
    rootDominance: 'MIND',
    majorMuscle: 'HAND',
    minorMuscle: 'HAND',
  },
  'MIND_SOUL_HEAD': {
    id: 'empathetic_thinker',
    name: 'Empathetic Thinker',
    alias: '공감하는 사색가',
    subtitle: '사람을 이해하고 전략을 세우는 공감형 리더',
    oneliner: '사람의 마음을 읽고 전략적으로 문제를 해결합니다.',
    description: '당신은 **리더십**과 **전략적 사고**를 겸비한 공감형 리더입니다.',
    light: '팀과 고객을 깊이 이해하고 전략적으로 문제를 해결합니다.',
    shadow: '실행력이 부족하면 좋은 아이디어만 있고 결과가 없을 수 있습니다.',
    action: '실행 파트너를 찾거나, 작은 것부터 직접 실행해보세요.',
    rootDominance: 'MIND',
    majorMuscle: 'SOUL',
    minorMuscle: 'HEAD',
  },
  'MIND_SOUL_HAND': {
    id: 'servant_leader',
    name: 'Servant Leader',
    alias: '섬기는 리더',
    subtitle: '팀을 섬기며 이끄는 겸손한 리더',
    oneliner: '팀원들을 섬기며 그들의 성장을 돕습니다.',
    description: '당신은 **리더십**과 **실행력**을 겸손함과 함께 갖춘 섬김형 리더입니다.',
    light: '팀원들을 존중하고 그들의 성장을 도우며 함께 실행합니다.',
    shadow: '전략 없이 팀을 이끌면 방향을 잃을 수 있습니다.',
    action: '전략적 사고를 보완할 멘토나 참모를 영입하세요.',
    rootDominance: 'MIND',
    majorMuscle: 'SOUL',
    minorMuscle: 'HAND',
  },
  'MIND_SOUL_SOUL': {
    id: 'humble_connector',
    name: 'Humble Connector',
    alias: '겸손한 연결자',
    subtitle: '사람을 연결하고 함께 성장하는 리더',
    oneliner: '겸손하게 사람들을 연결하고 함께 성장합니다.',
    description: '당신은 **압도적 리더십**을 겸손함과 함께 갖춘 연결형 리더입니다.',
    light: '사람들을 연결하고 그들의 잠재력을 끌어내는 능력이 탁월합니다.',
    shadow: '전략과 실행력이 부족하면 관계만 좋고 결과가 없을 수 있습니다.',
    action: '전략가와 실행자를 영입하여 팀을 보완하세요.',
    rootDominance: 'MIND',
    majorMuscle: 'SOUL',
    minorMuscle: 'SOUL',
  },

  // HEART 기반 (9개)
  'HEART_HEAD_HAND': {
    id: 'passionate_builder',
    name: 'Passionate Builder',
    alias: '열정적인 빌더',
    subtitle: '고객을 위해 전략적으로 빠르게 만드는 빌더',
    oneliner: '고객 사랑을 바탕으로 전략적으로 빠르게 실행합니다.',
    description: '당신은 **전략**과 **실행력**을 고객 중심으로 발휘하는 창업가입니다.',
    light: '고객을 깊이 이해하고 전략적으로 빠르게 문제를 해결합니다.',
    shadow: '고객에게 너무 집중하다 비즈니스 전략을 놓칠 수 있습니다.',
    action: '고객 가치와 비즈니스 가치의 균형을 찾으세요.',
    rootDominance: 'HEART',
    majorMuscle: 'HEAD',
    minorMuscle: 'HAND',
  },
  'HEART_HEAD_SOUL': {
    id: 'empathetic_strategist',
    name: 'Empathetic Strategist',
    alias: '공감하는 전략가',
    subtitle: '사람의 마음을 읽고 전략을 세우는 리더',
    oneliner: '고객과 팀의 마음을 읽고 전략적으로 문제를 해결합니다.',
    description: '당신은 **전략**과 **리더십**을 공감 능력과 함께 발휘하는 리더입니다.',
    light: '사람들을 깊이 이해하고 전략적으로 조직을 이끕니다.',
    shadow: '실행력이 부족하면 좋은 전략만 있고 결과가 없을 수 있습니다.',
    action: '실행 파트너를 영입하거나, 작은 것부터 직접 실행해보세요.',
    rootDominance: 'HEART',
    majorMuscle: 'HEAD',
    minorMuscle: 'SOUL',
  },
  'HEART_HEAD_HEAD': {
    id: 'customer_scientist',
    name: 'Customer Scientist',
    alias: '고객 과학자',
    subtitle: '고객을 과학적으로 분석하는 전략가',
    oneliner: '고객을 깊이 이해하고 데이터로 분석합니다.',
    description: '당신은 **압도적 전략적 사고**를 고객 중심으로 발휘하는 창업가입니다.',
    light: '고객을 과학적으로 분석하고 최적의 솔루션을 설계합니다.',
    shadow: '분석에 빠져 실행이 늦어지거나, 고객과의 감정적 연결이 부족할 수 있습니다.',
    action: '고객과 직접 대화하는 시간을 늘리고, 실행 파트너를 찾으세요.',
    rootDominance: 'HEART',
    majorMuscle: 'HEAD',
    minorMuscle: 'HEAD',
  },
  'HEART_HAND_HEAD': {
    id: 'customer_champion',
    name: 'Customer Champion',
    alias: '고객 챔피언',
    subtitle: '고객을 위해 빠르게 실행하는 전사',
    oneliner: '고객의 문제를 즉시 해결하기 위해 빠르게 움직입니다.',
    description: '공감하는 리더 태도를 바탕으로, 압도적 실행력을 주무기로 사용하며, 필요할 때 전략적 사고를 보조로 활용하는 창업가입니다.',
    light: `**당신의 가장 큰 강점은 "고객의 문제를 내 일처럼 여기는 진정성"과 "빠른 실행력"의 조합입니다.**

고객이 불편함을 토로하면, 당신은 그날 밤 잠도 못 자고 해결 방법을 고민합니다. 그리고 다음날 아침이면 벌써 MVP를 만들어 고객에게 보여줍니다. 대기업이 3개월 걸려 결정할 것을, 당신은 3일 만에 실행합니다.

**실제로 이런 일이 자주 일어납니다:**
• 새벽 2시에 고객 불만 메시지를 받으면, 즉시 코드를 수정하거나 프로세스를 바꿉니다
• 고객 인터뷰에서 들은 피드백을, 그 주 안에 제품에 반영합니다
• 경쟁사가 분석하는 동안, 당신은 이미 고객과 함께 솔루션을 테스트하고 있습니다

이 조합의 창업가는 **고객 충성도가 비정상적으로 높습니다.** 고객들은 당신이 진심으로 자신의 문제를 해결하려 한다는 것을 느끼고, 그 진심과 빠른 실행력에 감동받아 자발적으로 입소문을 냅니다. "이 팀은 우리 이야기를 진짜 듣는다"는 평가를 받습니다.

필요할 때는 전략적으로도 생각할 수 있기 때문에, 단순히 고객이 원하는 것만 만드는 것이 아니라, **고객이 진짜 필요로 하는 것**을 파악해 제공합니다. 고객이 "A 기능이 필요해요"라고 말하면, 그 이면의 진짜 문제를 파악하고 더 나은 해결책 B를 제시할 줄 압니다.`,
    shadow: `**하지만 이 강점이 때로는 가장 큰 약점이 됩니다.**

고객의 모든 요구에 빠르게 반응하다 보니, **제품의 일관성이 무너지고 팀이 지쳐갈 수 있습니다.** 월요일에 고객 A의 요청으로 기능을 추가했는데, 수요일에 고객 B의 요청으로 그 기능을 바꾸고, 금요일에는 또 다른 방향으로 수정하는 일이 반복됩니다.

**이런 상황들을 경험하고 있을 가능성이 높습니다:**
• 고객 한 명의 요청에 팀 전체가 방향을 바꾸는 일이 잦습니다
• "이번 주에는 이것부터 해야 해"라는 말을 너무 자주 합니다
• 개발팀이 "기획이 또 바뀌었어요"라며 지친 표정을 짓습니다
• 3개월 전 만들었던 기능이 지금은 사용되지 않는 경우가 많습니다
• 제품 로드맵이 있긴 한데, 실제로는 잘 지켜지지 않습니다

또한 고객에게 집중하다 보니 **비즈니스 수치(매출, 이익률, CAC)를 놓치기 쉽습니다.** 고객이 만족하면 됐다고 생각하지만, 정작 회사의 현금은 바닥을 보이고 있을 수 있습니다. "고객은 만족하는데 왜 비즈니스는 안 돌아가지?"라는 질문을 하게 됩니다.

가장 위험한 것은 **"착한 사람" 신드롬**입니다. 고객이나 팀원이 어려운 부탁을 하면 거절하지 못하고 "해볼게요"라고 말합니다. 그 결과 본인은 과부하 상태가 되고, 정작 중요한 전략적 의사결정에 쓸 에너지가 남지 않습니다.`,
    action: `**왜 전략적 사고와 선택적 집중이 필요한가?**

당신의 실행력은 칼과 같습니다. 칼은 날카로울수록 좋지만, **어디를 벨지 정하는 것은 전략**입니다. 지금 당신은 사방을 베고 있습니다. 고객 A도 베고, 고객 B도 베고, 새로운 아이디어도 베고... 하지만 정작 쓰러뜨려야 할 핵심 문제(시장의 진짜 Pain Point)는 여전히 서 있습니다.

성공한 창업가들은 **10개의 고객 요청 중 9개를 정중히 거절하고, 1개에만 집중합니다.** 왜냐하면 그 1개가 100명의 고객 문제를 한 번에 해결하는 핵심이기 때문입니다. 당신에게 필요한 것은 "어떤 고객의 어떤 문제에 집중할 것인가"를 정하는 전략적 사고입니다.

**구체적인 실행 가이드:**

**1. 월간 고객 요청 우선순위 회의 만들기 (매월 첫째 월요일)**
   - 지난달 받은 모든 고객 요청을 리스트업합니다
   - 각 요청이 해결하는 고객 수, 비즈니스 임팩트, 개발 공수를 평가합니다
   - 상위 3개만 선택하고, 나머지는 "다음 분기"로 미룹니다
   - 이 3개를 팀 전체가 볼 수 있는 곳에 붙여둡니다

**2. "No"라고 말하는 연습하기**
   - 고객 요청에 즉시 "할게요!"라고 대답하지 마세요
   - 대신 이렇게 말하세요: "소중한 의견 감사드립니다. 다른 고객들의 요청과 함께 검토해서 우선순위를 정하고 연락드리겠습니다."
   - 거절할 때는 "왜 안 되는지"가 아니라 "지금은 무엇에 집중하고 있는지"를 설명하세요

**3. 주간 전략 타임 확보 (매주 금요일 오후 2-4시)**
   - 이 2시간은 고객 미팅, 팀 미팅을 절대 잡지 않습니다
   - 혼자, 또는 공동창업자와 함께 큰 그림을 봅니다
   - "우리가 올해 달성해야 할 단 하나의 목표는 무엇인가?"
   - "지금 하고 있는 일 중에 그 목표와 관계없는 것은?"

**4. 숫자 대시보드 만들기**
   - 매주 월요일 아침에 확인할 5가지 숫자를 정합니다
     예: 주간 신규 고객 수, 이탈율, MRR, 고객 응답 시간, NPS
   - 이 숫자들이 좋지 않으면, 고객이 만족해도 무언가 잘못된 것입니다

**5. 전략 파트너 찾기**
   - 당신보다 전략적 사고가 강한 공동창업자, 어드바이저, 멘토를 옆에 두세요
   - 매주 1시간씩 그 사람과 "우리가 올바른 방향으로 가고 있는가?"를 점검하세요
   - 당신이 실행에 집중할 때, 그 사람이 방향을 잡아주는 구조를 만드세요

**기억하세요:** 모든 고객 요청을 들어주는 것은 고객을 사랑하는 것이 아닙니다. 진짜 고객 사랑은 **지속 가능한 비즈니스를 만들어, 10년 뒤에도 그 고객을 서비스할 수 있는 회사를 만드는 것**입니다. 그러기 위해서는 전략적 선택과 집중이 필수입니다.`,
    rootDominance: 'HEART',
    majorMuscle: 'HAND',
    minorMuscle: 'HEAD',
  },
  'HEART_HAND_SOUL': {
    id: 'mission_driven_doer',
    name: 'Mission-Driven Doer',
    alias: '미션 중심 실행자',
    subtitle: '사명감으로 빠르게 실행하고 사람을 이끄는 창업가',
    oneliner: '고객과 팀을 위해 빠르게 실행하고 이끕니다.',
    description: '당신은 **실행력**과 **리더십**을 사명감과 함께 발휘하는 창업가입니다.',
    light: '고객과 팀을 위해 빠르게 실행하고 동기부여합니다.',
    shadow: '전략 없이 감정과 실행력만으로 움직이면 방향을 잃을 수 있습니다.',
    action: '전략적 사고를 보완할 멘토나 참모를 영입하세요.',
    rootDominance: 'HEART',
    majorMuscle: 'HAND',
    minorMuscle: 'SOUL',
  },
  'HEART_HAND_HAND': {
    id: 'passionate_hustler',
    name: 'Passionate Hustler',
    alias: '열정적인 허슬러',
    subtitle: '고객을 위해 쉬지 않고 달리는 창업가',
    oneliner: '고객 사랑으로 쉬지 않고 실행합니다.',
    description: '당신은 **압도적 실행력**을 고객 중심으로 발휘하는 창업가입니다.',
    light: '고객을 위해 쉬지 않고 실행하며 빠르게 문제를 해결합니다.',
    shadow: '전략과 리더십이 부족하면 혼자 너무 많이 일하게 됩니다.',
    action: '전략가와 리더를 영입하고, 팀에게 권한을 위임하세요.',
    rootDominance: 'HEART',
    majorMuscle: 'HAND',
    minorMuscle: 'HAND',
  },
  'HEART_SOUL_HEAD': {
    id: 'inspiring_thinker',
    name: 'Inspiring Thinker',
    alias: '영감을 주는 사색가',
    subtitle: '사람들에게 영감을 주고 전략을 세우는 리더',
    oneliner: '사람들을 이해하고 영감을 주며 전략적으로 이끕니다.',
    description: '당신은 **리더십**과 **전략**을 공감 능력과 함께 발휘하는 리더입니다.',
    light: '사람들에게 영감을 주고 전략적으로 조직을 이끕니다.',
    shadow: '실행력이 부족하면 좋은 비전만 있고 결과가 없을 수 있습니다.',
    action: '실행 파트너를 영입하거나, 작은 것부터 직접 실행해보세요.',
    rootDominance: 'HEART',
    majorMuscle: 'SOUL',
    minorMuscle: 'HEAD',
  },
  'HEART_SOUL_HAND': {
    id: 'people_mover',
    name: 'People Mover',
    alias: '사람을 움직이는 자',
    subtitle: '사람의 마음을 움직여 행동하게 만드는 리더',
    oneliner: '공감과 동기부여로 사람들을 행동하게 만듭니다.',
    description: '당신은 **리더십**과 **실행력**을 공감 능력과 함께 발휘하는 리더입니다.',
    light: '사람들의 마음을 움직이고 함께 실행하게 만듭니다.',
    shadow: '전략 없이 감정과 실행력만으로 움직이면 방향을 잃을 수 있습니다.',
    action: '전략적 사고를 보완할 멘토나 참모를 영입하세요.',
    rootDominance: 'HEART',
    majorMuscle: 'SOUL',
    minorMuscle: 'HAND',
  },
  'HEART_SOUL_SOUL': {
    id: 'empathetic_magnet',
    name: 'Empathetic Magnet',
    alias: '공감의 자석',
    subtitle: '사람들을 자연스럽게 끌어당기는 공감형 리더',
    oneliner: '깊은 공감 능력으로 사람들이 자연스럽게 모입니다.',
    description: '당신은 **압도적 리더십**을 공감 능력과 함께 발휘하는 리더입니다.',
    light: '사람들을 깊이 이해하고 그들의 잠재력을 끌어냅니다.',
    shadow: '전략과 실행력이 부족하면 관계만 좋고 결과가 없을 수 있습니다.',
    action: '전략가와 실행자를 영입하여 팀을 보완하세요.',
    rootDominance: 'HEART',
    majorMuscle: 'SOUL',
    minorMuscle: 'SOUL',
  },
};

// 유형 ID 생성 헬퍼 함수
export function getArchetypeKey(root: string, major: string, minor: string): string {
  return `${root}_${major}_${minor}`;
}
