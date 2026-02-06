// types/index.ts
export type RootType = 'MIND' | 'WILL' | 'HEART';
export type MuscleType = 'HEAD' | 'HAND' | 'SOUL';
export type LevelType = 'LIGHT' | 'SHADOW';
export type StartupStage = 'seed' | 'pre-a' | 'series-a';

export interface RootScores {
  MIND: number;
  WILL: number;
  HEART: number;
}

export interface MuscleScores {
  HEAD: number;
  HAND: number;
  SOUL: number;
}

export interface FactorDetail {
  scores: number[];
  avg: number;
  questions: number[];
}

export interface SubFactorDetail {
  BODY: FactorDetail;
  LEADERSHIP: FactorDetail;
}

export interface MuscleDetail extends FactorDetail {
  subFactors?: SubFactorDetail;
}

export interface ScoreDetails {
  processedAnswers: number[]; // 역채점 적용 후 84개 점수
  rootDetails: {
    MIND: FactorDetail;
    WILL: FactorDetail;
    HEART: FactorDetail;
  };
  muscleDetails: {
    HEAD: FactorDetail;
    HAND: FactorDetail;
    SOUL: MuscleDetail; // SOUL은 BODY + LEADERSHIP 서브팩터 포함
  };
}

export interface DiagnosisScores {
  root: RootScores;
  muscle: MuscleScores;
  details?: ScoreDetails; // 세부 점수 정보 (선택사항 - 이전 데이터 호환성)
}

export interface Archetype {
  id: string;
  name: string;
  alias: string;
  subtitle: string;
  oneliner: string;
  description: string;
  light: string;
  shadow: string;
  action: string;
  reflectionQuestions?: string[];
  commonFeedback?: {
    light: string[];  // 강점일 때 듣는 말
    shadow: string[]; // 약점일 때 듣는 말
  };
  rootDominance: RootType;
  majorMuscle: MuscleType;
  minorMuscle: MuscleType;
}

export interface DiagnosisResult {
  archetypeId: string;
  archetypeName: string;
  rootDominance: RootType;
  majorMuscle: MuscleType;
  minorMuscle: MuscleType;
  level: LevelType;
  archetype: Archetype; // 전체 archetype 객체 포함
}

export interface UserInfo {
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  position?: string;
  businessCategory?: string;
  email?: string;
  startupStage?: StartupStage;
}

export interface DiagnosisData {
  id: string;
  createdAt: string;
  userInfo?: UserInfo;
  scores: DiagnosisScores;
  result: DiagnosisResult;
  rawAnswers: number[];
}

export interface Question {
  id: number;
  text: string;
  category: RootType | MuscleType;
  isReverse: boolean;
}
