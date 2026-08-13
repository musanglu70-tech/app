/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FAQS } from '../data';
import { FAQ } from '../types';
import { HelpCircle, ChevronDown, Award, Lightbulb, Handshake, Landmark, Search } from 'lucide-react';

export default function InfoHub() {
  const [activeFAQId, setActiveFAQId] = useState<string | null>('q1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (id: string) => {
    setActiveFAQId(activeFAQId === id ? null : id);
  };

  const filteredFAQs = FAQS.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="info-hub-center" className="space-y-8">
      
      {/* Three Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="p-3 bg-brand-50 text-brand-600 rounded-2xl w-fit">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base">직거래 유통망 최적화</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              도매 및 중간 벤더의 유통 버블을 모두 걷어내어 순수 제약 협상력을 파트너 수수료로 즉각 환원합니다.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold text-brand-500 mt-4 tracking-wider">CSO (주)우리메디텍 핵심 경쟁력 01</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base">원클릭 리포팅 시스템</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              종합병원 및 의원급 원내/원외 처방 내역을 지연 없이 빠르고 편리하게 실시간 정산 상태로 조회할 수 있습니다.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold text-amber-600 mt-4 tracking-wider">CSO (주)우리메디텍 핵심 경쟁력 02</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
              <Handshake className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base">신뢰의 상생 파트너쉽</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              전국망을 연결하여, 수도권 뿐만 아니라 지방 세미나 및 개원 컨설팅과 매칭 협치 지원 체제를 탄탄히 구축하고 있습니다.
            </p>
          </div>
          <span className="text-[10px] uppercase font-bold text-emerald-600 mt-4 tracking-wider">CSO (주)우리메디텍 핵심 경쟁력 03</span>
        </div>

      </div>

      {/* Accordion List FAQ */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-md space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-50">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-slate-800">질의응답 (자주 묻는 질문)</h4>
            <p className="text-xs text-slate-400">CSO (주)우리메디텍 수수료율 협의와 관련된 궁금증을 바로 확인해 보세요.</p>
          </div>
          
          {/* FAQ Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              id="faq-search"
              type="text"
              placeholder="궁금한 단어 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: '전체' },
            { id: 'commission', label: '수수료 문의' },
            { id: 'settlement', label: '정산 일정' },
            { id: 'policy', label: '스팟 인센티브' },
            { id: 'info', label: '등록 전차' },
          ].map((cat) => (
            <button
              key={cat.id}
              id={`faq-cat-tab-${cat.id}`}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3.5">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              검색 조건에 맞는 자주 묻는 질문이 가공되어 있지 않습니다.
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = activeFAQId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  id={`faq-item-${faq.id}`}
                  className={`border border-slate-100 rounded-2xl transition-all duration-250 ${
                    isOpen ? 'bg-brand-50/20 border-brand-100 shadow-sm' : 'bg-white hover:bg-slate-50/50'
                  }`}
                >
                  <button
                    id={`faq-toggle-${faq.id}`}
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-4 md:p-5 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg flex-shrink-0 ${isOpen ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500'}`}>
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-slate-800 text-xs md:text-sm leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-600' : ''}`} />
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[300px] border-t border-slate-100/50' : 'max-h-0'}`}>
                    <div className="p-4 md:p-5 text-xs md:text-sm text-slate-600 leading-relaxed bg-white/50 rounded-b-2xl">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Dynamic CTA Footer in Hub */}
        <div className="bg-slate-50 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📞</span>
            <div>
              <h5 className="font-bold text-slate-800 text-xs md:text-sm">직통 긴급 파트너 상담 라인</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">긴급 요율 가조율 및 품목 단가 매칭을 고속 서비스해 드립니다.</p>
            </div>
          </div>
          <a
            href="tel:010-6737-0339"
            className="self-start md:self-auto bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            대표번호 전화하기: 010-6737-0339
          </a>
        </div>

      </div>

    </div>
  );
}
