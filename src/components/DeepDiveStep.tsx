import type { FormData } from '../types.ts';

interface DeepDiveStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const DeepDiveStep = ({ formData, setFormData }: DeepDiveStepProps) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-900">지친 날 나를 위로해주는 '소울 푸드'는 무엇인가요?</label>
        <input
          className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
          placeholder="예: 따뜻한 김치찌개, 매콤한 떡볶이 등"
          value={formData.soulFood}
          onChange={(e) => setFormData({ ...formData, soulFood: e.target.value })}
        />
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-900">식사 중 '대화의 질'을 어떻게 생각하시나요?</label>
        <div className="space-y-2">
          {['음식에만 집중하는 편', '가벼운 수다가 좋음', '깊고 진솔한 대화를 선호함'].map((option) => (
            <div
              key={option}
              onClick={() => setFormData({ ...formData, convQuality: option })}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${formData.convQuality === option ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:bg-slate-50'}`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.convQuality === option ? 'border-slate-900' : 'border-slate-300'}`}>
                {formData.convQuality === option && <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />}
              </div>
              <span className="text-sm">{option}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-900">최근 식사를 하며 '정말 행복하다' 느꼈던 순간은?</label>
        <textarea
          className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none h-24"
          placeholder="어떤 사람과, 어떤 음식을 먹으며 느꼈던 감정인가요?"
          value={formData.happyMoment}
          onChange={(e) => setFormData({ ...formData, happyMoment: e.target.value })}
        />
      </div>
    </div>
  );
};

export default DeepDiveStep;
