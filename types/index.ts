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

export interface DiagnosisScores {
  root: RootScores;
  muscle: MuscleScores;
}

export interface DiagnosisResult {
  archetypeId: string;
  archetypeName: string;
  rootDominance: RootType;
  majorMuscle: MuscleType;
  minorMuscle: MuscleType;
  level: LevelType;
}

export interface UserInfo {
  name?: string;
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
  rootDominance: RootType;
  majorMuscle: MuscleType;
  minorMuscle: MuscleType;
}
