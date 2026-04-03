import emailjs from '@emailjs/browser';
import type { FormData } from '../types';

export const sendSurveyEmail = async (formData: FormData): Promise<boolean> => {
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceID || !templateID || !publicKey) {
    console.error('EmailJS credentials are missing! Check your .env file.');
    return false;
  }

  // 상세 내용을 보고서 형식으로 정중하게 변환 ({{message}}에 들어갈 내용)
  // 인덴트를 제거하여 pre-wrap 적용 시 깔끔하게 노출되도록 함
  const messageBody = [
    `[1. 식습관 분석]`,
    `• 중요 가치: ${formData.priority}`,
    `• 정보 획득: ${formData.source.join(', ')}`,
    `• 활동 비중: 배달 ${formData.deliveryRatio}% / 오프라인 ${100 - formData.deliveryRatio}%`,
    ``,
    `[2. 심리 및 정서 데이터]`,
    `• 소울 푸드: ${formData.soulFood}`,
    `• 대화 선호도: ${formData.convQuality}`,
    `• 최근의 행복: ${formData.happyMoment}`,
    ``,
    `[3. 커뮤니티 니즈]`,
    `• 모임 참여 의향: ${formData.communityIntent}`,
    `• 필요한 휴식: ${formData.restNeeds}`,
    `• 희망 멘토링: ${formData.mentoring}`
  ].join('\n');

  // 템플릿 변수에 맞게 매핑
  const templateParams = {
    from_name: formData.email.split('@')[0],
    to_email: formData.email,
    reply_to: formData.email,
    subject: "나만의 미식 라이프스타일 분석 결과 보고서",
    message: messageBody,
    send_time: new Date().toLocaleString('ko-KR'),
  };

  try {
    const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
    console.log('Email sent successfully!', response.status, response.text);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};
