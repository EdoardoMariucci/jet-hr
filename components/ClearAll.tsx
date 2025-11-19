"use client";

import { Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";

const ClearAll = () => {
  const handleClick = () => {
    const clearValue = (id: string) => {
      const input = document.getElementById(id) as HTMLInputElement | null;
      if (!input) return;
      input.value = "";
    };

    clearValue("ral");
    //RecapCard
    clearValue("totale-tasse");
    clearValue("netto-annuale");
    clearValue("netto-mensile");
    clearValue("contributi-inps");

    // DetailedCard
    clearValue("ral-detailed");
    clearValue("inps");
    clearValue("imponibile");
    clearValue("lordo");
    clearValue("detrazione");
    clearValue("netto");
    clearValue("addizionali-regionali");
    clearValue("addizionali-comunali");
    clearValue("aliquota-media-fiscale");
    clearValue("aliquota-media-contributiva");
    clearValue("aliquota-media-complessiva");
    clearValue("totale-trattenute");
  };

  return (
    <div className="flex flex-col gap-8">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full hover:bg-accent hover:text-accent-foreground"
        onClick={handleClick}
      >
        <Eraser />
      </Button>
    </div>
  );
};

export default ClearAll;
