import { useState } from 'react';
import {
  Coffee,
  ChevronRight
} from 'lucide-react';
import { sendSurveyEmail } from './services/emailService';
import type { FormData } from './types';
import EmailStep from './components/EmailStep';
import IntroStep from './components/IntroStep';
import HabitsStep from './components/HabitsStep';
import DeepDiveStep from './components/DeepDiveStep';
import VisionStep from './components/VisionStep';
import FinalStep from './components/FinalStep';

const App = () => {
  const [step, setStep] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    priority: '',
    source: [],
    deliveryRatio: 50,
    soulFood: '',
    feeling: '',
    convQuality: '',
    happyMoment: '',
    communityIntent: '',
    restNeeds: '',
    mentoring: ''
  });

  const nextStep = () => {
    if (step === 0 && !formData.email.includes('@')) {
      alert('올바른 이메일 주소를 입력해주세요.');
      return;
    }
    setStep(prev => prev + 1);
  };
  const prevStep = () => setStep(prev => prev - 1);

  const handleSendEmail = async () => {
    setIsSending(true);
    const success = await sendSurveyEmail(formData);
    setIsSending(false);

    if (success) {
      window.location.reload();
    } else {
      alert('이메일 전송에 실패했습니다. 설정을 확인해주세요.');
    }
  };

  const handleCheckbox = (field: string, value: string) => {
    const current = formData[field] as string[];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter(i => i !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const sections = [
    {
      title: "반갑습니다! 시작하기 전에,",
      subtitle: "설문 결과를 전달받으실 이메일을 입력해주세요.",
      content: <EmailStep formData={formData} setFormData={setFormData} />
    },
    {
      title: "2030 미식 라이프스타일",
      subtitle: "당신의 식탁 위에 '마음 쉼표'를 더하다",
      content: <IntroStep onNext={nextStep} />
    },
    {
      title: "Section 1. 식습관 및 소비 패턴",
      subtitle: "데이터의 기초가 되는 평소 습관을 확인합니다.",
      content: <HabitsStep formData={formData} setFormData={setFormData} handleCheckbox={handleCheckbox} />
    },
    {
      title: "Section 2. 미식 경험과 정서적 연결",
      subtitle: "온라인으로는 파악하기 힘든 '심리적 데이터'를 수집합니다.",
      content: <DeepDiveStep formData={formData} setFormData={setFormData} />
    },
    {
      title: "Section 3. 소셜 커뮤니티 및 미래 니즈",
      subtitle: "당신의 마음이 쉬어갈 수 있는 자리를 준비합니다.",
      content: <VisionStep formData={formData} setFormData={setFormData} />
    },
    {
      title: "소중한 응답 감사합니다.",
      subtitle: `${formData.email} 주소로 분석 결과를 발송하겠습니다.`,
      content: <FinalStep formData={formData} handleSendEmail={handleSendEmail} isSending={isSending} />
    }
  ];

  const currentSection = sections[step];

  return (
    <div className="min-h-screen bg-amber-100 font-sans text-slate-900">
      {/* Navigation Header */}
      <nav className="p-6 max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Coffee className="text-slate-900" />
          <span onClick={() => window.location.reload()} className="cursor-pointer">Rest Period</span>
        </div>
        <div className="text-sm font-medium text-slate-400">
          Step {step + 1} / {sections.length}
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Progress Bar */}
        {step > 0 && step < sections.length - 1 && (
          <div className="w-full bg-slate-200 h-1 rounded-full mb-12 overflow-hidden">
            <div
              className="bg-slate-900 h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / (sections.length - 2)) * 100}%` }}
            />
          </div>
        )}

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <header className="mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight">
              {currentSection.title}
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-medium">
              {currentSection.subtitle}
            </p>
          </header>

          {currentSection.content}

          {/* Action Buttons */}
          {step > 1 && step < sections.length - 1 && (
            <div className="flex gap-4 mt-12">
              <button
                onClick={prevStep}
                className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all"
              >
                이전
              </button>
              <button
                onClick={nextStep}
                className="flex-[2] py-4 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
              >
                다음 단계로
              </button>
            </div>
          )}

          {step === 0 && (
            <div className="mt-8">
              <button
                onClick={nextStep}
                className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
              >
                다음으로 넘어가기 <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <footer className="mt-12 text-center text-slate-400 text-xs leading-relaxed">
          <p>© 2026 Gourmet AI Labs. Personalization through emotional data.</p>
          <p className="mt-1 italic">본 인터뷰지는 2030 세대의 건강한 미식 문화와 정서적 휴식을 지향합니다.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;