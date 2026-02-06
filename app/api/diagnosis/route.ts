import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { db, isFirebaseAvailable } from '@/lib/firebase/firebase-admin';
import { DiagnosisSubmitSchema } from '@/lib/validation';
import { runDiagnosis } from '@/lib/logic';
import { setData } from '@/lib/in-memory-store';

export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const body = await request.json();

    // Zod 검증
    const validationResult = DiagnosisSubmitSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: '유효하지 않은 입력입니다.', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { answers, userInfo } = validationResult.data;

    // 진단 로직 실행
    const diagnosis = runDiagnosis(answers);

    // 결과 데이터 구성 (undefined 값 제거)
    const diagnosisData = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...(userInfo && { userInfo }), // userInfo가 있을 때만 포함
      scores: diagnosis.scores,
      result: diagnosis.result,
      rawAnswers: answers,
    };

    // Firestore 또는 In-Memory 저장소에 저장
    if (isFirebaseAvailable && db) {
      await db.collection('diagnosis_results').doc(diagnosisData.id).set(diagnosisData, { merge: true });
    } else {
      // 개발 환경: 메모리에 저장
      setData(diagnosisData.id, diagnosisData);
      console.log('📝 개발 모드: 메모리 저장소에 저장됨 (ID:', diagnosisData.id, ')');
    }

    // 응답 반환
    return NextResponse.json({
      id: diagnosisData.id,
      result: diagnosisData.result,
      scores: diagnosisData.scores,
    });
  } catch (error) {
    console.error('진단 처리 중 오류 발생:', error);
    return NextResponse.json(
      { error: '진단 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
