import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DiagnosisData, UserInfo } from '@/types';

interface QuizState {
  // 현재 진행 상태
  currentQuestion: number;
  answers: number[];
  userInfo: UserInfo | null;
  
  // 진단 결과
  diagnosisResult: DiagnosisData | null;
  
  // Actions
  setAnswer: (questionIndex: number, value: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (index: number) => void;
  setUserInfo: (info: UserInfo) => void;
  setDiagnosisResult: (result: DiagnosisData) => void;
  reset: () => void;
  
  // Computed
  isComplete: () => boolean;
  progress: () => number;
}

const initialState = {
  currentQuestion: 0,
  answers: Array(84).fill(0), // 0은 미응답
  userInfo: null,
  diagnosisResult: null,
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setAnswer: (questionIndex, value) => {
        set((state) => {
          const newAnswers = [...state.answers];
          newAnswers[questionIndex] = value;
          return { answers: newAnswers };
        });
      },

      nextQuestion: () => {
        set((state) => {
          const nextIndex = Math.min(state.currentQuestion + 1, 83);
          return { currentQuestion: nextIndex };
        });
      },

      prevQuestion: () => {
        set((state) => {
          const prevIndex = Math.max(state.currentQuestion - 1, 0);
          return { currentQuestion: prevIndex };
        });
      },

      goToQuestion: (index) => {
        set({ currentQuestion: Math.max(0, Math.min(index, 83)) });
      },

      setUserInfo: (info) => {
        set({ userInfo: info });
      },

      setDiagnosisResult: (result) => {
        set({ diagnosisResult: result });
      },

      reset: () => {
        set(initialState);
      },

      isComplete: () => {
        const { answers } = get();
        return answers.every((answer) => answer >= 1 && answer <= 5);
      },

      progress: () => {
        const { answers } = get();
        const answeredCount = answers.filter((answer) => answer >= 1 && answer <= 5).length;
        return Math.round((answeredCount / 84) * 100);
      },
    }),
    {
      name: 'sheventures-quiz-storage',
      partialize: (state) => ({
        currentQuestion: state.currentQuestion,
        answers: state.answers,
        userInfo: state.userInfo,
        diagnosisResult: state.diagnosisResult,
      }),
    }
  )
);
