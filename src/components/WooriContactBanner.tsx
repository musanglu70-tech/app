/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone } from 'lucide-react';

export default function WooriContactBanner() {
  return (
    <div className="w-full bg-gradient-to-b from-[#005bb4] to-[#014c99] text-white p-4 sm:p-6 rounded-3xl shadow-xl flex flex-col items-center border border-white/20 relative overflow-hidden select-none">
      
      {/* Absolute watermark of "WR" behind everything, matching the screenshot's soft branding background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.05] z-0">
        <svg
          width="320"
          height="320"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white aspect-square block shrink-0"
          style={{ width: '320px', height: '320px', minWidth: '320px', minHeight: '320px', maxWidth: '100%', maxHeight: '100%', aspectRatio: '1 / 1' }}
        >
          {/* double crossing brackets (hybrid style: sharp top-right, curved bottom-right) */}
          <path d="M 15 21 L 79 21" stroke="currentColor" strokeWidth="2.2" />
          <path d="M 19 27.5 L 85 27.5" stroke="currentColor" strokeWidth="2.2" />
          <path d="M 70 15 L 70 69 A 5.5 5.5 0 0 1 64.5 74.5 L 21 74.5" stroke="currentColor" strokeWidth="2.2" fill="none" />
          <path d="M 77 21 L 77 75 A 5.5 5.5 0 0 1 71.5 80.5 L 28 80.5" stroke="currentColor" strokeWidth="2.2" fill="none" />
          {/* 'W' & 'R' letters, beautifully aligned and centered */}
          <path d="M 22.5,39 L 22.5,54 A 4.5,4.5 0 0 0 31.5,54 L 31.5,44 A 4.5,4.5 0 0 0 40.5,54 L 40.5,39" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 47.5,39 L 47.5,59" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M 47.5,39 C 53.5,39 60.5,39.5 60.5,44.5 C 60.5,49.5 53.5,50 47.5,50" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="54.5" y1="50" x2="60.5" y2="59" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* WR Double-Border Logo Badge on top center */}
      <div className="relative z-10 flex flex-col items-center mb-3">
        {/* Double-layered borders of WR logo */}
        <div className="relative p-1 border border-white/20 rounded-xl bg-white/5 backdrop-blur-xs flex items-center justify-center">
          <div className="border border-white/80 px-3.5 py-1 rounded-lg flex items-center justify-center font-mono font-black text-xs text-white tracking-widest leading-none">
            WR
          </div>
        </div>
      </div>

      {/* Main copy greeting */}
      <div className="relative z-10 text-center space-y-1">
        <h4 className="text-[13px] sm:text-[15px] md:text-base font-bold text-white/95 tracking-tight">
          대표님들과 함께 동반성장하고자 합니다.
        </h4>
        <p className="text-[10px] sm:text-xs md:text-[13px] text-white/80 font-medium tracking-tight">
          문의 사항이 있으시면 언제든지 연락주세요
        </p>
      </div>

      {/* Twin Columns with Large Telephone numbers exactly as illustrated in the screenshot */}
      <div className="relative z-10 w-full grid grid-cols-2 gap-2 sm:gap-4 my-4 py-3 border-t border-b border-white/12">
        
        {/* Left Column (010-2886-0339) */}
        <a 
          href="tel:010-2886-0339" 
          className="flex flex-col items-center text-center group cursor-pointer active:scale-[0.98] transition-all"
          title="010-2886-0339 전화 걸기"
        >
          {/* Header Row: Phone Icon + "010" */}
          <div className="flex items-center gap-1 sm:gap-2 text-white/95">
            {/* Handset styled telephone icon resembling the image */}
            <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-white fill-white/15 -scale-x-100 rotate-[12deg] stroke-[2.4] group-hover:animate-bounce shrink-0" />
            <span className="text-[20px] min-[360px]:text-[24px] min-[390px]:text-[28px] sm:text-[34px] md:text-[38px] leading-none font-black tracking-tight font-sans">010</span>
          </div>
          {/* Stacked big white numerals code */}
          <span className="text-[22px] min-[360px]:text-[26px] min-[390px]:text-[30px] sm:text-[36px] md:text-[40px] leading-tight font-black tracking-tight mt-1 font-sans text-white group-hover:text-yellow-200 transition-colors">
            2886
          </span>
          <span className="text-[22px] min-[360px]:text-[26px] min-[390px]:text-[30px] sm:text-[36px] md:text-[40px] leading-none font-black tracking-tight font-sans text-white group-hover:text-yellow-200 transition-colors">
            0339
          </span>
        </a>

        {/* Right Column (010-6737-0339) */}
        <a 
          href="tel:010-6737-0339" 
          className="flex flex-col items-center text-center group cursor-pointer active:scale-[0.98] transition-all"
          title="010-6737-0339 전화 걸기"
        >
          {/* Header Row: Phone Icon + "010" */}
          <div className="flex items-center gap-1 sm:gap-2 text-white/95">
            <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-white fill-white/15 -scale-x-100 rotate-[12deg] stroke-[2.4] group-hover:animate-bounce shrink-0" />
            <span className="text-[20px] min-[360px]:text-[24px] min-[390px]:text-[28px] sm:text-[34px] md:text-[38px] leading-none font-black tracking-tight font-sans">010</span>
          </div>
          {/* Stacked big white numerals code */}
          <span className="text-[22px] min-[360px]:text-[26px] min-[390px]:text-[30px] sm:text-[36px] md:text-[40px] leading-tight font-black tracking-tight mt-1 font-sans text-white group-hover:text-yellow-200 transition-colors">
            6737
          </span>
          <span className="text-[22px] min-[360px]:text-[26px] min-[390px]:text-[30px] sm:text-[36px] md:text-[40px] leading-none font-black tracking-tight font-sans text-white group-hover:text-yellow-200 transition-colors">
            0339
          </span>
        </a>

      </div>

      {/* Footer Meta Row with Pills & Working Times */}
      <div className="relative z-10 w-full flex justify-between items-center px-0.5">
        {/* CSO 우리메디텍 rounded white badge label */}
        <div className="bg-white text-[#0052a3] font-black text-[11px] sm:text-[12.5px] px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-full shadow-md tracking-tight">
          CSO 우리메디텍
        </div>

        {/* Working Hours Text */}
        <div className="text-right leading-tight text-white font-bold select-none">
          <p className="text-[10px] sm:text-[11px] text-white/75 font-bold">근무시간 평일</p>
          <p className="text-xs sm:text-sm font-black mt-0.5 tracking-tight font-sans">
            09:30~18:30
          </p>
        </div>
      </div>

      {/* Bottom extra prompt text message instructions */}
      <div className="relative z-10 w-full text-center mt-4 pt-3 border-t border-white/8">
        <p className="text-[9.5px] sm:text-[10.5px] text-white/80 font-medium leading-relaxed tracking-tight">
          근무시간외 문자주시면 익일 확인하여 연락을 드리겠습니다.
        </p>
      </div>

    </div>
  );
}
