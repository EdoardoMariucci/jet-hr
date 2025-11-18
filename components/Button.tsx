"use client";

import { PlusIcon } from "lucide-react";
import {
  RippleButton,
  RippleButtonRipples,
  type RippleButtonProps,
} from "@/components/animate-ui/components/buttons/ripple";

import { getValidatedRal } from "@/lib/handler";

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

    console.log("RAL valido:", value);
  };

  return (
    <RippleButton variant={variant} size={size} onClick={handleClick}>
      {size === "icon" ? <PlusIcon /> : "Calcola"}
      <RippleButtonRipples />
    </RippleButton>
  );
}
