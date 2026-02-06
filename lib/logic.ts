import { RootScores, MuscleScores, DiagnosisResult, RootType, MuscleType } from '@/types';
import { REVERSE_INDICES } from '@/constants/questions';
import { ARCHETYPES, getArchetypeKey } from '@/constants/archetypes';

/**
 * 역채점 적용 함수
 * 지정된 인덱스의 점수를 6 - 점수로 변환
 */
function applyReverseCoding(answers: number[]): number[] {
  return answers.map((score, index) => {
    if (REVERSE_INDICES.includes(index)) {
      return 6 - score;
    }
    return score;
  });
}

/**
 * 배열의 평균 계산
 */
function calculateAverage(scores: number[]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Number((sum / scores.length).toFixed(2));
}

/**
 * ROOT (태도) 점수 계산
 * MIND = Avg(문항 1~12)
 * WILL = Avg(문항 13~24)
 * HEART = Avg(문항 25~36)
 */
export function calculateRootScores(answers: number[]): RootScores {
  if (answers.length !== 84) {
    throw new Error('답변은 정확히 84개여야 합니다.');
  }

  // 역채점 적용
  const processedAnswers = applyReverseCoding(answers);

  // 인덱스는 0-based이므로 문항 1~12는 인덱스 0~11
  const mindScores = processedAnswers.slice(0, 12);
  const willScores = processedAnswers.slice(12, 24);
  const heartScores = processedAnswers.slice(24, 36);

  return {
    MIND: calculateAverage(mindScores),
    WILL: calculateAverage(willScores),
    HEART: calculateAverage(heartScores),
  };
}

/**
 * MUSCLE (역량) 점수 계산
 * HEAD (지혜) = Avg(문항 37~48)
 * HAND (야성) = Avg(문항 49~60)
 * SOUL (장악+내공) = Avg(문항 61~84) // BODY와 SOUL 통합
 */
export function calculateMuscleScores(answers: number[]): MuscleScores {
  if (answers.length !== 84) {
    throw new Error('답변은 정확히 84개여야 합니다.');
  }

  // 역채점 적용
  const processedAnswers = applyReverseCoding(answers);

  // 인덱스는 0-based
  const headScores = processedAnswers.slice(36, 48); // 문항 37~48
  const handScores = processedAnswers.slice(48, 60); // 문항 49~60
  const soulScores = processedAnswers.slice(60, 84); // 문항 61~84 (BODY + SOUL 통합)

  return {
    HEAD: calculateAverage(headScores),
    HAND: calculateAverage(handScores),
    SOUL: calculateAverage(soulScores),
  };
}

/**
 * 주력 Root 결정
 * MIND, WILL, HEART 중 최댓값 선정
 * 동점 시 우선순위: WILL > MIND > HEART
 */
function determineDominantRoot(rootScores: RootScores): RootType {
  const { MIND, WILL, HEART } = rootScores;
  const maxScore = Math.max(MIND, WILL, HEART);

  // 동점 처리: WILL > MIND > HEART
  if (WILL === maxScore) return 'WILL';
  if (MIND === maxScore) return 'MIND';
  return 'HEART';
}

/**
 * 주력 및 보조 Muscle 결정
 * Major Muscle: HEAD, HAND, SOUL 중 최댓값
 * Minor Muscle: 주력을 제외한 나머지 중 최댓값
 */
function determineMuscles(muscleScores: MuscleScores): { major: MuscleType; minor: MuscleType } {
  const { HEAD, HAND, SOUL } = muscleScores;
  
  // 점수와 타입을 함께 저장
  const muscles: Array<{ type: MuscleType; score: number }> = [
    { type: 'HEAD', score: HEAD },
    { type: 'HAND', score: HAND },
    { type: 'SOUL', score: SOUL },
  ];

  // 점수 기준 내림차순 정렬
  muscles.sort((a, b) => b.score - a.score);

  return {
    major: muscles[0].type,
    minor: muscles[1].type,
  };
}

/**
 * 성숙도 레벨 결정
 * Major Muscle 점수가 4.2점 이상이면 LIGHT, 미만이면 SHADOW
 */
function determineLevel(majorMuscleScore: number): 'LIGHT' | 'SHADOW' {
  return majorMuscleScore >= 4.2 ? 'LIGHT' : 'SHADOW';
}

/**
 * 마이크로 유형 결정
 * Root + Major Muscle + Minor Muscle 조합으로 27가지 유형 중 하나를 매칭
 */
export function determineMicroArchetype(
  rootScores: RootScores,
  muscleScores: MuscleScores
): DiagnosisResult {
  // 1. 주력 Root 결정
  const rootDominance = determineDominantRoot(rootScores);

  // 2. 주력 및 보조 Muscle 결정
  const { major: majorMuscle, minor: minorMuscle } = determineMuscles(muscleScores);

  // 3. 성숙도 레벨 결정
  const level = determineLevel(muscleScores[majorMuscle]);

  // 4. Archetype 매칭
  const archetypeKey = getArchetypeKey(rootDominance, majorMuscle, minorMuscle);
  const archetype = ARCHETYPES[archetypeKey];

  if (!archetype) {
    throw new Error(`유형을 찾을 수 없습니다: ${archetypeKey}`);
  }

  return {
    archetypeId: archetype.id,
    archetypeName: archetype.name,
    rootDominance,
    majorMuscle,
    minorMuscle,
    level,
  };
}

/**
 * 전체 진단 실행
 * 답변 배열을 받아 점수와 결과를 반환
 */
export function runDiagnosis(answers: number[]) {
  // 입력 검증
  if (!Array.isArray(answers) || answers.length !== 84) {
    throw new Error('답변은 정확히 84개의 배열이어야 합니다.');
  }

  // 모든 답변이 1~5 사이인지 검증
  const isValid = answers.every(answer => 
    Number.isInteger(answer) && answer >= 1 && answer <= 5
  );

  if (!isValid) {
    throw new Error('모든 답변은 1~5 사이의 정수여야 합니다.');
  }

  // 점수 계산
  const rootScores = calculateRootScores(answers);
  const muscleScores = calculateMuscleScores(answers);

  // 유형 결정
  const result = determineMicroArchetype(rootScores, muscleScores);

  return {
    scores: {
      root: rootScores,
      muscle: muscleScores,
    },
    result,
  };
}

/**
 * 가장 낮은 점수의 Muscle 찾기 (처방용)
 */
export function findWeakestMuscle(muscleScores: MuscleScores): MuscleType {
  const { HEAD, HAND, SOUL } = muscleScores;
  const muscles: Array<{ type: MuscleType; score: number }> = [
    { type: 'HEAD', score: HEAD },
    { type: 'HAND', score: HAND },
    { type: 'SOUL', score: SOUL },
  ];

  muscles.sort((a, b) => a.score - b.score);
  return muscles[0].type;
}
