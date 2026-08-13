/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import WooriContactBanner from './WooriContactBanner';
import { MOCK_MANAGERS } from '../data';
import { 
  FileText, CheckCircle2, Phone, User, Landmark, Building2, MapPin, Calendar, 
  HelpCircle, Eye, ShieldAlert, Sparkles, AlertCircle, RefreshCw 
} from 'lucide-react';

interface InquiryFormProps {
  initialSales: number;
  initialCurrentComm: number;
  initialTargetComm: number;
  onInquirySubmitted: () => void;
}

export default function InquiryForm({
  initialSales,
  initialCurrentComm,
  initialTargetComm,
  onInquirySubmitted
}: InquiryFormProps) {
  // Input states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('서울');
  const [department, setDepartment] = useState('기타 의약품 전체');
  const [sales, setSales] = useState(initialSales);
  const [currentComm, setCurrentComm] = useState(initialCurrentComm);
  const [expectedComm, setExpectedComm] = useState(initialTargetComm);
  const [notes, setNotes] = useState('');

  // Status message
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Historical inquiries (to list and track)
  const [myInquiries, setMyInquiries] = useState<Inquiry[]>([]);

  // Sync initial values when user clicks from calculator
  useEffect(() => {
    setSales(initialSales);
    setCurrentComm(initialCurrentComm);
    setExpectedComm(initialTargetComm);
  }, [initialSales, initialCurrentComm, initialTargetComm]);

  // Load inquiries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('woori_inquiries');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const migrated = parsed.map((inq: any) => {
          let updated = { ...inq };
          if (updated.status === 'assigned') {
            updated.assignedManager = '지부 총괄 담당자';
            updated.assignedPhone = '010-6737-0339';
          }
          return updated;
        });
        setMyInquiries(migrated);
        localStorage.setItem('woori_inquiries', JSON.stringify(migrated));
      } catch (e) {
        console.error('Failed to parse inquiries', e);
      }
    } else {
      setMyInquiries([]);
    }
  }, []);

  const saveInquiries = (updatedList: Inquiry[]) => {
    setMyInquiries(updatedList);
    localStorage.setItem('woori_inquiries', JSON.stringify(updatedList));
  };

  const cleanHistory = () => {
    localStorage.removeItem('woori_inquiries');
    setMyInquiries([]);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic phone auto-hyphenation
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 3 && value.length <= 7) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 7) {
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }
    setPhone(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('이름/대표명을 입력해 주세요.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setErrorMsg('유효한 연락처 정보(휴대폰 번호)를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);

    // Simulate server action
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: `INQ-${Date.now().toString().slice(-6)}`,
        name,
        phone,
        region,
        department,
        currentSales: sales,
        currentCommission: currentComm,
        expectedCommission: expectedComm,
        status: 'submitted',
        submittedAt: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        notes: notes.trim()
      };

      const updatedList = [newInquiry, ...myInquiries];
      saveInquiries(updatedList);

      // Reset form fields
      setName('');
      setPhone('');
      setRegion('서울');
      setDepartment('기타 의약품 전체');
      setNotes('');
      setIsSubmitting(false);

      if (onInquirySubmitted) {
        onInquirySubmitted();
      }

      // Simulate representative assignment after 2 more seconds
      setTimeout(() => {
        const listToUpdate = [...updatedList];
        const targetIdx = listToUpdate.findIndex(i => i.id === newInquiry.id);
        if (targetIdx !== -1) {
          listToUpdate[targetIdx] = {
            ...listToUpdate[targetIdx],
            status: 'assigned',
            assignedManager: '지부 총괄 담당자',
            assignedPhone: '010-6737-0339'
          };
          
          // Re-load and save to keep updated local storage in sync
          const latestSaved = localStorage.getItem('woori_inquiries');
          let currentInqs: Inquiry[] = [];
          if (latestSaved) {
            try { currentInqs = JSON.parse(latestSaved); } catch(err){}
          }
          const freshIdx = currentInqs.findIndex(i => i.id === newInquiry.id);
          if (freshIdx !== -1) {
            currentInqs[freshIdx] = listToUpdate[targetIdx];
            setMyInquiries(currentInqs);
            localStorage.setItem('woori_inquiries', JSON.stringify(currentInqs));
          }
        }
      }, 2500);

    }, 1200);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium border border-blue-100">
            <RefreshCw className="w-3 h-3 animate-spin text-blue-500" />
            신청접수 완료
          </span>
        );
      case 'reviewing':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-full font-medium border border-amber-100">
            <FileText className="w-3 h-3" />
            요율 조건 분석중
          </span>
        );
      case 'assigned':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium border border-emerald-100">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            전담 매니저 배정됨
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div id="partnership-inquiry-center" className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Intake Form Column */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-brand-50 text-brand-600 rounded-2xl">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight text-slate-800">
                수수료 및 입점 파트너쉽 상담
              </h4>
              <p className="text-xs text-slate-400 mt-1">간단한 정보 입력으로 신속한 제안서를 받아보실 수 있습니다.</p>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-5 bg-red-50 text-red-800 p-3.5 rounded-xl border border-red-100 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">
                  성명 / 대행업체 대표명 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">
                  전화번호 (휴대폰 번호) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <input
                    id="inquiry-phone"
                    type="text"
                    required
                    placeholder="010-0000-0000"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-mono font-medium"
                  />
                </div>
              </div>

            </div>

            {/* Region Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 block">
                상담 희망 지역 (주요 진출지역)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-4.5 h-4.5 text-slate-400" />
                <select
                  id="inquiry-region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all appearance-none cursor-pointer"
                >
                  {['서울', '인천/경기', '부산/경남', '대구/경북', '광주/전라', '대전/충청', '강원/제주'].map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Autofilled Comparison Summary (informative labels) */}
            <div className="bg-brand-50/50 rounded-2xl p-4 border border-brand-100/50 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-brand-100/40">
                <span className="text-xs font-semibold text-brand-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                  계산기 조건 연동 적용됨 (실시간 반영)
                </span>
                <span className="text-[10px] text-brand-500 font-medium">수정 및 직접 대입 가능</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-2.5 rounded-lg border border-brand-100">
                  <p className="text-[10px] text-slate-400 font-medium">희망 연 산출액</p>
                  <p className="text-xs font-bold text-brand-700 font-mono mt-0.5">
                    {sales >= 100000000 ? `${(sales/100000000).toFixed(1)}억원` : `${(sales/10000).toLocaleString('ko-KR')}만원`}
                  </p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-brand-100">
                  <p className="text-[10px] text-slate-400 font-medium">기존 수수료</p>
                  <p className="text-xs font-bold text-slate-700 font-mono mt-0.5">{currentComm}%</p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-brand-100">
                  <p className="text-[10px] text-slate-400 font-medium font-bold text-brand-700">우리메디텍 예정</p>
                  <p className="text-xs font-extrabold text-brand-600 font-mono mt-0.5">{expectedComm}%</p>
                </div>
              </div>
            </div>

            {/* Custom Notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 block">
                추가 건의 사항 및 요구 조건 기입
              </label>
              <textarea
                id="inquiry-notes"
                rows={3}
                placeholder="희망하시는 주요 품목 제약사가 있거나 요구조건이 있다면 남겨주세요."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
              ></textarea>
            </div>

            {/* Privacy Alert */}
            <div className="text-[11px] text-slate-400 leading-relaxed flex items-center gap-2">
              <input type="checkbox" id="privacy-agree" checked readOnly className="rounded border-slate-200 accent-brand-600" />
              <label htmlFor="privacy-agree">수수료 우대 매칭을 위한 개인정보 처리 수집 및 마케팅 조율 안내 동의 (필수)</label>
            </div>

            {/* Submit button */}
            <button
              id="submit-inquiry-btn"
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-brand-100 flex items-center justify-center gap-2 cursor-pointer ${
                isSubmitting 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-brand-600 hover:bg-brand-700 glow-btn'
              }`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>파트너 자격 및 매칭 조건 가공 중...</span>
                </>
              ) : (
                <>
                  <span>CSO (주)우리메디텍 파트너 상담 신청서 송신</span>
                  <CheckCircle2 className="w-4.5 h-4.5 text-white/90" />
                </>
              )}
            </button>

          </form>
        </div>

        {/* Dynamic Status Tracking Column / Left info panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Stunning corporate direct contact widget */}
          <WooriContactBanner />
          
          <div className="gradient-bg rounded-3xl p-6 text-white text-sm relative overflow-hidden">
            <h4 className="font-bold text-base mb-3 flex items-center gap-1.5 text-yellow-300">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              수량 불문, 즉각 우대 매칭
            </h4>
            <div className="space-y-3.5 text-white/90 leading-relaxed text-xs">
              <p>
                CSO (주)우리메디텍과 맺은 소중한 인연은 파트너쉽 등록부터 특별합니다.
              </p>
              <div className="flex gap-2.5">
                <span className="font-bold text-brand-200 font-mono">STEP 1</span>
                <div>
                  <h5 className="font-bold text-white text-xs">상담 양식 신청접수</h5>
                  <p className="text-white/60 text-[11px] mt-0.5">즉시 당사 전산센터로 접수되어 담당자 배정이 추진됩니다.</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <span className="font-bold text-brand-200 font-mono">STEP 2</span>
                <div>
                  <h5 className="font-bold text-white text-xs">파트너 등록 및 정산 개시</h5>
                  <p className="text-white/60 text-[11px] mt-0.5">계정 승인 즉시 투명하고 오차 없는 빠른 정산 혜택을 수령받습니다.</p>
                </div>
              </div>
            </div>
          </div>

          {/* My Inquiry Tracker Dashboard */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-md space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4.5 h-4.5 text-brand-600" />
                <h4 className="font-bold text-slate-800 text-sm">실시간 나의 상담 신청 현황</h4>
              </div>
              {myInquiries.length > 0 && (
                <button 
                  id="clear-inquiry-history"
                  type="button" 
                  onClick={cleanHistory}
                  className="text-[10px] text-slate-400 hover:text-red-500 font-medium cursor-pointer"
                >
                  기록 초기화
                </button>
              )}
            </div>

            {myInquiries.length === 0 ? (
              <div className="text-center py-8 text-slate-400 space-y-2">
                <AlertCircle className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs">아직 제출 완료된 상담서가 없습니다.</p>
                <p className="text-[11px] text-slate-400">좌측 신청서를 입력해 주시면 즉시 실시간 정산 상태 모니터링이 가동됩니다.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {myInquiries.map((inq) => (
                  <div key={inq.id} id={`inquiry-card-${inq.id}`} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase block">
                          No. {inq.id}
                        </span>
                        <h5 className="text-xs font-extrabold text-slate-800 mt-0.5">
                          {inq.name} 파트너 대표님
                        </h5>
                      </div>
                      {getStatusBadge(inq.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 bg-white border border-slate-50 rounded-lg p-2 font-medium">
                      <div>희망 매출액: <span className="font-bold text-slate-700 font-mono">{(inq.currentSales / 10000).toLocaleString()}만원</span></div>
                      <div>희망 요율: <span className="font-bold text-brand-600 font-mono">{inq.expectedCommission}%</span></div>
                      <div className="col-span-2">상담 희망지역: <span className="font-bold text-slate-700">{inq.region}</span></div>
                    </div>

                    <div className="text-[11px] text-slate-400 text-right">
                      접수 시간: {inq.submittedAt}
                    </div>

                    {/* Assigned state display details */}
                    {inq.status === 'assigned' && (
                      <div className="space-y-4">
                        <div className="bg-[#f0fbf7] rounded-3xl p-5 border border-[#dcfaec] flex items-start gap-4 animate-fade-in text-left">
                          {/* Purple User Avatar Icon */}
                          <div className="w-10 h-10 rounded-full bg-[#7c3aed]/10 flex items-center justify-center shrink-0 border border-[#7c3aed]/25">
                            <User className="w-5.5 h-5.5 text-[#7c3aed] fill-[#7c3aed]/30" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <p className="text-xs md:text-sm font-bold text-[#166534] leading-tight">
                              전담 지부 총괄 담당 실시간 배정 완료!
                            </p>
                            <p className="text-sm font-extrabold text-[#0f172a] mt-1.5 tracking-tight">
                              {inq.assignedManager || '지부 총괄 담당자'}
                            </p>
                            <a 
                              href={`tel:${inq.assignedPhone || '010-6737-0339'}`}
                              className="flex items-center gap-2 text-[13px] text-[#0d9488] hover:text-[#0b7a70] font-bold font-sans mt-2 hover:underline transition-colors cursor-pointer"
                            >
                              {/* Pink / Magenta phone icon */}
                              <Phone className="w-4 h-4 text-pink-500 fill-pink-500/20 shrink-0" />
                              <span>연락처 : {inq.assignedPhone || '010-6737-0339'}</span>
                            </a>
                            <p className="text-[10px] text-[#166534] mt-2.5 font-medium leading-relaxed">
                              * 배정된 지부 담당자 대표가 위 연락처를 통해 대행 및 스팟 수수료 추가율을 상세 안내해 드립니다.
                            </p>
                          </div>
                        </div>

                        {/* Visual brand contact card overlay directly appearing on active assignment */}
                        <WooriContactBanner />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
