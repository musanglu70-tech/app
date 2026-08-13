/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Megaphone, X, PhoneCall, ExternalLink } from 'lucide-react';

interface CommissionInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToInquiry: () => void;
  onProceedToCalculator: () => void;
}

export default function CommissionInfoModal({
  isOpen,
  onClose,
  onNavigateToInquiry,
  onProceedToCalculator
}: CommissionInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Semi-transparent dark blur backdrop */}
      <div 
        className="absolute inset-0 bg-[#0f172a]/65 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container with soft blue radial sky gradient behind the white card, mirroring the screenshot */}
      <div className="relative w-full max-w-[420px] bg-gradient-to-b from-[#e3f2fd] to-[#90caf9] p-6 rounded-[36px] shadow-2xl border border-white/40 transform transition-all duration-300 scale-100 flex flex-col items-center">
        
        {/* Subtle Close 'X' Button on top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 bg-white/40 hover:bg-white/70 p-2 rounded-full transition-colors cursor-pointer"
          title="닫기"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Floating Megaphone Badge (Overlapping top center of the white card card-frame) */}
        <div className="relative -mt-12 mb-6 z-10 flex justify-center">
          <div className="bg-white rounded-full p-4 shadow-xl border-4 border-[#e3f2fd] flex items-center justify-center">
            <Megaphone className="w-8 h-8 text-[#004cd8] stroke-[2.2]" />
          </div>
        </div>

        {/* Primary White Card containing information */}
        <div className="w-full bg-white rounded-[32px] p-6 shadow-lg flex flex-col items-center text-center border border-slate-100">
          
          {/* Header Title in Deep/Solid Blue */}
          <h3 className="text-xl md:text-2xl font-black text-[#004cd8] tracking-tight mb-6">
            수수료율 확인 안내
          </h3>

          {/* Description Paragraph Container */}
          <div className="space-y-5 text-sm md:text-base text-slate-700 font-medium leading-relaxed">
            
            {/* Instruction Part 1 */}
            <div>
              <p>수수료 관련 문의는</p>
              <p>담당자를 통해 안내받으실 수</p>
              <p>있습니다.</p>
            </div>

            {/* Instruction Part 2 */}
            <div>
              <p>수수료는 <span className="font-extrabold text-slate-900">1~5%</span>로도</p>
              <p className="font-semibold text-slate-800">큰 차이가 날 수 있습니다.</p>
            </div>

            {/* Key Emphasis in bright Korean red, matching the exact presentation of the screenshot */}
            <div className="pt-2 text-lg md:text-xl font-extrabold text-[#d32f2f] tracking-tight leading-snug">
              <p>후회하지 않으실</p>
              <p>선택이 되실 겁니다.</p>
            </div>

          </div>

          {/* CTA Buttons in deep solid blue and secondary light blue */}
          <div className="w-full mt-7 space-y-3">
            <button
              onClick={() => {
                onNavigateToInquiry();
                onClose();
              }}
              className="w-full bg-[#004cd8] hover:bg-[#003cb2] active:bg-[#002e96] text-white font-extrabold text-base py-4 px-6 rounded-2xl shadow-md flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>담당자 문의 하기</span>
              <PhoneCall className="w-5 h-5 text-white/95" />
            </button>

            <a
              href="https://sscompare-m.ssart.co.kr/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onProceedToCalculator();
              }}
              className="w-full bg-[#f0f7ff] hover:bg-[#e1f0fe] text-[#004cd8] font-extrabold text-[13.5px] md:text-sm py-4 px-5 rounded-2xl border border-[#b3d7ff]/80 flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>수수료 계산기 바로가기</span>
              <ExternalLink className="w-4 h-4 text-[#004cd8] shrink-0 stroke-[2.2]" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
