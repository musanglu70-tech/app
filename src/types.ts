/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  region: string;
  department: string;
  currentSales: number; // in KRW (e.g., 50,000,000)
  currentCommission: number; // percentage (e.g., 12.5)
  expectedCommission: number; // target percentage
  status: 'submitted' | 'reviewing' | 'assigned' | 'completed';
  assignedManager?: string;
  assignedPhone?: string;
  submittedAt: string;
  notes?: string;
}

export interface DrugClass {
  id: string;
  name: string;
  category: 'generic' | 'original' | 'specialty' | 'high_incentive';
  typicalCommissionMin: number; // Min commission in Woori (e.g. 15%)
  typicalCommissionMax: number; // Max commission in Woori (e.g. 23%)
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'info' | 'commission' | 'settlement' | 'policy';
}
