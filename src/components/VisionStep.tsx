import { CheckCircle2 } from 'lucide-react';
import type { FormData } from '../types.ts';

export interface VisionStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const VisionStep = ({ formData, setFormData }: VisionStepProps) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-900">가치관을 공유하는 미식 모임 참여 의향</label>
        <div className="grid grid-cols-2 gap-2">
          {['매우 있음', '주제에 따라 다름', '보통', '없음'].map(item => (
            <button
              key={item}
              onClick={() => setFormData({ ...formData, communityIntent: item })}
              className={`p-3 rounded-xl border text-sm transition-all ${formData.communityIntent === item ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-900">요즘 당신에게 가장 필요한 '마음의 휴식'은?</label>
        <input
          className="w-full p-4 rounded-xl border border-slate-200 outline-none"
          placeholder="잠시 멈춰 서서 생각하고 싶은 주제가 있다면?"
          value={formData.restNeeds}
          onChange={(e) => setFormData({ ...formData, restNeeds: e.target.value })}
        />
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-900">도움 받고 싶은 멘토링 프로그램</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {['대인관계', '진로/취업', '자존감/심리', '경제적 자유'].map(item => (
            <button
              key={item}
              onClick={() => setFormData({ ...formData, mentoring: item })}
              className={`p-4 rounded-xl border text-sm text-left flex justify-between items-center ${formData.mentoring === item ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white text-slate-600 border-slate-200'}`}
            >
              {item}
              {formData.mentoring === item && <CheckCircle2 size={18} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisionStep;
