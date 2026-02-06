#!/bin/bash
# Vercel CLI를 사용한 배포 스크립트

echo "🚀 Vercel 배포 시작..."
echo ""

# Vercel CLI 설치 확인
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI를 설치합니다..."
    npm install -g vercel
fi

echo "🔐 Vercel 로그인..."
vercel login

echo ""
echo "📤 프로덕션 배포 중..."
echo ""
echo "⚠️  주의: 환경 변수는 Vercel Dashboard에서 수동으로 설정해야 합니다."
echo "   https://vercel.com/dashboard > Settings > Environment Variables"
echo ""

vercel --prod
