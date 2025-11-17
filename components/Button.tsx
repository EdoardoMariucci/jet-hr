"use client";

import { PlusIcon } from "lucide-react";
import {
  RippleButton,
  RippleButtonRipples,
  type RippleButtonProps,
} from "@/components/animate-ui/components/buttons/ripple";

interface CalculateButtonProps {
  variant: RippleButtonProps["variant"];
  size: RippleButtonProps["size"];
}

export default function CalculateButton({
  variant,
  size,
}: CalculateButtonProps) {
  const handleClick = () => {
    const input = document.getElementById("ral") as HTMLInputElement | null;
    const raw = input?.value?.trim() ?? "";
    const normalized = raw.replace(",", ".");
    const value = Number(normalized);

    if (!raw || Number.isNaN(value) || value <= 0) {
      alert("Inserisci un numero valido maggiore di 0");
      input?.focus();
      return;
    }

    console.log("RAL valido:", value);
  };

  return (
    <RippleButton variant={variant} size={size} onClick={handleClick}>
      {size === "icon" ? <PlusIcon /> : "Calcola"}
      <RippleButtonRipples />
    </RippleButton>
  );
}
