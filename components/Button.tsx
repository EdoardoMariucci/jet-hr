"use client";

import { PlusIcon } from "lucide-react";
import {
  RippleButton,
  RippleButtonRipples,
  type RippleButtonProps,
} from "@/components/animate-ui/components/buttons/ripple";

import { getValidatedRal } from "@/lib/handler";
import {
  calculateInps,
  deductionIrpef,
  grossIrpef,
  netIrpef,
  recap,
  taxableIRPEF,
  regionalTax,
  milanTax,
  averageRate,
} from "@/lib/tax";

interface CalculateButtonProps {
  variant: RippleButtonProps["variant"];
  size: RippleButtonProps["size"];
}

export default function CalculateButton({
  variant,
  size,
}: CalculateButtonProps) {
  const handleClick = () => {
    const value = getValidatedRal("ral");
    if (value == null) return;

    const { totalTax, annualNet, monthlyNet } = recap(value);
    const inps = calculateInps(value);
    const imponibile = taxableIRPEF(value, inps);
    const lordo = grossIrpef(imponibile);
    const detrazione = deductionIrpef(imponibile);
    const netto = netIrpef(lordo, detrazione);
    const regionale = regionalTax(imponibile);
    const comunale = milanTax(imponibile);
    const { averageTaxRate, averageContributionRate, overallAverageRate } =
      averageRate(value);

    const setValue = (id: string, amount: number) => {
      const input = document.getElementById(id) as HTMLInputElement | null;
      if (!input) return;
      input.value = Number.isFinite(amount) ? String(Math.round(amount)) : "-";
    };

    setValue("totale-tasse", totalTax);
    setValue("netto-annuale", annualNet);
    setValue("netto-mensile", monthlyNet);
    setValue("contributi-inps", inps);

    // DetailedCard fields
    setValue("ral-detailed", value);
    setValue("inps", inps);
    setValue("imponibile", imponibile);
    setValue("lordo", lordo);
    setValue("detrazione", detrazione);
    setValue("netto", netto);
    setValue("addizionali-regionali", regionale);
    setValue("addizionali-comunali", comunale);
    setValue("aliquota-media-fiscale", averageTaxRate * 100);
    setValue("aliquota-media-contributiva", averageContributionRate * 100);
    setValue("aliquota-media-complessiva", overallAverageRate * 100);
  };

  return (
    <RippleButton variant={variant} size={size} onClick={handleClick}>
      {size === "icon" ? <PlusIcon /> : "Calcola"}
      <RippleButtonRipples />
    </RippleButton>
  );
}
