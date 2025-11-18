export function calculatePercentage(base: number, percent: number): number {
  if (!Number.isFinite(base)) return NaN;
  return base * (percent / 100);
}

export function calculateInps(base: number): number {
  return calculatePercentage(base, 9.19);
}

export function taxableIRPEF(ral: number, inps: number): number {
  if (!Number.isFinite(ral) || !Number.isFinite(inps)) return NaN;
  const taxable = ral - inps;
  return taxable > 0 ? taxable : 0;
}

export function grossIrpef(taxable: number): number {
  if (!Number.isFinite(taxable)) return NaN;

  const bracket1Limit = 28000;
  const bracket2Limit = 50000;

  const rate1 = 0.23;
  const rate2 = 0.35;
  const rate3 = 0.43;

  if (taxable <= bracket1Limit) {
    return taxable * rate1;
  }

  if (taxable <= bracket2Limit) {
    const quota1 = bracket1Limit * rate1;
    const quota2 = (taxable - bracket1Limit) * rate2;
    return quota1 + quota2;
  }

  const quota1 = bracket1Limit * rate1;
  const quota2 = (bracket2Limit - bracket1Limit) * rate2;
  const quota3 = (taxable - bracket2Limit) * rate3;

  return quota1 + quota2 + quota3;
}

export function deductionIrpef(taxable: number): number {
  if (!Number.isFinite(taxable)) return NaN;

  const t = taxable;
  const bracket1Limit = 15000;
  const bracket2Limit = 28000;
  const bracket3Limit = 50000;

  let basicDeduction = 0;

  if (t <= bracket1Limit) {
    basicDeduction = 1955;
  } else if (t <= bracket2Limit) {
    basicDeduction = 1910 + (1190 * (bracket2Limit - t)) / 13000;
  } else if (t <= bracket3Limit) {
    basicDeduction = (1910 * (bracket3Limit - t)) / 22000;
  } else {
    basicDeduction = 0;
  }

  if (t > 25000 && t <= 35000) {
    basicDeduction += 65;
  }

  if (basicDeduction < 0) basicDeduction = 0;
  return basicDeduction;
}

export function netIrpef(grossIrpef: number, deductionIrpef: number): number {
  if (!Number.isFinite(grossIrpef) || !Number.isFinite(deductionIrpef)) {
    return NaN;
  }
  const net = grossIrpef - deductionIrpef;
  return net > 0 ? net : 0;
}

export function regionalTax(taxable: number): number {
  if (!Number.isFinite(taxable)) return NaN;
  const t = taxable;
  if (t <= 0) return 0;

  const b1 = 15000;
  const b2 = 28000;
  const b3 = 50000;

  const quota1 = Math.min(t, b1) * 0.0123;
  const quota2 = Math.min(Math.max(t - b1, 0), b2 - b1) * 0.0158;
  const quota3 = Math.min(Math.max(t - b2, 0), b3 - b2) * 0.0172;
  const quota4 = Math.max(t - b3, 0) * 0.0173;

  return quota1 + quota2 + quota3 + quota4;
}

export function milanTax(taxable: number): number {
  if (!Number.isFinite(taxable)) return NaN;
  const t = taxable;
  if (t <= 23000) return 0;
  return t * 0.008;
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
  const monthlyNet = annualNet / 13;

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
