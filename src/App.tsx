import { useState } from 'react';
import {
  ChevronRight,
  Utensils,
  Heart,
  CheckCircle2,
  Coffee,
  Instagram,
  MapPin,
  Youtube,
  Users,
  Smartphone,
  Mail
} from 'lucide-react';
import { sendSurveyEmail } from './services/emailService';

type FormDataValue = string | number | string[];

export type FormData = {
  email: string;
  priority: string;
  source: string[];
  deliveryRatio: number;
  soulFood: string;
  feeling: string;
  convQuality: string;
  happyMoment: string;
  communityIntent: string;
  restNeeds: string;
  mentoring: string;
  [key: string]: FormDataValue;
};

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
    if (step === 1 && !formData.email.includes('@')) {
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
      nextStep();
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
    // Step 0: Email Entry
    {
      title: "반갑습니다! 시작하기 전에,",
      subtitle: "설문 결과를 전달받으실 이메일을 입력해주세요.",
      content: (
        <div className="space-y-6 animate-in fade-in duration-500 py-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="email"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all text-lg"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <p className="text-sm text-slate-400 text-center">
            입력하신 이메일로 분석 결과와 미식 모임 소식을 보내드립니다.
          </p>
        </div>
      )
    },
    // Step 1: Intro Section (Old Step 0)
    {
      title: "2030 미식 라이프스타일",
      subtitle: "당신의 식탁 위에 '마음 쉼표'를 더하다",
      content: (
        <div className="text-center space-y-6">
          <button
            onClick={nextStep}
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
      )
    },
    // Section 1: Basic Habits
    {
      title: "Section 1. 식습관 및 소비 패턴",
      subtitle: "데이터의 기초가 되는 평소 습관을 확인합니다.",
      content: (
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
      )
    },
    // Section 2: Deep Dive
    {
      title: "Section 2. 미식 경험과 정서적 연결",
      subtitle: "온라인으로는 파악하기 힘든 '심리적 데이터'를 수집합니다.",
      content: (
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
      )
    },
    // Section 3: Vision
    {
      title: "Section 3. 소셜 커뮤니티 및 미래 니즈",
      subtitle: "당신의 마음이 쉬어갈 수 있는 자리를 준비합니다.",
      content: (
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
          <div className="pt-6">
            <button
              onClick={handleSendEmail}
              disabled={isSending}
              className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>전송 중...</>
              ) : (
                <>설문 완료 및 결과 전송하기 <ChevronRight size={20} /></>
              )}
            </button>
          </div>
        </div>
      )
    },
    // Final
    {
      title: "소중한 응답 감사합니다.",
      subtitle: `${formData.email} 주소로 분석 결과를 발송했습니다.`,
      content: (
        <div className="text-center py-10 space-y-6">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <p className="text-slate-600">
            인터뷰가 성공적으로 완료되었습니다. <br />
            입력하신 이메일에서 '마음 쉼표' 미식 모임 소식을 확인해주세요.
          </p>
          <button
            className="bg-slate-900 text-white px-10 py-4 rounded-full font-medium"
            onClick={() => window.location.reload()}
          >
            메인으로 돌아가기
          </button>
        </div>
      )
    }
  ];

  const currentSection = sections[step];

  return (
    <div className="min-h-screen bg-amber-100 font-sans text-slate-900">
      {/* Navigation Header */}
      <nav className="p-6 max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Coffee className="text-slate-900" />
          <span>Rest Period</span>
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