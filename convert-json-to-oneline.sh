#!/bin/bash
# Firebase 서비스 계정 키를 한 줄로 변환하는 스크립트

if [ -f "acms-system-new-firebase-adminsdk-fbsvc-e0e026adb5.json" ]; then
    echo "🔄 JSON 파일을 한 줄로 변환 중..."
    cat acms-system-new-firebase-adminsdk-fbsvc-e0e026adb5.json | jq -c
    echo ""
    echo "✅ 위의 출력을 복사하여 Vercel의 FIREBASE_SERVICE_ACCOUNT_KEY 환경 변수에 붙여넣으세요."
else
    echo "❌ 파일을 찾을 수 없습니다: acms-system-new-firebase-adminsdk-fbsvc-e0e026adb5.json"
fi
