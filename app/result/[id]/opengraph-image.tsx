import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';
export const alt = '쉬벤처스 창업가 DNA 진단 결과';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  try {
    // API에서 결과 데이터 가져오기
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/diagnosis/${resolvedParams.id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch diagnosis data');
    }

    const data = await response.json();
    
    // Archetype 정보 가져오기
    const { ARCHETYPES, getArchetypeKey } = await import('@/constants/archetypes');
    const archetypeKey = getArchetypeKey(
      data.result.rootDominance,
      data.result.majorMuscle,
      data.result.minorMuscle
    );
    const archetype = ARCHETYPES[archetypeKey];

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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: data.result.level === 'LIGHT' ? '#10b981' : '#6b7280',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '9999px',
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '32px',
            }}
          >
            {data.result.level === 'LIGHT' ? '✨ LIGHT MODE' : '🌑 SHADOW MODE'}
          </div>

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
              {archetype.alias}
            </div>
            <div
              style={{
                fontSize: '48px',
                color: '#374151',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {archetype.name}
            </div>
          </div>

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
        ...size,
      }
    );
  } catch (error) {
    console.error('OG 이미지 생성 오류:', error);
    
    // Fallback 이미지
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
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #9333ea, #ec4899)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            쉬벤처스 창업가 DNA 진단
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
