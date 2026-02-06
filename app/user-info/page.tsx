'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { User, Briefcase, Building2, ArrowRight } from 'lucide-react';

const businessCategories = [
  'IT/소프트웨어',
  'e커머스/리테일',
  '헬스케어/의료',
  '교육/에듀테크',
  '핀테크/금융',
  'F&B/외식',
  '제조/생산',
  '패션/뷰티',
  '미디어/콘텐츠',
  '물류/배송',
  '부동산/건설',
  'HR/채용',
  '마케팅/광고',
  '컨설팅/서비스',
  '기타',
];

const positions = [
  '대표',
  '씨레벨(임원)',
  '팀장(리더)',
  '팀원',
  '기타',
];

export default function UserInfoPage() {
  const router = useRouter();
  const { setUserInfo, userInfo } = useQuizStore();

  const [formData, setFormData] = useState({
    name: userInfo?.name || '',
    age: userInfo?.age?.toString() || '',
    gender: userInfo?.gender || '',
    position: userInfo?.position || '',
    positionOther: '',
    businessCategory: userInfo?.businessCategory || '',
    businessCategoryOther: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    age: '',
    gender: '',
    position: '',
    positionOther: '',
    businessCategory: '',
    businessCategoryOther: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 필수 항목 검증
    const newErrors = {
      name: '',
      age: '',
      gender: '',
      position: '',
      positionOther: '',
      businessCategory: '',
      businessCategoryOther: '',
    };

    let hasError = false;

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
      hasError = true;
    }

    if (!formData.age || parseInt(formData.age) < 18 || parseInt(formData.age) > 100) {
      newErrors.age = '올바른 연령을 입력해주세요. (18-100)';
      hasError = true;
    }

    if (!formData.gender) {
      newErrors.gender = '성별을 선택해주세요.';
      hasError = true;
    }

    if (!formData.position) {
      newErrors.position = '직책을 선택해주세요.';
      hasError = true;
    }

    if (formData.position === '기타' && !formData.positionOther.trim()) {
      newErrors.positionOther = '직책을 입력해주세요.';
      hasError = true;
    }

    if (!formData.businessCategory) {
      newErrors.businessCategory = '사업영역을 선택해주세요.';
      hasError = true;
    }

    if (formData.businessCategory === '기타' && !formData.businessCategoryOther.trim()) {
      newErrors.businessCategoryOther = '사업영역을 입력해주세요.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // UserInfo 저장
    const finalPosition = formData.position === '기타' ? formData.positionOther.trim() : formData.position;
    const finalBusinessCategory = formData.businessCategory === '기타' ? formData.businessCategoryOther.trim() : formData.businessCategory;

    setUserInfo({
      name: formData.name.trim(),
      age: parseInt(formData.age),
      gender: formData.gender as 'male' | 'female' | 'other' | 'prefer_not_to_say',
      position: finalPosition,
      businessCategory: finalBusinessCategory,
    });

    // 퀴즈 페이지로 이동
    router.push('/quiz');
  };

  const isFormValid = 
    formData.name.trim().length > 0 &&
    formData.age &&
    parseInt(formData.age) >= 18 &&
    parseInt(formData.age) <= 100 &&
    formData.gender &&
    formData.position &&
    (formData.position !== '기타' || formData.positionOther.trim().length > 0) &&
    formData.businessCategory &&
    (formData.businessCategory !== '기타' || formData.businessCategoryOther.trim().length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                시작하기 전에
              </CardTitle>
              <CardDescription className="text-base">
                더 정확한 분석을 위해 기본 정보를 입력해주세요
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 이름 (필수) */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-semibold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    이름 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData({ ...formData, name: e.target.value });
                      setErrors({ ...errors, name: '' });
                    }}
                    placeholder="홍길동"
                    className="text-base"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* 연령 (필수) */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-base font-semibold">
                    연령 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData({ ...formData, age: e.target.value });
                      setErrors({ ...errors, age: '' });
                    }}
                    placeholder="예: 35"
                    className="text-base"
                  />
                  {errors.age && (
                    <p className="text-sm text-red-500">{errors.age}</p>
                  )}
                </div>

                {/* 성별 (필수) */}
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-base font-semibold">
                    성별 <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, gender: value });
                      setErrors({ ...errors, gender: '' });
                    }}
                  >
                    <SelectTrigger className="text-base">
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">남성</SelectItem>
                      <SelectItem value="female">여성</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                      <SelectItem value="prefer_not_to_say">응답하지 않음</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-red-500">{errors.gender}</p>
                  )}
                </div>

                {/* 직책 (필수) */}
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-base font-semibold flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    직책 <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, position: value, positionOther: '' });
                      setErrors({ ...errors, position: '', positionOther: '' });
                    }}
                  >
                    <SelectTrigger className="text-base">
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.position && (
                    <p className="text-sm text-red-500">{errors.position}</p>
                  )}
                  
                  {/* 직책 기타 입력 */}
                  {formData.position === '기타' && (
                    <div className="mt-2">
                      <Input
                        value={formData.positionOther}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFormData({ ...formData, positionOther: e.target.value });
                          setErrors({ ...errors, positionOther: '' });
                        }}
                        placeholder="직책을 입력해주세요"
                        className="text-base"
                      />
                      {errors.positionOther && (
                        <p className="text-sm text-red-500 mt-1">{errors.positionOther}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* 사업영역 (필수) */}
                <div className="space-y-2">
                  <Label htmlFor="businessCategory" className="text-base font-semibold flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    사업영역 <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.businessCategory}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, businessCategory: value, businessCategoryOther: '' });
                      setErrors({ ...errors, businessCategory: '', businessCategoryOther: '' });
                    }}
                  >
                    <SelectTrigger className="text-base">
                      <SelectValue placeholder="선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.businessCategory && (
                    <p className="text-sm text-red-500">{errors.businessCategory}</p>
                  )}
                  
                  {/* 사업영역 기타 입력 */}
                  {formData.businessCategory === '기타' && (
                    <div className="mt-2">
                      <Input
                        value={formData.businessCategoryOther}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFormData({ ...formData, businessCategoryOther: e.target.value });
                          setErrors({ ...errors, businessCategoryOther: '' });
                        }}
                        placeholder="사업영역을 입력해주세요"
                        className="text-base"
                      />
                      {errors.businessCategoryOther && (
                        <p className="text-sm text-red-500 mt-1">{errors.businessCategoryOther}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* 제출 버튼 */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-lg"
                  >
                    진단 시작하기
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* 안내 문구 */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  * 모든 항목은 필수입니다.<br />
                  입력하신 정보는 더 정확한 분석을 위해서만 사용되며, 안전하게 보호됩니다.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* 돌아가기 버튼 */}
          <div className="text-center mt-6">
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← 홈으로 돌아가기
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
