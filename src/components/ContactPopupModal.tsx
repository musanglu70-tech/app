/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PhoneCall, X } from 'lucide-react';
import WooriContactBanner from './WooriContactBanner';

interface ContactPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactPopupModal({ isOpen, onClose }: ContactPopupModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark semi-transparent blur backdrop */}
      <div 
        className="absolute inset-0 bg-[#0f172a]/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Styled Modal Container matching the last screenshot's soft gradient design */}
      <div className="relative w-full max-w-[440px] bg-gradient-to-b from-[#e3f2fd] to-[#90caf9] p-3 sm:p-5 rounded-[24px] sm:rounded-[38px] shadow-2xl border border-white/50 transform transition-all duration-300 scale-100 flex flex-col items-center animate-fade-in mx-auto">
        
        {/* Soft Close X Button on the top-right */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 bg-white/50 hover:bg-white/80 p-1.5 rounded-full transition-all cursor-pointer z-50 shadow-sm"
          title="닫기"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Floating Accent Badge (overlapping top center just like the megaphone in the last screenshot) */}
        <div className="relative -mt-9 sm:-mt-11 mb-4 sm:mb-5 z-10 flex justify-center">
          <div className="bg-white rounded-full p-3 sm:p-4.5 shadow-xl border-4 border-[#e3f2fd] flex items-center justify-center">
            <PhoneCall className="w-6 h-6 sm:w-8 sm:h-8 text-[#004cd8] stroke-[2.2] animate-pulse" />
          </div>
        </div>

        {/* Content Container hosting the First Photo's contact banner */}
        <div className="w-full bg-slate-50 rounded-[18px] sm:rounded-[30px] p-1 shadow-lg border border-slate-100 overflow-hidden flex flex-col">
          
          {/* Header guidance tag */}
          <div className="text-center py-2 bg-white/70 backdrop-blur-xs rounded-t-xl font-bold text-[#0052a3] text-[11px] sm:text-[13px] tracking-tight border-b border-slate-100">
            📢 가입 승인 및 협업 즉시 다이렉트 상담 진행
          </div>

          <div className="p-0.5">
            {/* The beautiful customized blue contact card (1st photo content!) */}
            <WooriContactBanner />
          </div>

          {/* Bottom quick actions/acknowledgements */}
          <div className="mt-2 pb-1.5 text-center">
            <button
               onClick={onClose}
               className="px-5 py-1.5 bg-slate-800 hover:bg-slate-900 active:bg-black text-white font-extrabold text-[11px] rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              닫기
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
