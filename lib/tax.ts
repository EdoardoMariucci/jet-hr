export const INPS_RATE = 0.0919;
export const MONTHS = 13;

export const IRPEF_BRACKETS = [
  { upTo: 28000, rate: 0.23 },
  { upTo: 50000, rate: 0.35 },
  { rate: 0.43 },
] as const;

export const REGIONAL_BRACKETS = [
  { upTo: 15000, rate: 0.0123 },
  { upTo: 28000, rate: 0.0158 },
  { upTo: 50000, rate: 0.0172 },
  { rate: 0.0173 },
] as const;

// Deductions constants
export const DEDUC_A = 1955;
export const DEDUC_B = 1910;
export const DEDUC_C = 1190;
export const DEDUC_SEG2_DENOM = 13000;
export const DEDUC_SEG3_DENOM = 22000;
export const DEDUC_LIMIT_1 = 15000;
export const DEDUC_LIMIT_2 = 28000;
export const DEDUC_LIMIT_3 = 50000;
export const BONUS_LOWER = 25000;
export const BONUS_UPPER = 35000;
export const BONUS_65 = 65;

// Milan add-on constants
export const MILAN_THRESHOLD = 23000;
export const MILAN_RATE = 0.008;

type Tier = { upTo?: number; rate: number };

export function isFiniteNumber(n: number): boolean {
  return Number.isFinite(n);
}

export function clampAtZero(n: number): number {
  return n > 0 ? n : 0;
}

export function computeProgressiveTax(
  amount: number,
  tiers: readonly Tier[]
): number {
  if (!Number.isFinite(amount)) return NaN;
  if (amount <= 0) return 0;
  let remaining = amount;
  let lastCap = 0;
  let total = 0;
  for (const { upTo, rate } of tiers) {
    const cap = upTo ?? Number.POSITIVE_INFINITY;
    const span = Math.min(Math.max(remaining, 0), cap - lastCap);
    if (span > 0) total += span * rate;
    remaining -= span;
    lastCap = cap;
    if (remaining <= 0) break;
  }
  return total;
}

export function calculatePercentage(base: number, percent: number): number {
  if (!Number.isFinite(base)) return NaN;
  return base * (percent / 100);
}

export function calculateInps(base: number): number {
  // Keep calculatePercentage usage; INPS_RATE is expressed as a fraction.
  return calculatePercentage(base, INPS_RATE * 100);
}

export function taxableIRPEF(ral: number, inps: number): number {
  if (!Number.isFinite(ral) || !Number.isFinite(inps)) return NaN;
  return clampAtZero(ral - inps);
}

export function grossIrpef(taxable: number): number {
  return computeProgressiveTax(taxable, IRPEF_BRACKETS);
}

export function deductionIrpef(taxable: number): number {
  if (!Number.isFinite(taxable)) return NaN;

  const t = taxable;

  let basicDeduction = 0;

  if (t <= DEDUC_LIMIT_1) {
    basicDeduction = DEDUC_A;
  } else if (t <= DEDUC_LIMIT_2) {
    basicDeduction =
      DEDUC_B + (DEDUC_C * (DEDUC_LIMIT_2 - t)) / DEDUC_SEG2_DENOM;
  } else if (t <= DEDUC_LIMIT_3) {
    basicDeduction = (DEDUC_B * (DEDUC_LIMIT_3 - t)) / DEDUC_SEG3_DENOM;
  } else {
    basicDeduction = 0;
  }

  if (t > BONUS_LOWER && t <= BONUS_UPPER) {
    basicDeduction += BONUS_65;
  }

  if (basicDeduction < 0) basicDeduction = 0;
  return basicDeduction;
}

export function netIrpef(grossIrpef: number, deductionIrpef: number): number {
  if (!Number.isFinite(grossIrpef) || !Number.isFinite(deductionIrpef)) {
    return NaN;
  }
  return clampAtZero(grossIrpef - deductionIrpef);
}

export function regionalTax(taxable: number): number {
  return computeProgressiveTax(taxable, REGIONAL_BRACKETS);
}

export function milanTax(taxable: number): number {
  if (!Number.isFinite(taxable)) return NaN;
  const t = taxable;
  if (t <= MILAN_THRESHOLD) return 0;
  return t * MILAN_RATE;
}

export interface RecapResult {
  totalTax: number;
  annualNet: number;
  monthlyNet: number;
}

export function recap(ral: number): RecapResult {
  if (!Number.isFinite(ral)) {
    return { totalTax: NaN, annualNet: NaN, monthlyNet: NaN };
  }

  const inps = calculateInps(ral);
  const taxable = taxableIRPEF(ral, inps);

  const gross = grossIrpef(taxable);
  const deduction = deductionIrpef(taxable);
  const net = netIrpef(gross, deduction);

  const regional = regionalTax(taxable);
  const milan = milanTax(taxable);

  const totalTax = net + regional + milan;
  const annualNet = ral - inps - totalTax;
  const monthlyNet = annualNet / MONTHS;

  return { totalTax, annualNet, monthlyNet };
}

export interface AverageRateResult {
  averageTaxRate: number;
  averageContributionRate: number;
  overallAverageRate: number;
}

export function averageRate(ral: number): AverageRateResult {
  if (!Number.isFinite(ral) || ral === 0) {
    return {
      averageTaxRate: NaN,
      averageContributionRate: NaN,
      overallAverageRate: NaN,
    };
  }

  const inps = calculateInps(ral);
  const taxable = taxableIRPEF(ral, inps);

  const gross = grossIrpef(taxable);
  const deduction = deductionIrpef(taxable);
  const net = netIrpef(gross, deduction);

  const regional = regionalTax(taxable);
  const milan = milanTax(taxable);

  const totalTax = net + regional + milan;

  const averageTaxRate = totalTax / ral;
  const averageContributionRate = inps / ral;
  const overallAverageRate = (totalTax + inps) / ral;

  return { averageTaxRate, averageContributionRate, overallAverageRate };
}

export function totalTaxes(ral: number): number {
  if (!Number.isFinite(ral)) return NaN;

  const inps = calculateInps(ral);
  const taxable = taxableIRPEF(ral, inps);

  const gross = grossIrpef(taxable);
  const deduction = deductionIrpef(taxable);
  const net = netIrpef(gross, deduction);

  const regional = regionalTax(taxable);
  const milan = milanTax(taxable);

  return inps + net + regional + milan;
}
