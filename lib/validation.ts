import { z } from 'zod';

// 진단 제출 요청 스키마
export const DiagnosisSubmitSchema = z.object({
  answers: z.array(z.number().int().min(1).max(5)).length(84, '답변은 정확히 84개여야 합니다.'),
  userInfo: z.object({
    name: z.string().min(1, '이름은 필수입니다.'),
    age: z.number().int().min(18).max(100).optional(),
    gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
    position: z.string().optional(),
    businessCategory: z.string().optional(),
    email: z.string().email().optional(),
    startupStage: z.enum(['seed', 'pre-a', 'series-a']).optional(),
  }).optional(),
});

export type DiagnosisSubmitInput = z.infer<typeof DiagnosisSubmitSchema>;
