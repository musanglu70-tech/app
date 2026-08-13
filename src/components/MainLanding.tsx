/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { USP_LIST } from '../data';
import WooriLogo from './WooriLogo';
import { BadgePercent, TrendingUp, Clock, Users, ArrowRight, CheckCircle2, Award, ChevronRight, Zap } from 'lucide-react';
import banner10Years from '../assets/banner-10years.png';

interface MainLandingProps {
  onNavigateToCalculator: () => void;
  onNavigateToInquiry: () => void;
}

export default function MainLanding({ onNavigateToCalculator, onNavigateToInquiry }: MainLandingProps) {
  
  // Icon mapper helper
  const getIcon = (name: string) => {
    switch (name) {
      case 'BadgePercent':
        return <BadgePercent className="w-8 h-8 text-brand-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-8 h-8 text-blue-600" />;
      case 'Clock':
        return <Clock className="w-8 h-8 text-amber-500" />;
      case 'Users':
        return <Users className="w-8 h-8 text-emerald-600" />;
      default:
        return <Award className="w-8 h-8 text-indigo-500" />;
    }
  };

  return (
    <div id="landing-hero-view" className="space-y-12">
      
      {/* Hero Presentation Banner (Inspired by Slide 1 & Slide 2 main card) */}
      <div className="gradient-bg rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
        {/* Abstract decorative graphic mimicking the geometric lines of Slide 1 */}
        <div className="absolute top-0 right-0 w-80 h-80 border-t border-r border-white/5 rounded-tr-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute top-4 right-4 w-72 h-72 border-t border-r border-white/10 rounded-tr-3xl -mr-12 -mt-12 pointer-events-none"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-6">
          
          {/* Slogan */}
          <button
            onClick={onNavigateToInquiry}
            className="inline-flex items-center gap-2 bg-yellow-400/15 hover:bg-yellow-400/25 border border-yellow-400/20 hover:border-yellow-400/40 px-4 py-1.5 rounded-full text-yellow-300 text-xs font-black tracking-widest uppercase transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
            title="파트너 상담 신청 바로가기"
          >
            <Zap className="w-3.5 h-3.5 fill-yellow-300 stroke-yellow-300 text-yellow-300 shrink-0" />
            선택은 자유! 체크는 필수!
          </button>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Reflected Logo from PowerPoint Slide 1 */}
              <div className="bg-white p-1 rounded-2xl shadow-sm shrink-0">
                <WooriLogo size="sm" />
              </div>
              <span className="text-xl md:text-2xl font-extrabold tracking-tight text-brand-100">CSO (주)우리메디텍</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.25] font-display">
              수수료율,<br />
              <span className="text-yellow-300 font-black">아직도 비교 안하고</span> 계신가요?
            </h1>

            {/* 10주년 신뢰 배너 */}
            <img
              src={banner10Years}
              alt="CSO 사업 10여년을 대표님들과 함께했습니다"
              className="w-full h-auto rounded-2xl shadow-lg block"
              style={{ aspectRatio: '1983 / 793', objectFit: 'contain' }}
              draggable={false}
            />

          </div>

          {/* Interactive CTA Trigger */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3.5">
            <button
              id="hero-go-calc"
              type="button"
              onClick={onNavigateToCalculator}
              className="bg-white hover:bg-slate-100 text-[#0f172a] font-black text-base py-4.5 px-9 rounded-full transition-all duration-200 shadow-lg flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>CSO (주)우리메디텍 수수료 확인하기</span>
              <ArrowRight className="w-5 h-5 text-[#0f172a] shrink-0 stroke-[2.5]" />
            </button>
            
            <button
              id="hero-go-inquiry"
              type="button"
              onClick={onNavigateToInquiry}
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-extrabold text-base py-4.5 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>전담 안내 신청하기</span>
            </button>
          </div>

        </div>

        {/* Isometric Clipboard Illustration Mock (Inspired by Slide 2 graphic layout) */}
        <div className="hidden lg:block absolute bottom-6 right-10 w-[240px] xl:w-[280px]">
          <a 
            href="https://blog.naver.com/woorimedi2018/224247399306"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-2xl p-5 border border-white/20 shadow-2xl relative transition-all duration-300 hover:rotate-1 hover:scale-[1.03] cursor-pointer text-left"
            title="우리메디텍 공식 블로그 글 바로가기"
          >
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
                CSO (주)우리메디텍 월 처방 정산서
              </span>
              <span className="text-[10px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-bold">LIVE</span>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400">정산 요율 등급</p>
                <p className="text-sm font-bold text-slate-800">VIP 플러스 위탁 요율</p>
              </div>

               <div className="space-y-1">
                <p className="text-[10px] text-slate-400">월 매출액</p>
                <p className="text-sm font-bold text-slate-800 font-mono">₩ 50,000,000원</p>
              </div>

              <div className="space-y-1 pt-1 border-t border-slate-50">
                <p className="text-[10px] text-brand-500 font-bold">타사 대비 상승 환급액</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-brand-600 font-mono">+1,500,000원</span>
                  <span className="text-[9px] text-slate-400 font-semibold">(연 1,800만원 추가 수혜)</span>
                </div>
              </div>
            </div>
            
            {/* Overlay badge matching percentage label of PPT Slide 2 */}
            <div className="absolute -bottom-4 -left-4 bg-brand-600 border border-brand-500 text-white rounded-full w-14 h-14 flex flex-col justify-center items-center shadow-lg uppercase font-sans">
              <span className="text-[10px] font-bold">UP TO</span>
              <span className="text-sm font-black font-mono leading-none">30%</span>
            </div>
          </a>
        </div>

      </div>

      {/* Visual USP Grid Section (Inspired by Slide 2's 4 columns) */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
            CSO (주)우리메디텍이 다른 특별한 4가지 이유 
          </h2>
          <p className="text-xs text-slate-400">
            파트너 파워 MR님들을 위해 준비된 독점 가치 혜택을 비교해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {USP_LIST.map((usp, i) => (
            <div
              key={i}
              id={`usp-card-${i}`}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-3 bg-slate-50 rounded-xl w-fit">
                {getIcon(usp.icon)}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">
                  {usp.title}
                </h3>
                <h4 className="text-base font-black text-slate-800">
                  {usp.subtitle}
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {usp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Big Secondary Interactive Call-out mimicking Slide 2 Bottom Banner link */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        
        <div className="space-y-1.5 text-center sm:text-left relative z-10">
          <h4 className="font-extrabold text-white text-base md:text-lg flex items-center justify-center sm:justify-start gap-1.5">
            지금 바로 수수료 인센티브 혜택을 확인해 보세요!
          </h4>
          <p className="text-white/60 text-xs">
            수수료 1% 수혜 차이도 연간 수백만원에서 수천만원의 가치를 증명합니다.
          </p>
        </div>

        <a
          id="cta-bottom-banner"
          href="https://blog.naver.com/woorimedi2018/224247399306"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-xs md:text-sm py-3 px-5 rounded-xl transition-all duration-200 shadow-md shrink-0 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
        >
          <span>CSO(주)우리메디텍 블로그 확인하기</span>
          <ArrowRight className="w-4 h-4 text-slate-900" />
        </a>
      </div>

    </div>
  );
}
