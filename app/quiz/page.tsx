'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { QuestionScale } from '@/components/quiz/QuestionScale';
import { useQuizStore } from '@/lib/store';
import { QUESTIONS } from '@/constants/questions';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

const QUESTIONS_PER_PAGE = 15;
const TOTAL_PAGES = Math.ceil(84 / QUESTIONS_PER_PAGE); // 6 pages

export default function QuizPage() {
  const router = useRouter();
  const {
    answers,
    setAnswer,
    isComplete,
    userInfo,
  } = useQuizStore();

  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedQuestionIndex, setFocusedQuestionIndex] = useState(0);

  // 사용자 정보 확인 - 없으면 user-info로 리다이렉트
  useEffect(() => {
    if (mounted && !userInfo?.name) {
      router.push('/user-info');
    }
  }, [mounted, userInfo, router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 변수들을 먼저 정의
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, 84);
  const currentQuestions = QUESTIONS.slice(startIndex, endIndex);
  
  const answeredCount = answers.filter((a) => a >= 1 && a <= 5).length;
  const currentPageAnswered = answers
    .slice(startIndex, endIndex)
    .filter((a) => a >= 1 && a <= 5).length;
  const currentPageTotal = endIndex - startIndex;

  const canGoNext = currentPageAnswered === currentPageTotal;
  const isLastPage = currentPage === TOTAL_PAGES - 1;

  // 함수들을 useEffect 전에 정의
  const handleNext = useCallback(() => {
    if (canGoNext && !isLastPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [canGoNext, isLastPage]);

  const handlePrev = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleSubmit = useCallback(async () => {
    if (!isComplete()) {
      alert('모든 문항에 답변해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          answers,
          userInfo, // 사용자 정보 포함
        }),
      });

      if (!response.ok) {
        throw new Error('진단 제출 실패');
      }

      const data = await response.json();
      
      // 결과 페이지로 이동
      router.push(`/result/${data.id}`);
    } catch (error) {
      console.error('진단 제출 오류:', error);
      alert('진단 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  }, [isComplete, answers, userInfo, router]);

  // 키보드 입력 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const startIdx = currentPage * QUESTIONS_PER_PAGE;
      const currentQuestionGlobalIndex = startIdx + focusedQuestionIndex;
      const endIdx = Math.min(startIdx + QUESTIONS_PER_PAGE, 84);
      const questionsLength = endIdx - startIdx;

      // 숫자 키 1-5: 답변 입력
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const value = parseInt(e.key);
        setAnswer(currentQuestionGlobalIndex, value);
        
        // 자동으로 다음 문항으로 이동 (마지막 문항이 아닌 경우)
        if (focusedQuestionIndex < questionsLength - 1) {
          setFocusedQuestionIndex(prev => prev + 1);
        }
        e.preventDefault();
      }
      
      // 화살표 아래: 다음 문항
      else if (e.key === 'ArrowDown') {
        if (focusedQuestionIndex < questionsLength - 1) {
          setFocusedQuestionIndex(prev => prev + 1);
        }
        e.preventDefault();
      }
      
      // 화살표 위: 이전 문항
      else if (e.key === 'ArrowUp') {
        if (focusedQuestionIndex > 0) {
          setFocusedQuestionIndex(prev => prev - 1);
        }
        e.preventDefault();
      }
      
      // Enter: 다음 페이지 또는 제출
      else if (e.key === 'Enter') {
        if (isLastPage && canGoNext && isComplete()) {
          handleSubmit();
        } else if (canGoNext && !isLastPage) {
          handleNext();
        }
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, focusedQuestionIndex, canGoNext, isLastPage, handleNext, handleSubmit, setAnswer, isComplete]);

  // 페이지 변경 시 포커스 초기화
  useEffect(() => {
    setFocusedQuestionIndex(0);
  }, [currentPage]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            창업가 DNA 진단
          </h1>
          <p className="text-gray-600">
            페이지 {currentPage + 1} / {TOTAL_PAGES}
          </p>
        </motion.div>

        {/* Progress */}
        <QuizProgress
          current={startIndex}
          total={84}
          answeredCount={answeredCount}
        />

        {/* Questions Card */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-xl">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center justify-between">
                <span>
                  문항 {startIndex + 1}~{endIndex}
                </span>
                <span className="text-sm font-normal text-gray-500">
                  {currentPageAnswered} / {currentPageTotal} 답변 완료
                </span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-0">
                {currentQuestions.map((question, index) => (
                  <QuestionScale
                    key={question.id}
                    question={question}
                    value={answers[question.id - 1]}
                    onChange={(value) => setAnswer(question.id - 1, value)}
                    index={index}
                    isFocused={focusedQuestionIndex === index}
                    onFocus={() => setFocusedQuestionIndex(index)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Page Navigation */}
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_PAGES }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'bg-purple-600'
                  : index < currentPage
                  ? 'bg-purple-400'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handlePrev}
            disabled={currentPage === 0}
            variant="outline"
            className="flex-1 h-12"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            이전 페이지
          </Button>

          {isLastPage && canGoNext ? (
            <Button
              onClick={handleSubmit}
              disabled={!isComplete() || isSubmitting}
              className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isSubmitting ? (
                '제출 중...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  제출하기
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canGoNext}
              className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              다음 페이지
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center space-y-2">
          {!canGoNext && (
            <p className="text-amber-600 font-medium text-sm">
              ⚠️ 이 페이지의 모든 문항에 답변해야 다음으로 이동할 수 있습니다
            </p>
          )}
          {isComplete() ? (
            <p className="text-green-600 font-semibold">
              ✓ 모든 문항에 답변하셨습니다. 제출해주세요!
            </p>
          ) : (
            <p className="text-gray-500 text-sm">
              총 {84 - answeredCount}개 문항이 남았습니다
            </p>
          )}
        </div>

        {/* Quick Tips */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 space-y-2">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> 각 문항을 읽고 1(전혀 아니다)부터 5(매우 그렇다)까지 중 가장 가까운 숫자를 선택하세요. 
              깊이 생각하지 말고 직관적으로 답변하는 것이 정확한 결과를 얻는 비결입니다.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-blue-800 pt-2 border-t border-blue-200">
              <span className="font-semibold">⌨️ 키보드 단축키:</span>
              <span className="bg-white px-2 py-1 rounded">1-5 숫자</span>
              <span className="text-blue-600">답변 입력</span>
              <span className="bg-white px-2 py-1 rounded">↑ ↓</span>
              <span className="text-blue-600">문항 이동</span>
              <span className="bg-white px-2 py-1 rounded">Enter</span>
              <span className="text-blue-600">다음 페이지</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
