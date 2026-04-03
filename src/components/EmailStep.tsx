import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import type { FormData } from '../types.ts';

interface EmailStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const DOMAINS = ['gmail.com', 'naver.com', 'daum.net', 'kakao.com', '직접 입력'];

const EmailStep = ({ formData, setFormData }: EmailStepProps) => {
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('gmail.com');
  const [isDirect, setIsDirect] = useState(false);

  // Initialize from formData if step changes back
  useEffect(() => {
    if (formData.email) {
      const [id, domain] = formData.email.split('@');
      setEmailId(id || '');
      if (domain && DOMAINS.includes(domain)) {
        setEmailDomain(domain);
        setIsDirect(false);
      } else if (domain) {
        setEmailDomain(domain);
        setIsDirect(true);
      }
    }
  }, []);

  const updateEmail = (id: string, domain: string) => {
    setFormData({ ...formData, email: `${id}@${domain}` });
  };

  const handleIdChange = (val: string) => {
    setEmailId(val);
    updateEmail(val, emailDomain);
  };

  const handleDomainSelect = (val: string) => {
    if (val === '직접 입력') {
      setIsDirect(true);
      setEmailDomain('');
      updateEmail(emailId, '');
    } else {
      setIsDirect(false);
      setEmailDomain(val);
      updateEmail(emailId, val);
    }
  };

  const handleDomainInput = (val: string) => {
    setEmailDomain(val);
    updateEmail(emailId, val);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 py-4">
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <div className="relative flex-1 w-full">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all text-lg"
            placeholder="이메일 아이디"
            value={emailId}
            onChange={(e) => handleIdChange(e.target.value)}
          />
        </div>
        <span className="hidden md:block text-slate-400 font-bold">@</span>
        <div className="flex gap-2 w-full md:w-auto flex-1">
          {isDirect ? (
            <input
              type="text"
              className="flex-1 px-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all text-lg"
              placeholder="도메인 입력"
              value={emailDomain}
              onChange={(e) => handleDomainInput(e.target.value)}
            />
          ) : (
            <select
              className="flex-1 px-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all text-lg bg-white appearance-none cursor-pointer"
              value={emailDomain}
              onChange={(e) => handleDomainSelect(e.target.value)}
            >
              {DOMAINS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          )}
          {isDirect && (
            <button
              onClick={() => handleDomainSelect('naver.com')}
              className="px-4 py-2 text-sm text-slate-400 hover:text-slate-600 underline"
            >
              목록에서 선택
            </button>
          )}
        </div>
      </div>
      <p className="text-sm text-slate-400 text-center">
        입력하신 이메일로 분석 결과와 미식 모임 소식을 보내드립니다.
      </p>
    </div>
  );
};

export default EmailStep;
