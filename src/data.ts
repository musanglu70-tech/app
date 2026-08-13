/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DrugClass, FAQ } from './types';

export const DRUG_CLASSES: DrugClass[] = [
  {
    id: 'generic_a',
    name: '주요 제네릭 의약품 (Generic)',
    category: 'generic',
    typicalCommissionMin: 15,
    typicalCommissionMax: 22,
    description: '처방 전환율이 높은 핵심 제네릭 품목으로, 업계 최고 수준의 기본 수수료를 제공합니다.'
  },
  {
    id: 'original_a',
    name: '오리지널 의약품 (Original)',
    category: 'original',
    typicalCommissionMin: 8,
    typicalCommissionMax: 14,
    description: '안정적인 입지와 높은 신뢰도를 지닌 특허 오리지널 품목군입니다.'
  },
  {
    id: 'specialty_a',
    name: '클리닉 맞춤 특화 의약품',
    category: 'specialty',
    typicalCommissionMin: 18,
    typicalCommissionMax: 25,
    description: '이비인후과, 내과, 소아과 등 각 주요 진료과목별 최적화 처방 라인업입니다.'
  },
  {
    id: 'high_incentive_a',
    name: '고효율 인센티브 품목 (Spot 단기 추가)',
    category: 'high_incentive',
    typicalCommissionMin: 23,
    typicalCommissionMax: 30,
    description: '특정 제조사 매칭 및 추가 프로모션이 적용되는 정기/단기 보너스 품목군입니다.'
  }
];

export const MOCK_MANAGERS = [
  { name: '지부 총괄 담당자', phone: '010-6737-0339', title: '서울/강남 총괄부' },
  { name: '이민혁 담당자', phone: '010-7215-0811', title: '경인/인천 영업팀' },
  { name: '최혜진 담당자', phone: '010-3349-1582', title: '영남/부산 지부' },
  { name: '박준서 담당자', phone: '010-8910-4422', title: '중부/대전 지부' }
];

export const FAQS: FAQ[] = [
  {
    id: 'q1',
    category: 'commission',
    question: '수수료율은 정말 타사보다 1~5% 더 높은가요?',
    answer: '네, CSO (주)우리메디텍은 제약 직거래 네트워크 최적화 및 유통 불필요 단계를 줄여 절감된 마진을 파트너(MR)님들과 공유합니다. 타사 대비 평균 2%~5% 높은 요율을 안정적으로 보장해 드립니다.'
  },
  {
    id: 'q2',
    category: 'settlement',
    question: '정산 일정 및 신속정산 여부는 어떻게 되나요?',
    answer: '정확하고 신속한 정산 처리를 모토로 매월 처방 마감 후 정해진 기일(D+1)에 오차 없이 정확히 입금 처리되며, 예외 정산이나 긴급 지원인 경우 맞춤 간편 정산 처리를 조율하실 수 있습니다.'
  },
  {
    id: 'q3',
    category: 'policy',
    question: '제약사별 추가 인센티브(추가 정책)는 어떻게 결정되나요?',
    answer: '기본 보장 수수료율 외에도 분기별/반기별 달성율 보너스 및 특정 전략 품목군 집중 처방 시 최대 5%의 고율 추가 스팟 인센티브를 제공하고 있어 수익 극대화가 가능합니다.'
  },
  {
    id: 'q4',
    category: 'info',
    question: '초기 파트너 등록 시 어떤 서류가 필요한가요?',
    answer: '개인 또는 법인사업자등록증 사본, 계좌사본, 그리고 경력 파악을 위한 간단한 프로필이 필요합니다. 상세 가이드는 담당자 상담 후 SMS/카카오톡으로 자동 발송됩니다.'
  }
];

export const USP_LIST = [
  {
    title: '업계 최고 수준',
    subtitle: '제약사별 경쟁력 있는 수수료율 제공',
    desc: '유통구조 축소와 직거래 중심 설계로 불필요한 중개수수료를 제거하고 파트너님께 최고 요율을 돌려드립니다.',
    icon: 'BadgePercent'
  },
  {
    title: '다양한 인센티브',
    subtitle: '추가 정책과 인센티브로 수익 극대화',
    desc: '매월 지급되는 기본 수수료 외에도 실적 매칭 정책, 분기별 스팟 보너스 및 신규 개척 특별 장려금을 지급합니다.',
    icon: 'TrendingUp'
  },
  {
    title: '빠른 정산 시스템',
    subtitle: '정확하고 신속한 정산 처리',
    desc: '정체되는 투명하지 못한 정산 시스템은 거부합니다. 처방 확인 시점 즉시 원클릭 전산 조회와 고도화된 스케줄에 따른 투명한 정산을 지원합니다.',
    icon: 'Clock'
  },
  {
    title: '전국 네트워크',
    subtitle: '전국 네트워크로 든든한 파트너',
    desc: '수도권 및 주요 광역시 전체 지부망을 연결하여, 어느 지역 병의원 고객이라도 신속하고 매끄럽게 파트너십 유지를 서포트합니다.',
    icon: 'Users'
  }
];
