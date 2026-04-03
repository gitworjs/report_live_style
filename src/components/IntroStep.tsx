import { ChevronRight, Utensils, Heart, Users } from 'lucide-react';

export interface IntroStepProps {
  onNext: () => void;
}

const IntroStep = ({ onNext }: IntroStepProps) => {
  return (
    <div className="text-center space-y-6">
      <button
        onClick={onNext}
        className="bg-slate-900 text-white px-10 py-4 rounded-full font-medium flex items-center gap-2 mx-auto hover:bg-slate-800 transition-all transform hover:scale-105"
      >
        인터뷰 시작하기 <ChevronRight size={20} />
      </button>
      <div className="flex justify-center gap-8 text-slate-400 pt-8">
        <div className="flex flex-col items-center gap-1">
          <Utensils size={24} />
          <span className="text-xs">식습관 분석</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Heart size={24} />
          <span className="text-xs">정서적 연결</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Users size={24} />
          <span className="text-xs">미식 커뮤니티</span>
        </div>
      </div>
    </div>
  );
};

export default IntroStep;
