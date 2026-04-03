import { CheckCircle2 } from 'lucide-react';
import type { FormData } from '../types.ts';

export interface FinalStepProps {
  formData: FormData;
  handleSendEmail: () => void;
  isSending: boolean;
}

const FinalStep = ({ formData, handleSendEmail, isSending }: FinalStepProps) => {
  return (
    <div className="text-center py-10 space-y-6">
      <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={40} />
      </div>
      <p className="text-slate-600">
        인터뷰가 성공적으로 완료되었습니다. <br />
        입력하신 이메일({formData.email})에서 '마음 쉼표' 미식 모임 소식을 확인해주세요.
      </p>
      <button
        className="bg-slate-900 text-white px-10 py-4 mt-4 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSendEmail}
        disabled={isSending}
      >
        {isSending ? '결과 전송 중...' : '메인으로 돌아가기 및 메일 전송'}
      </button>
    </div>
  );
};

export default FinalStep;
