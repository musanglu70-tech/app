/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { DRUG_CLASSES } from '../data';
import { DrugClass } from '../types';
import { BadgePercent, TrendingUp, HandCoins, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

interface CalculatorProps {
  onStartInquiry: (sales: number, currentComm: number, targetComm: number) => void;
}

export default function InteractiveCalculator({ onStartInquiry }: CalculatorProps) {
  const [sales, setSales] = useState<number>(30000000); // 30M KRW
  const [currentComm, setCurrentComm] = useState<number>(12); // 12%
  const [targetComm, setTargetComm] = useState<number>(15); // 15% (3% higher)
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);

  // Quick preset handlers
  const handleSalesPreset = (amount: number) => {
    setSales(amount);
  };

  const handleDrugSelect = (drug: DrugClass) => {
    setSelectedDrugId(drug.id);
    // Set target commission to the midpoint or minimum of typical Woori commission
    const avgWoori = Math.round((drug.typicalCommissionMin + drug.typicalCommissionMax) / 2);
    setTargetComm(avgWoori);
    if (currentComm >= avgWoori) {
      setCurrentComm(Math.max(5, avgWoori - 3));
    }
  };

  // Calculations
  const calculations = useMemo(() => {
    const currentMonthly = Math.round(sales * (currentComm / 100));
    const wooriMonthly = Math.round(sales * (targetComm / 100));
    const monthlyDiff = wooriMonthly - currentMonthly;
    const annualDiff = monthlyDiff * 12;
    const percentageDiff = Number((targetComm - currentComm).toFixed(1));

    return {
      currentMonthly,
      wooriMonthly,
      monthlyDiff,
      annualDiff,
      percentageDiff,
    };
  }, [sales, currentComm, targetComm]);

  // Currency Formatter
  const formatCurrency = (val: number) => {
    if (val >= 100000000) {
      const eoc = val / 100000000;
      const remainder = (val % 100000000) / 10000000;
      return remainder > 0 
        ? `${eoc.toFixed(1).replace('.0', '')}억원` 
        : `${Math.floor(eoc)}억원`;
    }
    return `${(val / 10000).toLocaleString('ko-KR')}만원`;
  };

  const formatRawMoney = (val: number) => {
    return `${val.toLocaleString('ko-KR')}원`;
  };

  return (
    <div id="commission-calculator" className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* Header Banner */}
      <div className="gradient-bg px-6 py-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-500/10 rounded-full blur-xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-100 text-xs font-semibold mb-3 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            수수료 비교 모의 시뮬레이터
          </span>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-display">
            수수료율 1%의 놀라운 차이
          </h3>
          <p className="text-white/80 text-sm mt-2 max-w-lg">
            "수수료는 1~5%로도 큰 차이가 날 수 있습니다." 지금 파트너 MR님의 예상 판매 처방액을 대입해 증가할 연봉 수준을 즉시 비교 확인해 보세요.
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sliders Input Division */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Preset Buttons for Quick Entry */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
              💡 제약 대표 약제 분류 적용하기
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DRUG_CLASSES.map((drug) => {
                const isSelected = selectedDrugId === drug.id;
                return (
                  <button
                    key={drug.id}
                    id={`drug-preset-${drug.id}`}
                    type="button"
                    onClick={() => handleDrugSelect(drug)}
                    className={`text-left p-3 rounded-xl border text-xs transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/70 text-brand-700 font-semibold ring-2 ring-brand-100'
                        : 'border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center font-medium">
                      <span>{drug.name}</span>
                      {isSelected && <CheckCircle className="w-3.5 h-3.5 text-brand-600" />}
                    </div>
                    <div className={`mt-1 text-[11px] ${isSelected ? 'text-brand-600' : 'text-slate-400'}`}>
                      CSO (주)우리메디텍 요율: {drug.typicalCommissionMin}% ~ {drug.typicalCommissionMax}%
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Slider 1: Average Monthly Sales (KRW) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-800 text-sm md:text-base">
                월 평균 처방액 (의약품 매출액)
              </span>
              <span className="text-brand-600 font-bold text-lg md:text-xl font-mono">
                {formatCurrency(sales)}
              </span>
            </div>
            
            <input
              id="sales-slider"
              type="range"
              min={1000000}
              max={150000000}
              step={1000000}
              value={sales}
              onChange={(e) => {
                setSales(Number(e.target.value));
                setSelectedDrugId(null); // Reset customized presets when manually editing
              }}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600 focus:outline-none"
            />
            
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>100만원</span>
              <span>5,000만원</span>
              <span>1억원</span>
              <span>1억 5천만원</span>
            </div>

            {/* Sales Quick Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[10000000, 30000000, 50000000, 100000000].map((presetVal) => (
                <button
                  key={presetVal}
                  id={`preset-sales-${presetVal}`}
                  type="button"
                  onClick={() => handleSalesPreset(presetVal)}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    sales === presetVal
                      ? 'bg-brand-600 text-white font-medium shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {formatCurrency(presetVal)}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Interactive Comparison Rates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Current Rate Slider */}
            <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-500">
                  타사/현재 수수료율
                </span>
                <span className="text-slate-800 font-bold font-mono">
                  {currentComm}%
                </span>
              </div>
              <input
                id="current-comm-slider"
                type="range"
                min={5}
                max={25}
                step={0.5}
                value={currentComm}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCurrentComm(val);
                  // Push target commission ahead if it goes lower than current
                  if (targetComm <= val) {
                    setTargetComm(Math.min(30, val + 1));
                  }
                }}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
              />
              <p className="text-[11px] text-slate-400">현재 지급받고 계시는 평균 대행 요율입니다.</p>
            </div>

            {/* Woori Meditech Commission Rate Slider */}
            <div className="bg-brand-50/30 p-4 rounded-2xl border border-brand-100/50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-brand-700">
                  CSO (주)우리메디텍 예상 수수료율
                </span>
                <span className="text-brand-600 font-black font-mono">
                  {targetComm}%
                </span>
              </div>
              <input
                id="target-comm-slider"
                type="range"
                min={currentComm}
                max={30}
                step={0.5}
                value={targetComm}
                onChange={(e) => setTargetComm(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <p className="text-[11px] text-brand-600 font-medium">CSO (주)우리메디텍은 적극적인 우대 혜택을 제공합니다.</p>
            </div>

          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex gap-3 text-amber-800 text-xs leading-relaxed">
            <span className="font-bold text-base leading-none">📢</span>
            <div>
              <span className="font-semibold">수수료 우대제 적용:</span> CSO (주)우리메디텍은 제약사와 파트너 영업인과의 다이렉트 매칭 구조를 통해 <strong>최소 1%에서 최대 5% 이상의 수수료율 차이</strong>를 합리적으로 생성해 냅니다.
            </div>
          </div>

        </div>

        {/* Output & Analysis Center */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50/70 rounded-2xl border border-slate-100/80 p-6 space-y-6">
          
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              📊 수수료 계산 시뮬레이션 결과
            </h4>

            {/* Profit Card Group */}
            <div className="space-y-3">
              
              {/* Diff Widget */}
              <div className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                    <BadgePercent className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs text-slate-400 font-medium">수수료 격차 수혜</h5>
                    <p className="text-xs text-slate-700 font-semibold">CSO (주)우리메디텍 요율 마진</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-brand-600 font-mono">
                    +{calculations.percentageDiff}%p
                  </span>
                </div>
              </div>

              {/* Monthly Profit Card */}
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>월 실제 수수료 환급액 비교</span>
                </div>
                
                {/* Visual Comparative bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div 
                      className="bg-slate-400 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${(currentComm / targetComm) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>기존: {formatCurrency(calculations.currentMonthly)}</span>
                    <span className="text-slate-400 font-mono">({currentComm}%)</span>
                  </div>

                  <div className="w-full bg-brand-100 rounded-full h-2.5">
                    <div 
                      className="bg-brand-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-brand-700 font-semibold">
                    <span>우리: {formatCurrency(calculations.wooriMonthly)}</span>
                    <span className="font-mono">({targetComm}%)</span>
                  </div>
                </div>
              </div>

              {/* Incremental Profit Highlights */}
              <div className="bg-radial from-brand-500 to-brand-700 p-5 rounded-xl text-white shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 opacity-10">
                  <TrendingUp className="w-24 h-24" />
                </div>
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full text-[10px] text-brand-100 mb-1">
                    <HandCoins className="w-3.5 h-3.5 text-yellow-300" />
                    순수 누적 추가 소득
                  </div>
                  <p className="text-xs text-white/70">당사 파트너 전환 시 매월 추가 수익</p>
                  <p className="text-2xl font-black mt-1 font-mono tracking-tight text-yellow-300">
                    +{formatRawMoney(calculations.monthlyDiff)} <span className="text-xs font-normal text-white">더 지급</span>
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center bg-white/5 -mx-5 -mb-5 px-5 py-3">
                    <div className="text-left">
                      <p className="text-[11px] text-white/60">연간 누적 추가 정산 가치</p>
                      <p className="text-base font-extrabold text-white font-mono">
                        +{formatCurrency(calculations.annualDiff)}
                      </p>
                    </div>
                    <span className="bg-yellow-300 text-brand-900 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                      연봉 극대화
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-4 lg:pt-0 space-y-2">
            <button
              id="calculator-apply-btn"
              type="button"
              onClick={() => onStartInquiry(sales, currentComm, targetComm)}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-md flex items-center justify-center gap-2 cursor-pointer glow-btn"
            >
              <span>이 조건으로 정산 수수료율 문의하기</span>
              <ArrowRight className="w-4 h-4 text-white/90" />
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              * 기재된 수수료율은 약제 공급처 수량 및 계약 시점에 따라 조정 및 상담 결정됩니다.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
