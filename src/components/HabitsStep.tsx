import { Instagram, MapPin, Youtube, Users, Smartphone } from 'lucide-react';
import type { FormData } from '../types.ts';

interface HabitsStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  handleCheckbox: (field: string, value: string) => void;
}

const HabitsStep = ({ formData, setFormData, handleCheckbox }: HabitsStepProps) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-4">식사 메뉴 선정 시 가장 중요하게 생각하는 요소는?</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['맛(퀄리티)', '가성비', '분위기(감성)', '건강/영양', '접근성'].map((item) => (
            <button
              key={item}
              onClick={() => setFormData({ ...formData, priority: item })}
              className={`p-3 rounded-xl border text-sm transition-all ${formData.priority === item ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-4">평소 맛집 정보를 얻는 주된 경로 (중복 선택)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { name: '인스타그램', icon: Instagram },
            { name: '네이버 블로그', icon: MapPin },
            { name: '유튜브', icon: Youtube },
            { name: '지인 추천', icon: Users },
            { name: '푸드 앱', icon: Smartphone }
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => handleCheckbox('source', item.name)}
              className={`p-3 rounded-xl border text-sm flex items-center justify-center gap-2 transition-all ${formData.source.includes(item.name) ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
            >
              <item.icon size={16} />
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-semibold text-slate-900">배달 앱 이용 vs 오프라인 방문 비중</label>
          <span className="text-sm text-indigo-600 font-bold">배달 {formData.deliveryRatio}% : 방문 {100 - formData.deliveryRatio}%</span>
        </div>
        <input
          type="range"
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          value={formData.deliveryRatio}
          onChange={(e) => setFormData({ ...formData, deliveryRatio: Number(e.target.value) })}
        />
      </div>
    </div>
  );
};

export default HabitsStep;
