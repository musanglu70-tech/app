/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import MainLanding from './components/MainLanding';
import InteractiveCalculator from './components/InteractiveCalculator';
import InquiryForm from './components/InquiryForm';
import InfoHub from './components/InfoHub';
import WooriLogo from './components/WooriLogo';
import CommissionInfoModal from './components/CommissionInfoModal';
import ContactPopupModal from './components/ContactPopupModal';
import { Inquiry } from './types';
import PrivacyPolicy from './components/PrivacyPolicy';
import { 
  Calculator, UserCheck, HelpCircle, Home, FileClock, PhoneCall, 
  MapPin, ClipboardCheck, Award, Sparkles 
} from 'lucide-react';

export default function App() {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/privacy')) {
    return <PrivacyPolicy />;
  }

  const [activeTab, setActiveTab] = useState<'home' | 'faqs'>('home');
  const [isCommissionModalOpen, setIsCommissionModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  
  // States forwarded from calculator to intake form
  const [salesVal, setSalesVal] = useState<number>(30000000);
  const [currentCommVal, setCurrentCommVal] = useState<number>(12);
  const [targetCommVal, setTargetCommVal] = useState<number>(15);

  // Keep track of count of inquiries for visual status pill
  const [inquiryCount, setInquiryCount] = useState<number>(0);

  // Sync inquiry count for displaying a notification indicator in header
  useEffect(() => {
    const updateCount = () => {
      const saved = localStorage.getItem('woori_inquiries');
      if (saved) {
        try {
          const list: Inquiry[] = JSON.parse(saved);
          setInquiryCount(list.length);
        } catch (e) {}
      } else {
        setInquiryCount(0);
      }
    };
    
    updateCount();
  }, [activeTab]);

  const handleStartInquiryFromCalculator = (sales: number, currentComm: number, targetComm: number) => {
    setSalesVal(sales);
    setCurrentCommVal(currentComm);
    setTargetCommVal(targetComm);
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Visual Top Highlight Ribbon */}
      <div className="bg-brand-800 text-white text-[11px] font-semibold py-2 px-4 text-center tracking-wide flex justify-center items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
        <span>[안내] CSO (주)우리메디텍 제약 파트너/MR 우대 혜택 수수료 프로모션 진행 중</span>
        <span className="hidden md:inline-block bg-yellow-400 text-slate-900 px-1.5 py-0.2 rounded font-black text-[9px] uppercase">수수료 우대</span>
      </div>

      {/* Corporate Global Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Logo Division */}
            <div 
              role="button"
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 select-none group shrink-0"
            >
              <div className="bg-slate-50 p-1 rounded-xl border border-slate-100 shadow-xs shrink-0 overflow-visible">
                <WooriLogo size="sm" allowEdit={false} />
              </div>
              <div>
                <h1 className="text-sm sm:text-base md:text-lg font-black text-slate-800 tracking-tight leading-none font-display">
                  CSO (주)우리메디텍
                </h1>
                <p className="text-[10px] text-slate-400 font-medium font-mono mt-0.5">CSO Partnership</p>
              </div>
            </div>

            {/* Navigation tabs */}
            <nav className="hidden md:flex gap-1.5 font-medium text-slate-600">
              <button
                id="nav-tab-home"
                type="button"
                onClick={() => setActiveTab('home')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'home' 
                    ? 'bg-brand-600 text-white shadow-sm' 
                    : 'hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>회사안내 / 도입</span>
              </button>

              <button
                id="nav-tab-inquiry"
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative cursor-pointer hover:bg-slate-100 hover:text-slate-800"
              >
                <UserCheck className="w-4 h-4 text-brand-600" />
                <span>파트너쉽 문의</span>
                {inquiryCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-brand-500 text-white font-mono text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse">
                    {inquiryCount}
                  </span>
                )}
              </button>

              <button
                id="nav-tab-faqs"
                type="button"
                onClick={() => setActiveTab('faqs')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'faqs' 
                    ? 'bg-brand-600 text-white shadow-sm' 
                    : 'hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>공동체 FAQ</span>
              </button>
            </nav>

            {/* Right Contact button */}
            <div className="flex items-center gap-2">
              <button
                id="header-cta-btn"
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs py-2 px-3.5 md:py-3 md:px-5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer glow-btn"
              >
                <PhoneCall className="w-3.5 h-3.5 text-white/90" />
                <span className="hidden sm:inline">정산 요율 상담하기</span>
                <span className="sm:hidden">상담신청</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
        
        {/* Dynamic header label representing current view */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-brand-600 font-extrabold tracking-widest uppercase flex items-center gap-1.5">
              <span className="w-1 h-3 bg-brand-600 rounded-full"></span>
              WOOREE MEDITECH CSO FRAMEWORK
            </span>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-brand-600 rounded-full self-center"></span>
              {activeTab === 'home' && '선택은 자유! 체크는 필수!'}
              {activeTab === 'faqs' && '신속하고 정직한 정보 아카이브'}
            </h2>
          </div>
          <p className="hidden md:block text-[11px] text-slate-400 font-mono">
            지역망: <span className="text-slate-600 font-bold">전국 16개 광역시 지원</span>
          </p>
        </div>

        {/* Dynamic rendering with simple tab containment */}
        <div id="view-container" className="focus:outline-none min-h-[500px]">
          {activeTab === 'home' && (
            <MainLanding 
              onNavigateToCalculator={() => setIsCommissionModalOpen(true)}
              onNavigateToInquiry={() => setIsContactModalOpen(true)}
            />
          )}

          {activeTab === 'faqs' && (
            <InfoHub />
          )}
        </div>

      </main>

      {/* Mobile Responsive Dock Navigation System */}
      <div
        className="md:hidden sticky bottom-0 z-40 w-full"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '22px 22px 0 0',
          boxShadow: '0 -6px 22px rgba(11, 42, 91, 0.14)',
          padding: '10px 10px calc(10px + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <div className="flex items-stretch gap-2">
          <button
            id="dock-home"
            type="button"
            onClick={() => {
              setActiveTab('home');
              setIsContactModalOpen(false);
            }}
            className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer"
            style={{
              background: 'linear-gradient(160deg, #1F4E96 0%, #0E2C5E 100%)',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px 4px',
              border: (activeTab === 'home' && !isContactModalOpen)
                ? '2px solid #5BA4FF'
                : '2px solid transparent',
              boxShadow: (activeTab === 'home' && !isContactModalOpen)
                ? '0 6px 16px rgba(31, 78, 150, 0.4)'
                : '0 2px 6px rgba(11, 42, 91, 0.18)',
              transform: (activeTab === 'home' && !isContactModalOpen) ? 'translateY(-2px)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <Home style={{ width: '24px', height: '24px' }} />
            <span style={{ fontSize: '12px', lineHeight: '1.2', fontWeight: 700 }}>홈</span>
          </button>

          <button
            id="dock-inquiry"
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer relative"
            style={{
              background: 'linear-gradient(160deg, #3B82E8 0%, #1E5AAE 100%)',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px 4px',
              border: isContactModalOpen ? '2px solid #9CC7FF' : '2px solid transparent',
              boxShadow: isContactModalOpen
                ? '0 6px 16px rgba(59, 130, 232, 0.4)'
                : '0 2px 6px rgba(11, 42, 91, 0.18)',
              transform: isContactModalOpen ? 'translateY(-2px)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <UserCheck style={{ width: '24px', height: '24px' }} />
            <span style={{ fontSize: '12px', lineHeight: '1.2', fontWeight: 700 }}>파트너쉽</span>
            {inquiryCount > 0 && (
              <span className="absolute top-1 right-2 bg-red-500 text-white font-black font-mono text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {inquiryCount}
              </span>
            )}
          </button>

          <button
            id="dock-faqs"
            type="button"
            onClick={() => {
              setActiveTab('faqs');
              setIsContactModalOpen(false);
            }}
            className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer"
            style={{
              background: 'linear-gradient(160deg, #2FB3AE 0%, #16867F 100%)',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px 4px',
              border: (activeTab === 'faqs' && !isContactModalOpen)
                ? '2px solid #8FE3DE'
                : '2px solid transparent',
              boxShadow: (activeTab === 'faqs' && !isContactModalOpen)
                ? '0 6px 16px rgba(47, 179, 174, 0.4)'
                : '0 2px 6px rgba(11, 42, 91, 0.18)',
              transform: (activeTab === 'faqs' && !isContactModalOpen) ? 'translateY(-2px)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <HelpCircle style={{ width: '24px', height: '24px' }} />
            <span style={{ fontSize: '12px', lineHeight: '1.2', fontWeight: 700 }}>도움말</span>
          </button>
        </div>
      </div>

      {/* Professional Footer Structure */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Logo and slogan column */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2">
                <div 
                  className="bg-white p-1 rounded-xl select-none shrink-0"
                >
                  <WooriLogo size="sm" />
                </div>
                <span className="font-bold text-white text-sm">CSO (주)우리메디텍 (Wooree Meditech)</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px] max-w-sm">
                CSO (주)우리메디텍은 제약 직거래 물류 및 전문 CSO 대행 협치의 선두주자로서, 일차 병의원 및 대형 처방 파트너분들의 수익 극대화와 투명한 빠른 정산을 사명으로 삼고 있습니다.
              </p>
              <p className="text-slate-500 text-[10px]">
                법인등록번호: 240-82-XXXXX | 대표이사: CSO (주)우리메디텍 대표단
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-3">
              <h5 className="font-bold text-white text-xs">서비스 바로가기</h5>
              <ul className="space-y-2 text-[11px]">
                <li><button type="button" onClick={() => setActiveTab('home')} className="hover:text-white cursor-pointer">CSO (주)우리메디텍 소개</button></li>
                <li><button type="button" onClick={() => setIsCommissionModalOpen(true)} className="hover:text-white cursor-pointer">실시간 수수료 비교 시뮬레이터</button></li>
                <li><button type="button" onClick={() => setIsContactModalOpen(true)} className="hover:text-white cursor-pointer">파트너 가입 요율 상담</button></li>
                <li><button type="button" onClick={() => setActiveTab('faqs')} className="hover:text-white cursor-pointer">자주 묻는 질문 모음</button></li>
              </ul>
            </div>

            {/* Legal Statement Column */}
            <div className="space-y-3">
              <h5 className="font-bold text-white text-xs">고객안심보장제</h5>
              <p className="text-slate-500 text-[10px] leading-relaxed">
                CSO (주)우리메디텍은 파트너 정보 보호를 위해 <strong>개인정보 암호화 원칙</strong>을 엄수하며 어떠한 대리 처방도 불법 알선에 동참하지 않습니다. 제공하는 모든 제약 우대 정책 수수료율은 정직한 정보 공유를 근거로 제약사 규정에 맞춰 고지됩니다.
              </p>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500">
            <p>© 2026 Wooree Meditech CSO Inc. All rights reserved. [선택은 자유! 체크는 필수!]</p>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-slate-400">개인정보처리방침</a>
              <a href="#terms" className="hover:text-slate-400">이용약관</a>
              <a href="#rules" className="hover:text-slate-400">준법감시 가이드라인</a>
            </div>
          </div>

        </div>
      </footer>

      <CommissionInfoModal 
        isOpen={isCommissionModalOpen}
        onClose={() => setIsCommissionModalOpen(false)}
        onNavigateToInquiry={() => {
          setIsContactModalOpen(true);
        }}
        onProceedToCalculator={() => window.open('https://sscompare-m.ssart.co.kr/', '_blank', 'noopener,noreferrer')}
      />

      <ContactPopupModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

    </div>
  );
}
