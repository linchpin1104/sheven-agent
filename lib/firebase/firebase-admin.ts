// Firebase Admin SDK (서버 사이드)
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let app: App | null = null;
let db: Firestore | null = null;
let isFirebaseAvailable = false;

// Firebase 초기화 시도
try {
  // 환경 변수에서 서비스 계정 키를 가져옴
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : undefined;

  if (serviceAccount && serviceAccount.project_id && serviceAccount.private_key) {
    // 유효한 서비스 계정이 있을 때만 초기화
    if (getApps().length === 0) {
      app = initializeApp({
        credential: cert(serviceAccount),
      });
    } else {
      app = getApps()[0];
    }
    db = getFirestore(app);
    isFirebaseAvailable = true;
    console.log('✅ Firebase Admin SDK가 정상적으로 초기화되었습니다.');
  } else if (process.env.FIREBASE_EMULATOR_HOST) {
    // Firebase 에뮬레이터 사용
    if (getApps().length === 0) {
      app = initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
      });
    } else {
      app = getApps()[0];
    }
    db = getFirestore(app);
    isFirebaseAvailable = true;
    console.log('✅ Firebase Emulator에 연결되었습니다.');
  } else {
    console.warn('⚠️ Firebase 인증 정보가 없습니다. 개발 모드에서는 메모리 저장소를 사용합니다.');
    console.warn('프로덕션 배포 시 FIREBASE_SERVICE_ACCOUNT_KEY 환경 변수를 설정해주세요.');
    isFirebaseAvailable = false;
  }
} catch (error) {
  console.error('❌ Firebase Admin 초기화 실패:', error);
  console.warn('⚠️ 개발 모드에서는 메모리 저장소를 사용합니다.');
  isFirebaseAvailable = false;
  app = null;
  db = null;
}

export { app, db, isFirebaseAvailable };
