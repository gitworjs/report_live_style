import { Utensils, Heart, Users } from 'lucide-react';

const IntroStep = () => {
  return (
    <div className="text-center space-y-6">
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
