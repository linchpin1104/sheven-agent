import { describe, it, expect } from 'vitest';
import {
  calculateRootScores,
  calculateMuscleScores,
  determineMicroArchetype,
  runDiagnosis,
  findWeakestMuscle,
} from './logic';
import { REVERSE_INDICES } from '@/constants/questions';

describe('진단 로직 테스트', () => {
  describe('calculateRootScores', () => {
    it('역채점 적용 후 모든 답변이 5점일 때 (역채점 문항은 1점)', () => {
      const answers = Array(84).fill(5);
      // 역채점 문항은 1점으로 설정 (6-1=5)
      REVERSE_INDICES.forEach(idx => {
        if (idx < 84) answers[idx] = 1;
      });
      const result = calculateRootScores(answers);
      
      expect(result.MIND).toBe(5);
      expect(result.WILL).toBe(5);
      expect(result.HEART).toBe(5);
    });

    it('역채점 적용 테스트 - MIND 3번 문항 (인덱스 2)', () => {
      // 모든 답변을 3점으로 설정
      const answers = Array(84).fill(3);
      // 3번 문항(인덱스 2)은 역채점이므로 6-3=3
      const result = calculateRootScores(answers);
      
      // MIND: (3*9 + 3*3) / 12 = 36/12 = 3
      expect(result.MIND).toBe(3);
    });

    it('84개가 아닌 답변 배열은 에러 발생', () => {
      const answers = Array(50).fill(3);
      expect(() => calculateRootScores(answers)).toThrow();
    });
  });

  describe('calculateMuscleScores', () => {
    it('SOUL은 문항 61~84 (24문항) 평균', () => {
      const answers = Array(84).fill(4);
      // 역채점 문항은 2점으로 설정 (6-2=4)
      REVERSE_INDICES.forEach(idx => {
        if (idx >= 36 && idx < 84) answers[idx] = 2;
      });
      const result = calculateMuscleScores(answers);
      
      expect(result.HEAD).toBe(4);
      expect(result.HAND).toBe(4);
      expect(result.SOUL).toBe(4);
    });

    it('역채점 적용 테스트 - HEAD 39번 문항 (인덱스 38)', () => {
      const answers = Array(84).fill(5);
      // HEAD 역채점 문항들을 1점으로 설정 (6-1=5)
      REVERSE_INDICES.forEach(idx => {
        if (idx >= 36 && idx < 48) answers[idx] = 1;
      });
      const result = calculateMuscleScores(answers);
      
      // HEAD: 모든 문항이 5점이므로 평균 5
      expect(result.HEAD).toBe(5);
    });
  });

  describe('determineMicroArchetype', () => {
    it('WILL + HAND + HEAD = Smart Tank', () => {
      const rootScores = { MIND: 3.5, WILL: 4.5, HEART: 3.0 };
      const muscleScores = { HEAD: 4.0, HAND: 4.5, SOUL: 3.5 };
      
      const result = determineMicroArchetype(rootScores, muscleScores);
      
      expect(result.rootDominance).toBe('WILL');
      expect(result.majorMuscle).toBe('HAND');
      expect(result.minorMuscle).toBe('HEAD');
      expect(result.archetypeId).toBe('smart_tank');
      expect(result.archetypeName).toBe('Smart Tank');
    });

    it('WILL + HAND + HAND = Mad Max', () => {
      const rootScores = { MIND: 3.0, WILL: 4.8, HEART: 3.2 };
      const muscleScores = { HEAD: 3.5, HAND: 4.9, SOUL: 3.8 };
      
      const result = determineMicroArchetype(rootScores, muscleScores);
      
      expect(result.rootDominance).toBe('WILL');
      expect(result.majorMuscle).toBe('HAND');
      expect(result.minorMuscle).toBe('SOUL'); // 2순위는 SOUL
      expect(result.archetypeId).toBe('commander');
    });

    it('MIND + HEAD + HAND = Wise Executor', () => {
      const rootScores = { MIND: 4.5, WILL: 4.0, HEART: 3.5 };
      const muscleScores = { HEAD: 4.5, HAND: 4.0, SOUL: 3.5 };
      
      const result = determineMicroArchetype(rootScores, muscleScores);
      
      expect(result.rootDominance).toBe('MIND');
      expect(result.majorMuscle).toBe('HEAD');
      expect(result.minorMuscle).toBe('HAND');
      expect(result.archetypeId).toBe('wise_executor');
    });

    it('HEART + SOUL + HEAD = Inspiring Thinker', () => {
      const rootScores = { MIND: 3.5, WILL: 3.8, HEART: 4.5 };
      const muscleScores = { HEAD: 4.0, HAND: 3.5, SOUL: 4.5 };
      
      const result = determineMicroArchetype(rootScores, muscleScores);
      
      expect(result.rootDominance).toBe('HEART');
      expect(result.majorMuscle).toBe('SOUL');
      expect(result.minorMuscle).toBe('HEAD');
      expect(result.archetypeId).toBe('inspiring_thinker');
    });

    it('동점 시 Root 우선순위: WILL > MIND > HEART', () => {
      const rootScores = { MIND: 4.0, WILL: 4.0, HEART: 4.0 };
      const muscleScores = { HEAD: 4.0, HAND: 4.0, SOUL: 3.5 };
      
      const result = determineMicroArchetype(rootScores, muscleScores);
      
      expect(result.rootDominance).toBe('WILL');
    });

    it('성숙도 레벨: Major Muscle >= 4.2 → LIGHT', () => {
      const rootScores = { MIND: 4.0, WILL: 4.5, HEART: 3.5 };
      const muscleScores = { HEAD: 4.0, HAND: 4.5, SOUL: 3.5 };
      
      const result = determineMicroArchetype(rootScores, muscleScores);
      
      expect(result.level).toBe('LIGHT');
    });

    it('성숙도 레벨: Major Muscle < 4.2 → SHADOW', () => {
      const rootScores = { MIND: 4.0, WILL: 4.5, HEART: 3.5 };
      const muscleScores = { HEAD: 3.8, HAND: 4.0, SOUL: 3.5 };
      
      const result = determineMicroArchetype(rootScores, muscleScores);
      
      expect(result.level).toBe('SHADOW');
    });
  });

  describe('runDiagnosis', () => {
    it('전체 진단 실행 - 정상 케이스', () => {
      // 모든 답변을 4점으로 설정
      const answers = Array(84).fill(4);
      
      const diagnosis = runDiagnosis(answers);
      
      expect(diagnosis.scores.root).toBeDefined();
      expect(diagnosis.scores.muscle).toBeDefined();
      expect(diagnosis.result).toBeDefined();
      expect(diagnosis.result.archetypeId).toBeDefined();
    });

    it('입력 검증: 84개가 아닌 배열은 에러', () => {
      const answers = Array(50).fill(4);
      expect(() => runDiagnosis(answers)).toThrow('답변은 정확히 84개의 배열이어야 합니다.');
    });

    it('입력 검증: 1~5 범위 밖의 값은 에러', () => {
      const answers = Array(84).fill(4);
      answers[0] = 6; // 범위 밖
      expect(() => runDiagnosis(answers)).toThrow('모든 답변은 1~5 사이의 정수여야 합니다.');
    });

    it('입력 검증: 정수가 아닌 값은 에러', () => {
      const answers = Array(84).fill(4);
      answers[0] = 3.5; // 정수 아님
      expect(() => runDiagnosis(answers)).toThrow('모든 답변은 1~5 사이의 정수여야 합니다.');
    });
  });

  describe('findWeakestMuscle', () => {
    it('가장 낮은 점수의 Muscle 찾기', () => {
      const muscleScores = { HEAD: 4.5, HAND: 4.0, SOUL: 3.5 };
      const weakest = findWeakestMuscle(muscleScores);
      
      expect(weakest).toBe('SOUL');
    });

    it('동점일 때는 첫 번째 반환', () => {
      const muscleScores = { HEAD: 4.0, HAND: 4.0, SOUL: 4.0 };
      const weakest = findWeakestMuscle(muscleScores);
      
      // 동점이므로 정렬 후 첫 번째
      expect(['HEAD', 'HAND', 'SOUL']).toContain(weakest);
    });
  });

  describe('27가지 유형 매칭 테스트', () => {
    // 각 Root별 9가지 조합 테스트
    const testCases = [
      // WILL 기반
      { root: { MIND: 3, WILL: 5, HEART: 3 }, muscle: { HEAD: 4, HAND: 5, SOUL: 3 }, expected: 'smart_tank' },
      { root: { MIND: 3, WILL: 5, HEART: 3 }, muscle: { HEAD: 3, HAND: 5, SOUL: 4 }, expected: 'commander' },
      { root: { MIND: 3, WILL: 5, HEART: 3 }, muscle: { HEAD: 3.5, HAND: 5, SOUL: 3.8 }, expected: 'commander' }, // SOUL이 2순위
      { root: { MIND: 3, WILL: 5, HEART: 3 }, muscle: { HEAD: 5, HAND: 4, SOUL: 3 }, expected: 'strategist' },
      { root: { MIND: 3, WILL: 5, HEART: 3 }, muscle: { HEAD: 5, HAND: 3, SOUL: 4 }, expected: 'visionary' },
      { root: { MIND: 3, WILL: 5, HEART: 3 }, muscle: { HEAD: 5, HAND: 3.5, SOUL: 4 }, expected: 'visionary' }, // SOUL이 2순위
      { root: { MIND: 3, WILL: 5, HEART: 3 }, muscle: { HEAD: 3, HAND: 4, SOUL: 5 }, expected: 'influencer' },
      { root: { MIND: 3, WILL: 5, HEART: 3 }, muscle: { HEAD: 4, HAND: 3, SOUL: 5 }, expected: 'charismatic_leader' },
      { root: { MIND: 3, WILL: 5, HEART: 3 }, muscle: { HEAD: 3.5, HAND: 3.8, SOUL: 5 }, expected: 'influencer' }, // HAND가 2순위
      
      // MIND 기반
      { root: { MIND: 5, WILL: 3, HEART: 3 }, muscle: { HEAD: 5, HAND: 4, SOUL: 3 }, expected: 'wise_executor' },
      { root: { MIND: 5, WILL: 3, HEART: 3 }, muscle: { HEAD: 5, HAND: 3, SOUL: 4 }, expected: 'humble_sage' },
      { root: { MIND: 5, WILL: 3, HEART: 3 }, muscle: { HEAD: 5, HAND: 3.5, SOUL: 4 }, expected: 'humble_sage' }, // SOUL이 2순위
      { root: { MIND: 5, WILL: 3, HEART: 3 }, muscle: { HEAD: 4, HAND: 5, SOUL: 3 }, expected: 'agile_learner' },
      { root: { MIND: 5, WILL: 3, HEART: 3 }, muscle: { HEAD: 3, HAND: 5, SOUL: 4 }, expected: 'humble_doer' },
      { root: { MIND: 5, WILL: 3, HEART: 3 }, muscle: { HEAD: 3.5, HAND: 5, SOUL: 3.8 }, expected: 'humble_doer' }, // SOUL이 2순위
      { root: { MIND: 5, WILL: 3, HEART: 3 }, muscle: { HEAD: 4, HAND: 3, SOUL: 5 }, expected: 'empathetic_thinker' },
      { root: { MIND: 5, WILL: 3, HEART: 3 }, muscle: { HEAD: 3, HAND: 4, SOUL: 5 }, expected: 'servant_leader' },
      { root: { MIND: 5, WILL: 3, HEART: 3 }, muscle: { HEAD: 3.5, HAND: 3.8, SOUL: 5 }, expected: 'servant_leader' }, // HAND가 2순위
      
      // HEART 기반
      { root: { MIND: 3, WILL: 3, HEART: 5 }, muscle: { HEAD: 5, HAND: 4, SOUL: 3 }, expected: 'passionate_builder' },
      { root: { MIND: 3, WILL: 3, HEART: 5 }, muscle: { HEAD: 5, HAND: 3, SOUL: 4 }, expected: 'empathetic_strategist' },
      { root: { MIND: 3, WILL: 3, HEART: 5 }, muscle: { HEAD: 5, HAND: 3.5, SOUL: 4 }, expected: 'empathetic_strategist' }, // SOUL이 2순위
      { root: { MIND: 3, WILL: 3, HEART: 5 }, muscle: { HEAD: 4, HAND: 5, SOUL: 3 }, expected: 'customer_champion' },
      { root: { MIND: 3, WILL: 3, HEART: 5 }, muscle: { HEAD: 3, HAND: 5, SOUL: 4 }, expected: 'mission_driven_doer' },
      { root: { MIND: 3, WILL: 3, HEART: 5 }, muscle: { HEAD: 3.5, HAND: 5, SOUL: 3.8 }, expected: 'mission_driven_doer' }, // SOUL이 2순위
      { root: { MIND: 3, WILL: 3, HEART: 5 }, muscle: { HEAD: 4, HAND: 3, SOUL: 5 }, expected: 'inspiring_thinker' },
      { root: { MIND: 3, WILL: 3, HEART: 5 }, muscle: { HEAD: 3, HAND: 4, SOUL: 5 }, expected: 'people_mover' },
      { root: { MIND: 3, WILL: 3, HEART: 5 }, muscle: { HEAD: 3.5, HAND: 3.8, SOUL: 5 }, expected: 'people_mover' }, // HAND가 2순위
    ];

    testCases.forEach(({ root, muscle, expected }) => {
      it(`${expected} 유형 매칭`, () => {
        const result = determineMicroArchetype(root, muscle);
        expect(result.archetypeId).toBe(expected);
      });
    });
  });

  describe('실제 시나리오 테스트', () => {
    it('시나리오 1: 강력한 실행력과 전략을 가진 WILL 창업가', () => {
      // WILL 문항(13~24)에 높은 점수
      const answers = Array(84).fill(3);
      for (let i = 12; i < 24; i++) answers[i] = 5;
      // HAND 문항(49~60)에 높은 점수
      for (let i = 48; i < 60; i++) answers[i] = 5;
      // HEAD 문항(37~48)에 중간 이상 점수
      for (let i = 36; i < 48; i++) answers[i] = 4;

      const diagnosis = runDiagnosis(answers);
      
      expect(diagnosis.result.rootDominance).toBe('WILL');
      expect(diagnosis.result.majorMuscle).toBe('HAND');
    });

    it('시나리오 2: 겸손하고 학습 능력이 뛰어난 MIND 창업가', () => {
      const answers = Array(84).fill(3);
      // MIND 문항(1~12)에 높은 점수
      for (let i = 0; i < 12; i++) answers[i] = 5;
      // HEAD 문항(37~48)에 높은 점수
      for (let i = 36; i < 48; i++) answers[i] = 5;
      // HAND 문항(49~60)에 중간 점수
      for (let i = 48; i < 60; i++) answers[i] = 4;

      const diagnosis = runDiagnosis(answers);
      
      expect(diagnosis.result.rootDominance).toBe('MIND');
      expect(diagnosis.result.majorMuscle).toBe('HEAD');
    });

    it('시나리오 3: 고객 중심적이고 리더십이 강한 HEART 창업가', () => {
      const answers = Array(84).fill(3);
      // HEART 문항(25~36)에 높은 점수
      for (let i = 24; i < 36; i++) answers[i] = 5;
      // SOUL 문항(61~84)에 높은 점수
      for (let i = 60; i < 84; i++) answers[i] = 5;
      // HEAD 문항(37~48)에 중간 점수
      for (let i = 36; i < 48; i++) answers[i] = 4;

      const diagnosis = runDiagnosis(answers);
      
      expect(diagnosis.result.rootDominance).toBe('HEART');
      expect(diagnosis.result.majorMuscle).toBe('SOUL');
    });
  });
});
