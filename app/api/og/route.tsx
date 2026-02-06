import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const archetypeName = searchParams.get('name') || '창업가';
    const archetypeAlias = searchParams.get('alias') || '유형';
    const level = searchParams.get('level') || 'LIGHT';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            backgroundImage: 'linear-gradient(135deg, #faf5ff 0%, #fce7f3 50%, #fff7ed 100%)',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: level === 'LIGHT' ? '#10b981' : '#6b7280',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '9999px',
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '32px',
            }}
          >
            {level === 'LIGHT' ? '✨ LIGHT MODE' : '🌑 SHADOW MODE'}
          </div>

          {/* Main Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                backgroundClip: 'text',
                color: 'transparent',
                textAlign: 'center',
              }}
            >
              {archetypeAlias}
            </div>
            <div
              style={{
                fontSize: '48px',
                color: '#374151',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {archetypeName}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '28px',
              color: '#6b7280',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>쉬벤처스 창업가 DNA 진단</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG 이미지 생성 오류:', error);
    return new Response('OG 이미지 생성 실패', { status: 500 });
  }
}
