import { NextRequest, NextResponse } from 'next/server';
import { db, isFirebaseAvailable } from '@/lib/firebase/firebase-admin';
import { DiagnosisData } from '@/types';
import { getData, hasData } from '@/lib/in-memory-store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let data: DiagnosisData | null = null;

    // Firestore 또는 In-Memory 저장소에서 결과 조회
    if (isFirebaseAvailable && db) {
      const docRef = db.collection('diagnosis_results').doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        return NextResponse.json(
          { error: '결과를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      data = doc.data() as DiagnosisData;
    } else {
      // 개발 환경: 메모리에서 조회
      if (!hasData(id)) {
        return NextResponse.json(
          { error: '결과를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      data = getData(id) as DiagnosisData;
      console.log('📖 개발 모드: 메모리 저장소에서 조회됨 (ID:', id, ')');
    }

    if (!data) {
      return NextResponse.json(
        { error: '결과를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 응답 반환 (rawAnswers는 제외)
    return NextResponse.json({
      id: data.id,
      createdAt: data.createdAt,
      userInfo: data.userInfo,
      scores: data.scores,
      result: data.result,
    });
  } catch (error) {
    console.error('결과 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '결과 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
