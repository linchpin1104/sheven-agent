'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResultHeader } from '@/components/result/ResultHeader';
import { RadarChartComponent } from '@/components/result/RadarChart';
import { ActionPlan } from '@/components/result/ActionPlan';
import { ResultSummary } from '@/components/result/ResultSummary';
import { ReflectionQuestions } from '@/components/result/ReflectionQuestions';
import { StrengthsWeaknesses } from '@/components/result/StrengthsWeaknesses';
import { ARCHETYPES, getArchetypeKey } from '@/constants/archetypes';
import { findWeakestMuscle } from '@/lib/logic';
import { DiagnosisData } from '@/types';
import { motion } from 'framer-motion';
import { Share2, Download, Home } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [data, setData] = useState<DiagnosisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/diagnosis/${resolvedParams.id}`);
        
        if (!response.ok) {
          throw new Error('결과를 불러올 수 없습니다.');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('결과 조회 오류:', err);
        setError('결과를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resolvedParams.id]);

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '쉬벤처스 창업가 DNA 진단 결과',
          text: `나의 창업가 유형은 "${archetype?.alias}"입니다!`,
          url,
        });
      } catch (err) {
        console.error('공유 오류:', err);
      }
    } else {
      // Fallback: 클립보드에 복사
      try {
        await navigator.clipboard.writeText(url);
        alert('링크가 클립보드에 복사되었습니다!');
      } catch (err) {
        console.error('클립보드 복사 오류:', err);
      }
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById('result-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = `sheventures-result-${resolvedParams.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('이미지 다운로드 오류:', err);
      alert('이미지 다운로드 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">오류 발생</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{error || '결과를 찾을 수 없습니다.'}</p>
            <Button onClick={() => router.push('/')} className="w-full">
              홈으로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // DB에 저장된 archetype 사용 (없으면 fallback으로 constants에서 찾기)
  const archetype = data.result.archetype || (() => {
    const archetypeKey = getArchetypeKey(
      data.result.rootDominance,
      data.result.majorMuscle,
      data.result.minorMuscle
    );
    return ARCHETYPES[archetypeKey];
  })();
  
  const weakestMuscle = findWeakestMuscle(data.scores.muscle);

  if (!archetype) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <p className="text-gray-600">유형 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-end gap-2"
        >
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            공유
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            다운로드
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push('/')}>
            <Home className="w-4 h-4 mr-2" />
            홈
          </Button>
        </motion.div>

        {/* Result Content */}
        <div id="result-content" className="bg-white rounded-2xl p-8 shadow-2xl space-y-8">
          {/* Header */}
          <ResultHeader archetype={archetype} level={data.result.level} />

          {/* Summary */}
          <ResultSummary
            rootDominance={data.result.rootDominance}
            majorMuscle={data.result.majorMuscle}
            minorMuscle={data.result.minorMuscle}
          />

          {/* DNA Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-center">DNA 분석</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">태도</p>
                    <p className="text-xl font-bold text-blue-600">{data.result.rootDominance}</p>
                    <p className="text-xs text-gray-500 mt-1">{data.scores.root[data.result.rootDominance].toFixed(1)}점</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">주력 엔진</p>
                    <p className="text-xl font-bold text-purple-600">{data.result.majorMuscle}</p>
                    <p className="text-xs text-gray-500 mt-1">{data.scores.muscle[data.result.majorMuscle].toFixed(1)}점</p>
                  </div>
                  <div className="p-4 bg-pink-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">보조 엔진</p>
                    <p className="text-xl font-bold text-pink-600">{data.result.minorMuscle}</p>
                    <p className="text-xs text-gray-500 mt-1">{data.scores.muscle[data.result.minorMuscle].toFixed(1)}점</p>
                  </div>
                </div>
                <p className="text-center text-gray-700 leading-relaxed">
                  {archetype.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Radar Chart */}
          <RadarChartComponent
            rootScores={data.scores.root}
            muscleScores={data.scores.muscle}
          />

          {/* Strengths & Weaknesses */}
          <StrengthsWeaknesses
            muscleScores={data.scores.muscle}
            majorMuscle={data.result.majorMuscle}
            minorMuscle={data.result.minorMuscle}
            lightContent={archetype.light}
            shadowContent={archetype.shadow}
          />

          {/* Action Plan - 가장 약한 영역을 위한 실행 가이드 */}
          <ActionPlan weakestMuscle={weakestMuscle} action={archetype.action} />

          {/* Reflection Questions */}
          {archetype.reflectionQuestions && archetype.reflectionQuestions.length > 0 && (
            <ReflectionQuestions questions={archetype.reflectionQuestions} />
          )}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-4"
        >
          <Button
            onClick={() => router.push('/')}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            다시 진단하기
          </Button>
          <p className="text-sm text-gray-500">
            © 2026 SheVentures. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
